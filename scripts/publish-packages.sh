#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in the correct directory
check_directory() {
    if [[ ! -f "package.json" ]] || [[ ! -d "packages" ]]; then
        print_error "This script must be run from the root of the ava-sdk-js repository"
        exit 1
    fi
}

# Function to check if packages have changes to publish
check_changeset_status() {
    print_status "Checking changeset status..."
    
    # Check if there are any changesets
    if [[ ! -d ".changeset" ]] || [[ -z "$(ls -A .changeset/*.md 2>/dev/null | head -1)" ]]; then
        print_warning "No changesets found. Make sure you've run 'yarn changeset' first."
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Aborting publish process"
            exit 1
        fi
    fi
}

# Function to run changeset version if needed
run_version_bump() {
    print_status "Checking if version bump is needed..."
    
    # Check if there are changesets to consume
    if [[ -d ".changeset" ]] && [[ -n "$(ls -A .changeset/*.md 2>/dev/null | head -1)" ]]; then
        print_warning "Changesets detected. You should run 'yarn changeset version' first."
        read -p "Do you want me to run 'yarn changeset version' now? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Running changeset version..."
            yarn changeset version
            if [[ $? -ne 0 ]]; then
                print_error "Failed to run changeset version"
                exit 1
            fi
            print_success "Version bump completed"
        else
            print_warning "Continuing without version bump"
        fi
    fi
}

# Function to check npm authentication
check_npm_auth() {
    print_status "Checking npm authentication..."
    
    # First check with output to debug
    local npm_check_output
    npm_check_output=$(npm whoami 2>&1)
    local npm_check_exit_code=$?
    
    print_status "npm whoami output: '$npm_check_output'"
    print_status "npm whoami exit code: $npm_check_exit_code"
    
    if [[ $npm_check_exit_code -ne 0 ]]; then
        print_error "You are not logged in to npm. Please run 'npm login' first."
        print_error "npm whoami failed with: $npm_check_output"
        exit 1
    fi
    
    if [[ -z "$npm_check_output" ]]; then
        print_error "npm whoami returned empty output. Please check your npm configuration."
        exit 1
    fi
    
    print_success "Authenticated as: $npm_check_output"
}

# Function to get package version
get_package_version() {
    local package_path=$1
    if [[ ! -f "$package_path/package.json" ]]; then
        print_error "package.json not found at $package_path"
        exit 1
    fi
    jq -r '.version' "$package_path/package.json"
}

# Function to get package name
get_package_name() {
    local package_path=$1
    if [[ ! -f "$package_path/package.json" ]]; then
        print_error "package.json not found at $package_path"
        exit 1
    fi
    jq -r '.name' "$package_path/package.json"
}

# Function to check if package version exists on npm
check_version_exists() {
    local package_name=$1
    local version=$2
    
    npm view "$package_name@$version" version > /dev/null 2>&1
    return $?
}

# Function to publish a package
publish_package() {
    local package_path=$1
    local package_name=$(get_package_name "$package_path")
    local package_version=$(get_package_version "$package_path")
    
    print_status "Publishing $package_name@$package_version"
    
    # Check if this version already exists
    if check_version_exists "$package_name" "$package_version"; then
        print_warning "$package_name@$package_version already exists on npm"
        read -p "Do you want to skip this package? (Y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            print_warning "Skipping $package_name"
            return 0
        fi
    fi
    
    # Change to package directory
    cd "$package_path"
    
    # Run build to ensure package is ready
    print_status "Building $package_name..."
    npm run build
    if [[ $? -ne 0 ]]; then
        print_error "Build failed for $package_name"
        cd - > /dev/null
        return 1
    fi
    
    # Publish the package
    print_status "Publishing $package_name to npm..."
    npm publish --access public
    local publish_result=$?
    
    # Return to root directory
    cd - > /dev/null
    
    if [[ $publish_result -eq 0 ]]; then
        print_success "Successfully published $package_name@$package_version"
        return 0
    else
        print_error "Failed to publish $package_name"
        return 1
    fi
}

# Function to update workspace dependencies
update_workspace_dependencies() {
    print_status "Updating workspace dependencies..."
    
    yarn install
    if [[ $? -eq 0 ]]; then
        print_success "Workspace dependencies updated"
    else
        print_error "Failed to update workspace dependencies"
        return 1
    fi
}

# Main publish function
main_publish() {
    local dry_run=false
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                dry_run=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [--dry-run] [--help]"
                echo "  --dry-run    Show what would be published without actually publishing"
                echo "  --help       Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    print_status "Starting package publish process..."
    print_status "Working directory: $(pwd)"
    
    # Preliminary checks
    check_directory
    check_changeset_status
    run_version_bump
    
    if [[ "$dry_run" == "false" ]]; then
        check_npm_auth
    fi
    
    # Get package information
    local types_name=$(get_package_name "packages/types")
    local types_version=$(get_package_version "packages/types")
    local sdk_name=$(get_package_name "packages/sdk-js")
    local sdk_version=$(get_package_version "packages/sdk-js")
    
    print_status "Packages to publish:"
    echo "  - $types_name@$types_version"
    echo "  - $sdk_name@$sdk_version"
    
    if [[ "$dry_run" == "true" ]]; then
        print_warning "DRY RUN MODE - No packages will actually be published"
        return 0
    fi
    
    # Confirm before publishing
    echo
    read -p "Do you want to proceed with publishing? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Publish cancelled by user"
        exit 1
    fi
    
    # Publish packages in dependency order
    print_status "Publishing packages in dependency order..."
    
    # 1. Publish types package first
    print_status "Step 1: Publishing types package..."
    if ! publish_package "packages/types"; then
        print_error "Failed to publish types package. Aborting."
        exit 1
    fi
    
    # 2. Update workspace dependencies to ensure sdk-js gets the new types version
    print_status "Step 2: Updating workspace dependencies..."
    if ! update_workspace_dependencies; then
        print_error "Failed to update dependencies. Aborting."
        exit 1
    fi
    
    # 3. Publish sdk-js package
    print_status "Step 3: Publishing sdk-js package..."
    if ! publish_package "packages/sdk-js"; then
        print_error "Failed to publish sdk-js package"
        exit 1
    fi
    
    print_success "All packages published successfully!"
    print_status "Published packages:"
    echo "  ✅ $types_name@$types_version"
    echo "  ✅ $sdk_name@$sdk_version"
    
    print_status "You may want to create a git tag for this release:"
    echo "  git add ."
    echo "  git commit -m \"chore: release packages\""
    echo "  git tag v$sdk_version"
    echo "  git push && git push --tags"
}

# Run main function with all arguments
main_publish "$@" 