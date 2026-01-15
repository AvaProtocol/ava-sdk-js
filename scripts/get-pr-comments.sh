#!/bin/bash

# Script to fetch Copilot and Claude AI comments from a GitHub PR
# Usage: sh scripts/get-pr-comments.sh [pr_number] [verbose]
# Default PR: 987
# Set verbose to see all comment authors (useful for identifying bot names)
# Example: sh scripts/get-pr-comments.sh 987 verbose

PR_NUMBER="${1:-987}"

# Validate PR_NUMBER is numeric
if ! [[ "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
    echo "Invalid PR number: $PR_NUMBER" >&2
    exit 1
fi

REPO_OWNER="AvaProtocol"
REPO_NAME="ava-sdk-js"
REPO="$REPO_OWNER/$REPO_NAME"
VERBOSE="${2:-false}"
OUTPUT_FILE="pr-comments-${PR_NUMBER}.json"

echo "Fetching Copilot and Claude comments from PR #$PR_NUMBER..."
echo "Repository: $REPO"
echo ""

# If verbose, show all comment authors to help identify bot names
if [ "$VERBOSE" = "verbose" ] || [ "$VERBOSE" = "-v" ] || [ "$VERBOSE" = "--verbose" ]; then
    echo "=== All Review Comment Authors ==="
    gh api repos/$REPO/pulls/$PR_NUMBER/comments --jq '.[] | {user: .user.login, body: (.body[:50] + "...")}'
    echo ""
    echo "=== All Issue/PR Comment Authors ==="
    gh api repos/$REPO/issues/$PR_NUMBER/comments --jq '.[] | {user: .user.login, body: (.body[:50] + "...")}'
    echo ""
fi

# Create temporary files to avoid bash variable issues with special characters
TMP_GRAPHQL=$(mktemp)
TMP_COPILOT_UNRESOLVED=$(mktemp)
TMP_COPILOT_RESOLVED=$(mktemp)
TMP_CLAUDE_UNRESOLVED=$(mktemp)
TMP_CLAUDE_RESOLVED=$(mktemp)
TMP_COPILOT_ISSUE=$(mktemp)
TMP_CLAUDE_ISSUE=$(mktemp)

# Use GraphQL to fetch all review threads with resolution status
gh api graphql -f query='
query($owner: String!, $name: String!, $pr: Int!) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100) {
        nodes {
          isResolved
          comments(first: 10) {
            nodes {
              id
              path
              body
              createdAt
              author {
                login
              }
              line
              diffHunk
            }
          }
        }
      }
    }
  }
}' -f owner="$REPO_OWNER" -f name="$REPO_NAME" -F pr="$PR_NUMBER" > "$TMP_GRAPHQL"

# Extract unresolved Copilot comments
jq '[
  .data.repository.pullRequest.reviewThreads.nodes[] |
  select(.isResolved == false) |
  .comments.nodes[] |
  select(.author.login == "github-copilot[bot]" or .author.login == "copilot" or .author.login == "Copilot" or .author.login == "copilot-pull-request-reviewer" or (.author.login | ascii_downcase | contains("copilot"))) |
  {
    id: .id,
    path: .path,
    line: .line,
    diff_hunk: .diffHunk,
    body: .body,
    created_at: .createdAt,
    user: .author.login
  }
]' "$TMP_GRAPHQL" > "$TMP_COPILOT_UNRESOLVED"

# Extract resolved Copilot comments (for counting)
jq '[
  .data.repository.pullRequest.reviewThreads.nodes[] |
  select(.isResolved == true) |
  .comments.nodes[] |
  select(.author.login == "github-copilot[bot]" or .author.login == "copilot" or .author.login == "Copilot" or .author.login == "copilot-pull-request-reviewer" or (.author.login | ascii_downcase | contains("copilot"))) |
  {
    id: .id,
    path: .path,
    line: .line,
    diff_hunk: .diffHunk,
    body: .body,
    created_at: .createdAt,
    user: .author.login
  }
]' "$TMP_GRAPHQL" > "$TMP_COPILOT_RESOLVED"

# Extract unresolved Claude comments
jq '[
  .data.repository.pullRequest.reviewThreads.nodes[] |
  select(.isResolved == false) |
  .comments.nodes[] |
  select(.author.login == "claude[bot]" or .author.login == "claude-code[bot]" or .author.login == "Claude" or (.author.login | ascii_downcase | contains("claude"))) |
  {
    id: .id,
    path: .path,
    line: .line,
    diff_hunk: .diffHunk,
    body: .body,
    created_at: .createdAt,
    user: .author.login
  }
]' "$TMP_GRAPHQL" > "$TMP_CLAUDE_UNRESOLVED"

# Extract resolved Claude comments (for counting)
jq '[
  .data.repository.pullRequest.reviewThreads.nodes[] |
  select(.isResolved == true) |
  .comments.nodes[] |
  select(.author.login == "claude[bot]" or .author.login == "claude-code[bot]" or .author.login == "Claude" or (.author.login | ascii_downcase | contains("claude"))) |
  {
    id: .id,
    path: .path,
    line: .line,
    diff_hunk: .diffHunk,
    body: .body,
    created_at: .createdAt,
    user: .author.login
  }
]' "$TMP_GRAPHQL" > "$TMP_CLAUDE_RESOLVED"

# Fetch issue/PR comments (these don't have resolution status)
# Filter for Copilot comments
gh api repos/$REPO/issues/$PR_NUMBER/comments --jq '[.[] | select(.user.login == "github-copilot[bot]" or .user.login == "copilot" or .user.login == "Copilot" or .user.login == "copilot-pull-request-reviewer" or (.user.login | ascii_downcase | contains("copilot"))) | {
  id: .id,
  body: .body,
  created_at: .created_at,
  user: .user.login
}]' > "$TMP_COPILOT_ISSUE"

# Fetch issue/PR comments and get all Claude comments
gh api repos/$REPO/issues/$PR_NUMBER/comments --jq '[.[] | select(.user.login == "claude[bot]" or .user.login == "claude-code[bot]" or .user.login == "Claude" or (.user.login | ascii_downcase | contains("claude"))) | {
  id: .id,
  body: .body,
  created_at: .created_at,
  user: .user.login
}]' > "$TMP_CLAUDE_ISSUE"

# Get counts
COPILOT_UNRESOLVED_COUNT=$(jq 'length' "$TMP_COPILOT_UNRESOLVED")
COPILOT_RESOLVED_COUNT=$(jq 'length' "$TMP_COPILOT_RESOLVED")
COPILOT_TOTAL_REVIEW=$((COPILOT_UNRESOLVED_COUNT + COPILOT_RESOLVED_COUNT))
COPILOT_ISSUE_COUNT=$(jq 'length' "$TMP_COPILOT_ISSUE")

CLAUDE_UNRESOLVED_COUNT=$(jq 'length' "$TMP_CLAUDE_UNRESOLVED")
CLAUDE_RESOLVED_COUNT=$(jq 'length' "$TMP_CLAUDE_RESOLVED")
CLAUDE_TOTAL_REVIEW=$((CLAUDE_UNRESOLVED_COUNT + CLAUDE_RESOLVED_COUNT))
CLAUDE_ISSUE_COUNT=$(jq 'length' "$TMP_CLAUDE_ISSUE")

# Combine unresolved comments into a single JSON structure (only output unresolved)
jq -n \
  --argfile copilot_review "$TMP_COPILOT_UNRESOLVED" \
  --argfile claude_review "$TMP_CLAUDE_UNRESOLVED" \
  --argfile copilot_issue "$TMP_COPILOT_ISSUE" \
  --argfile claude_issue "$TMP_CLAUDE_ISSUE" \
  --arg pr_number "$PR_NUMBER" \
  --arg repo "$REPO" \
  --argjson copilot_total_review "$COPILOT_TOTAL_REVIEW" \
  --argjson copilot_unresolved "$COPILOT_UNRESOLVED_COUNT" \
  --argjson copilot_resolved "$COPILOT_RESOLVED_COUNT" \
  --argjson claude_total_review "$CLAUDE_TOTAL_REVIEW" \
  --argjson claude_unresolved "$CLAUDE_UNRESOLVED_COUNT" \
  --argjson claude_resolved "$CLAUDE_RESOLVED_COUNT" \
  '
    {
      pr_number: $pr_number,
      repository: $repo,
      summary: {
        copilot: {
          review_comments_total: $copilot_total_review,
          review_comments_unresolved: $copilot_unresolved,
          review_comments_resolved: $copilot_resolved,
          issue_pr_comments: (if ($copilot_issue | type) == "array" then ($copilot_issue | length) else 0 end)
        },
        claude: {
          review_comments_total: $claude_total_review,
          review_comments_unresolved: $claude_unresolved,
          review_comments_resolved: $claude_resolved,
          issue_pr_comments: (if ($claude_issue | type) == "array" then ($claude_issue | length) else 0 end)
        }
      },
      copilot: {
        review_comments: (if ($copilot_review | type) == "array" then $copilot_review else [] end),
        issue_comments: (if ($copilot_issue | type) == "array" then $copilot_issue else [] end)
      },
      claude: {
        review_comments: (if ($claude_review | type) == "array" then $claude_review else [] end),
        issue_comments: (if ($claude_issue | type) == "array" then $claude_issue else [] end)
      }
    }
  ' > "$OUTPUT_FILE"

# Clean up temp files
rm -f "$TMP_GRAPHQL" "$TMP_COPILOT_UNRESOLVED" "$TMP_COPILOT_RESOLVED" "$TMP_CLAUDE_UNRESOLVED" "$TMP_CLAUDE_RESOLVED" "$TMP_COPILOT_ISSUE" "$TMP_CLAUDE_ISSUE"

# Print summary to stdout
echo "=== Summary ==="
echo "Copilot:"
echo "  - Review comments: $COPILOT_UNRESOLVED_COUNT unresolved / $COPILOT_TOTAL_REVIEW total"
echo "    • Resolved: $COPILOT_RESOLVED_COUNT"
echo "    • Unresolved: $COPILOT_UNRESOLVED_COUNT"
echo "  - Issue/PR comments: $COPILOT_ISSUE_COUNT"
echo "Claude:"
echo "  - Review comments: $CLAUDE_UNRESOLVED_COUNT unresolved / $CLAUDE_TOTAL_REVIEW total"
echo "    • Resolved: $CLAUDE_RESOLVED_COUNT"
echo "    • Unresolved: $CLAUDE_UNRESOLVED_COUNT"
echo "  - Issue/PR comments: $CLAUDE_ISSUE_COUNT"
echo ""
echo "Output saved to: $OUTPUT_FILE (contains only unresolved comments)"

