# Publish Scripts

This directory contains automated scripts to simplify the package publishing process for the ava-sdk-js monorepo.

## Quick Start

After running `yarn changeset` and `yarn changeset version` manually:

```bash
# Dry run to see what would be published (recommended first)
npm run publish:dry-run

# Publish packages
npm run publish
```

## Available Scripts

### Package.json Scripts

| Script | Description |
|--------|-------------|
| `npm run publish` | **Main publish command** |
| `npm run publish:dry-run` | **Dry run to preview what would be published (recommended first)** |
| `npm run publish:bash` | Alternative bash script version |
| `npm run publish:bash:dry-run` | Bash script dry run |
| `npm run publish:help` | Show help for bash script |

### Direct Script Usage

```bash
# Node.js script (cross-platform) - default
node ./scripts/publish-packages.js [--dry-run] [--help]

# Bash script (alternative)  
./scripts/publish-packages.sh [--dry-run] [--help]
```

## What the Scripts Do

1. **Validation**: Check directory, npm auth, package versions
2. **Build**: Ensure packages are built before publishing
3. **Dependency Order**: Publish `types` package first, then `sdk-js`
4. **Dependency Refresh**: Run `yarn install` between publishes to ensure sdk-js gets the latest types version
5. **Safety Checks**: Confirm before publishing, check for existing versions
6. **Git Suggestions**: Provide git commands for tagging the release

## Publishing Process

### Manual Steps (Still Required)
```bash
yarn changeset        # Create changeset for your changes
yarn changeset version # Bump versions and update CHANGELOGs
```

### Automated Steps (Via Scripts)
```bash
npm run publish       # Handles the rest automatically
```

## Why Dependencies Are Updated

**Q: Why does the script run `yarn install` between publishing `types` and `sdk-js`?**

**A:** When `sdk-js` depends on `@avaprotocol/types`, we need to ensure it uses the newly published version, not the local workspace version. The script:

1. Publishes `@avaprotocol/types@1.2.3` to npm
2. Runs `yarn install` to update `sdk-js/node_modules` with the published version
3. Publishes `@avaprotocol/sdk-js@1.2.3` with the correct dependency

This prevents issues where `sdk-js` might reference an unpublished or mismatched version of `types`.

## Error Handling

- **Authentication**: Script checks `npm whoami` before publishing
- **Version Conflicts**: Warns if package version already exists on npm
- **Build Failures**: Stops if package build fails
- **Dependency Issues**: Aborts if workspace dependency update fails

## Dry Run Mode

Always test first:
```bash
npm run publish:dry-run
```

This will:
- Show what packages would be published
- Validate configurations
- Check npm authentication
- Skip actual publishing

## Platform Compatibility

The default publish commands (`npm run publish` and `npm run publish:dry-run`) use the **Node.js script** which works on all platforms:

- ✅ **Windows** (PowerShell, Command Prompt)
- ✅ **macOS** (Terminal, iTerm)  
- ✅ **Linux** (bash, zsh, fish)
- ✅ **Windows WSL**

Alternative bash script is available if needed (`npm run publish:bash`). 