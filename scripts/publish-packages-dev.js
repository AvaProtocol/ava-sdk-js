#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Utility functions for colored output
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
};

// Helper to run commands
function runCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout };
  }
}

// Helper to check if we're in the correct directory
function checkDirectory() {
  if (!fs.existsSync('package.json') || !fs.existsSync('packages')) {
    log.error('This script must be run from the root of the ava-sdk-js repository');
    process.exit(1);
  }
}

// Helper to get package info
function getPackageInfo(packagePath) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8'));
    return {
      name: packageJson.name,
      version: packageJson.version,
      path: packagePath,
    };
  } catch (error) {
    log.error(`Failed to read package.json from ${packagePath}: ${error.message}`);
    process.exit(1);
  }
}

// Helper to check if npm user is authenticated
function checkNpmAuth() {
  log.info('Checking npm authentication...');
  const result = runCommand('npm whoami', { silent: true });
  
  if (!result.success) {
    log.error('You are not logged in to npm. Please run "npm login" first.');
    log.error(`Error details: ${result.error || 'Unknown error'}`);
    process.exit(1);
  }
  
  const npmUser = result.output.trim();
  if (!npmUser) {
    log.error('npm whoami returned empty output. Please check your npm configuration.');
    process.exit(1);
  }
  
  log.success(`Authenticated as: ${npmUser}`);
  return npmUser;
}

// Helper to get user input
function getUserInput(question) {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    readline.question(question, (answer) => {
      readline.close();
      resolve(answer.toLowerCase());
    });
  });
}

// Update package version to dev prerelease
function updateToDevVersion(packagePath, packageInfo) {
  log.info(`Updating ${packageInfo.name} to dev prerelease version...`);
  
  const result = runCommand('yarn version --prerelease --preid dev --no-git-tag-version', { 
    cwd: packagePath,
    silent: true 
  });
  
  if (!result.success) {
    log.error(`Failed to update version for ${packageInfo.name}: ${result.error}`);
    return null;
  }
  
  // Read the updated version
  const updatedInfo = getPackageInfo(packagePath);
  log.success(`Updated ${packageInfo.name}: ${packageInfo.version} → ${updatedInfo.version}`);
  
  return updatedInfo;
}

// Publish package with dev tag
async function publishDevPackage(packageInfo, dryRun = false) {
  log.info(`Publishing ${packageInfo.name}@${packageInfo.version} with dev tag...`);
  
  if (dryRun) {
    log.info(`[DRY RUN] Would publish ${packageInfo.name}@${packageInfo.version} --tag dev`);
    return true;
  }
  
  // Build the package first
  log.info(`Building ${packageInfo.name}...`);
  const buildResult = runCommand('yarn build', { cwd: packageInfo.path });
  if (!buildResult.success) {
    log.error(`Build failed for ${packageInfo.name}`);
    return false;
  }
  
  // Publish with dev tag
  const publishResult = runCommand('npm publish --tag dev --access public', { 
    cwd: packageInfo.path 
  });
  
  if (publishResult.success) {
    log.success(`Successfully published ${packageInfo.name}@${packageInfo.version} with dev tag`);
    return true;
  } else {
    log.error(`Failed to publish ${packageInfo.name}`);
    return false;
  }
}

// Clean and reinstall dependencies following the documented procedure
function cleanAndReinstall() {
  log.info('Cleaning and reinstalling dependencies...');
  
  // Step 1: Clean root folder (removes node_modules and yarn.lock)
  log.info('Step 1: Removing node_modules and yarn.lock from root folder...');
  const cleanResult = runCommand('yarn run clean');
  if (!cleanResult.success) {
    log.error('Failed to clean root dependencies');
    return false;
  }
  
  // Step 2: Reinstall dependencies (this will prompt for new types version)
  log.info('Step 2: Reinstalling dependencies (will use new types version)...');
  const installResult = runCommand('yarn install');
  if (!installResult.success) {
    log.error('Failed to reinstall dependencies');
    return false;
  }
  
  log.success('Dependencies cleaned and reinstalled with new types version');
  return true;
}

// Build individual package
function buildPackage(packagePath, packageName) {
  log.info(`Building ${packageName}...`);
  const buildResult = runCommand('yarn build', { cwd: packagePath });
  if (!buildResult.success) {
    log.error(`Failed to build ${packageName}`);
    return false;
  }
  
  log.success(`${packageName} built successfully`);
  return true;
}

// Run tests
function runTests() {
  log.info('Running tests...');
  const testResult = runCommand('yarn run test');
  if (!testResult.success) {
    log.warning('Some tests failed, but continuing with publish...');
    return false;
  }
  
  log.success('All tests passed');
  return true;
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const help = args.includes('--help') || args.includes('-h');
  const skipTests = args.includes('--skip-tests');
  const skipClean = args.includes('--skip-clean');
  const typesOnly = args.includes('--types-only');
  
  if (help) {
    console.log('Usage: node scripts/publish-packages-dev.js [options]');
    console.log('');
    console.log('Automates the dev prerelease publishing process:');
    console.log('1. Updates both packages to dev prerelease versions');
    console.log('2. Publishes types package with --tag dev');
    console.log('3. Cleans and reinstalls dependencies');
    console.log('4. Builds all packages');
    console.log('5. Runs tests');
    console.log('6. Publishes sdk-js package with --tag dev');
    console.log('');
    console.log('Options:');
    console.log('  --dry-run      Show what would be done without actually publishing');
    console.log('  --skip-tests   Skip running tests (faster but less safe)');
    console.log('  --skip-clean   Skip clean/reinstall step (faster but may have dep issues)');
    console.log('  --types-only   Only publish types package (useful when SDK has compatibility issues)');
    console.log('  --help, -h     Show this help message');
    process.exit(0);
  }
  
  log.info('Starting dev prerelease publish process...');
  
  // Preliminary checks
  checkDirectory();
  
  if (!dryRun) {
    checkNpmAuth();
  }
  
  // Get initial package information
  const typesInfo = getPackageInfo('packages/types');
  const sdkInfo = getPackageInfo('packages/sdk-js');
  
  log.info('Current package versions:');
  console.log(`  - ${typesInfo.name}@${typesInfo.version}`);
  console.log(`  - ${sdkInfo.name}@${sdkInfo.version}`);
  
  if (!dryRun) {
    console.log();
    const answer = await getUserInput('Do you want to proceed with dev prerelease publishing? (y/N): ');
    if (answer !== 'y' && answer !== 'yes') {
      log.error('Publish cancelled by user');
      process.exit(1);
    }
  }
  
  // Step 1: Update package versions to dev prerelease versions
  log.info('Step 1: Updating package versions to dev prerelease...');
  
  const updatedTypesInfo = updateToDevVersion('packages/types', typesInfo);
  if (!updatedTypesInfo) {
    log.error('Failed to update types package version');
    process.exit(1);
  }
  
  let updatedSdkInfo = null;
  if (!typesOnly) {
    updatedSdkInfo = updateToDevVersion('packages/sdk-js', sdkInfo);
    if (!updatedSdkInfo) {
      log.error('Failed to update sdk-js package version');
      process.exit(1);
    }
  } else {
    log.info('Skipping SDK version update (--types-only mode)');
    updatedSdkInfo = sdkInfo; // Keep original info for logging
  }
  
  // Step 2: Publish types package with dev tag
  log.info('Step 2: Publishing types package with dev tag...');
  const typesSuccess = await publishDevPackage(updatedTypesInfo, dryRun);
  if (!typesSuccess) {
    log.error('Failed to publish types package. Aborting.');
    process.exit(1);
  }
  
  // Step 3: Update SDK dependency to use new types version and reinstall
  if (!dryRun && !skipClean) {
    log.info('Step 3: Updating SDK dependency and reinstalling...');
    
    // Update SDK package.json to use the new types dev version
    log.info(`Updating SDK dependency to use ${updatedTypesInfo.name}@${updatedTypesInfo.version}...`);
    const updateDepResult = runCommand(`yarn workspace @avaprotocol/sdk-js add ${updatedTypesInfo.name}@${updatedTypesInfo.version}`);
    if (!updateDepResult.success) {
      log.error('Failed to update SDK dependency to new types version');
      process.exit(1);
    }
    log.success(`SDK now depends on ${updatedTypesInfo.name}@${updatedTypesInfo.version}`);
    
    // Clean and reinstall to ensure clean state
    const cleanSuccess = cleanAndReinstall();
    if (!cleanSuccess) {
      log.error('Failed to clean and reinstall dependencies. Aborting.');
      process.exit(1);
    }
  } else if (skipClean) {
    log.warning('Skipping clean/reinstall step as requested');
  }
  
  // Step 4: Build packages in dependency order (types first, then SDK)
  if (!dryRun) {
    log.info('Step 4: Building packages in dependency order...');
    
    // CRITICAL: Build local types package first since yarn workspaces uses local version
    // The clean step removed the dist/ folder, so we need to rebuild it for SDK to use
    log.info('Step 4a: Rebuilding local types package (required for workspace resolution)...');
    const typesBuildSuccess = buildPackage('packages/types', 'types');
    if (!typesBuildSuccess) {
      log.error('Failed to rebuild local types package - SDK will not be able to find type definitions');
      process.exit(1);
    }
    
    // Then build SDK package (which depends on types)
    if (!typesOnly) {
      log.info('Step 4b: Building SDK package...');
      const sdkBuildSuccess = buildPackage('packages/sdk-js', 'sdk-js');
      if (!sdkBuildSuccess) {
        log.error('Build failed for SDK package - this often happens when types package has breaking changes');
        log.warning('Common solutions:');
        log.warning('1. Update SDK imports to match the new types package exports');
        log.warning('2. Check if types exports were renamed or removed');
        log.warning('3. Use --types-only to publish types without SDK');
        
        const answer = await getUserInput('Do you want to continue with types-only publishing? (y/N): ');
        if (answer !== 'y' && answer !== 'yes') {
          log.error('Aborting due to SDK build failures.');
          process.exit(1);
        } else {
          log.warning('Continuing with types package only...');
          log.success('Types package published successfully, but SDK package was skipped due to build errors');
          return;
        }
      }
    }
  }
  
  // Step 5: Run tests (optional)
  if (!dryRun && !skipTests) {
    log.info('Step 5: Running tests...');
    const testSuccess = runTests();
    if (!testSuccess) {
      const answer = await getUserInput('Tests failed. Do you want to continue with publishing anyway? (y/N): ');
      if (answer !== 'y' && answer !== 'yes') {
        log.error('Publish cancelled due to test failures');
        process.exit(1);
      }
    }
  } else if (skipTests) {
    log.warning('Skipping tests as requested');
  }
  
  // Step 6: Publish sdk-js package with dev tag (unless types-only mode)
  if (!typesOnly) {
    log.info('Step 6: Publishing sdk-js package with dev tag...');
    const sdkSuccess = await publishDevPackage(updatedSdkInfo, dryRun);
    if (!sdkSuccess) {
      log.error('Failed to publish sdk-js package');
      process.exit(1);
    }
  } else {
    log.info('Skipping SDK publishing (--types-only mode)');
  }
  
  // Summary
  if (dryRun) {
    log.success('Dry run completed successfully!');
    log.info('Would have published:');
    console.log(`  📦 ${updatedTypesInfo.name}@${updatedTypesInfo.version} --tag dev`);
    if (!typesOnly) {
      console.log(`  📦 ${updatedSdkInfo.name}@${updatedSdkInfo.version} --tag dev`);
    }
  } else {
    log.success(typesOnly ? 'Types package published successfully!' : 'Dev prerelease publish completed successfully!');
    log.info('Published packages:');
    console.log(`  ✅ ${updatedTypesInfo.name}@${updatedTypesInfo.version} --tag dev`);
    if (!typesOnly) {
      console.log(`  ✅ ${updatedSdkInfo.name}@${updatedSdkInfo.version} --tag dev`);
    }
    
    log.info('To install the dev versions:');
    console.log(`  npm install ${updatedTypesInfo.name}@dev`);
    if (!typesOnly) {
      console.log(`  npm install ${updatedSdkInfo.name}@dev`);
    }
    
    log.info('You may want to commit the version changes:');
    console.log('  git add .');
    console.log(`  git commit -m "chore: bump dev versions${typesOnly ? ' (types only)' : ''}"`);
    console.log('  git push');
  }
}

// Run the script
main().catch((error) => {
  log.error(`Script failed: ${error.message}`);
  process.exit(1);
});
