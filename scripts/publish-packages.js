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
  
  log.info(`npm whoami exit code: ${result.success ? 0 : 'failed'}`);
  log.info(`npm whoami output: '${result.output || ''}'`);
  if (result.error) {
    log.info(`npm whoami error: '${result.error}'`);
  }
  
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

// Helper to check if package version exists on npm
function checkVersionExists(packageName, version) {
  const result = runCommand(`npm view "${packageName}@${version}" version`, { silent: true });
  return result.success;
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

// Main publish function for a single package
async function publishPackage(packagePath, dryRun = false) {
  const packageInfo = getPackageInfo(packagePath);
  
  log.info(`Publishing ${packageInfo.name}@${packageInfo.version}`);
  
  // Check if this version already exists
  if (checkVersionExists(packageInfo.name, packageInfo.version)) {
    log.warning(`${packageInfo.name}@${packageInfo.version} already exists on npm`);
    const answer = await getUserInput('Do you want to skip this package? (Y/n): ');
    if (answer !== 'n' && answer !== 'no') {
      log.warning(`Skipping ${packageInfo.name}`);
      return true;
    }
  }
  
  if (dryRun) {
    log.info(`[DRY RUN] Would publish ${packageInfo.name}@${packageInfo.version}`);
    return true;
  }
  
  // Build the package
  log.info(`Building ${packageInfo.name}...`);
  const buildResult = runCommand('npm run build', { cwd: packagePath });
  if (!buildResult.success) {
    log.error(`Build failed for ${packageInfo.name}`);
    return false;
  }
  
  // Publish the package
  log.info(`Publishing ${packageInfo.name} to npm...`);
  const publishResult = runCommand('npm publish --access public', { cwd: packagePath });
  
  if (publishResult.success) {
    log.success(`Successfully published ${packageInfo.name}@${packageInfo.version}`);
    return true;
  } else {
    log.error(`Failed to publish ${packageInfo.name}`);
    return false;
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const help = args.includes('--help') || args.includes('-h');
  
  if (help) {
    console.log('Usage: node scripts/publish-packages.js [--dry-run] [--help]');
    console.log('  --dry-run    Show what would be published without actually publishing');
    console.log('  --help       Show this help message');
    process.exit(0);
  }
  
  log.info('Starting package publish process...');
  
  // Preliminary checks
  checkDirectory();
  
  // Ensure grpc_codegen is up to date and packages are built before publishing
  log.info('Regenerating protobuf code (yarn protoc-gen)...');
  const protocResult = runCommand('yarn protoc-gen');
  if (!protocResult.success) {
    log.error('Failed to run protoc-gen. Aborting.');
    process.exit(1);
  }
  log.success('Protobuf code regenerated');
  
  log.info('Building all packages (yarn build)...');
  const buildResult = runCommand('yarn build');
  if (!buildResult.success) {
    log.error('Failed to build packages. Aborting.');
    process.exit(1);
  }
  log.success('Packages built');
  
  if (!dryRun) {
    checkNpmAuth();
  }
  
  // Get package information
  const typesInfo = getPackageInfo('packages/types');
  const sdkInfo = getPackageInfo('packages/sdk-js');
  
  log.info('Packages to publish:');
  console.log(`  - ${typesInfo.name}@${typesInfo.version}`);
  console.log(`  - ${sdkInfo.name}@${sdkInfo.version}`);
  
  if (dryRun) {
    log.warning('DRY RUN MODE - No packages will actually be published');
  } else {
    // Confirm before publishing
    console.log();
    const answer = await getUserInput('Do you want to proceed with publishing? (y/N): ');
    if (answer !== 'y' && answer !== 'yes') {
      log.error('Publish cancelled by user');
      process.exit(1);
    }
  }
  
  // Publish packages in dependency order
  log.info('Publishing packages in dependency order...');
  
  // 1. Publish types package first
  log.info('Step 1: Publishing types package...');
  const typesSuccess = await publishPackage('packages/types', dryRun);
  if (!typesSuccess) {
    log.error('Failed to publish types package. Aborting.');
    process.exit(1);
  }
  
  // 2. Update workspace dependencies (only if not dry run)
  if (!dryRun) {
    log.info('Step 2: Updating workspace dependencies...');
    const updateResult = runCommand('yarn install');
    if (!updateResult.success) {
      log.error('Failed to update dependencies. Aborting.');
      process.exit(1);
    }
    log.success('Workspace dependencies updated');
  }
  
  // 3. Publish sdk-js package
  log.info('Step 3: Publishing sdk-js package...');
  const sdkSuccess = await publishPackage('packages/sdk-js', dryRun);
  if (!sdkSuccess) {
    log.error('Failed to publish sdk-js package');
    process.exit(1);
  }
  
  if (dryRun) {
    log.success('Dry run completed successfully!');
  } else {
    log.success('All packages published successfully!');
    log.info('Published packages:');
    console.log(`  ✅ ${typesInfo.name}@${typesInfo.version}`);
    console.log(`  ✅ ${sdkInfo.name}@${sdkInfo.version}`);
    
    log.info('You may want to create a git tag for this release:');
    console.log('  git add .');
    console.log('  git commit -m "chore: release packages"');
    console.log(`  git tag v${sdkInfo.version}`);
    console.log('  git push && git push --tags');
  }
}

// Run the script
main().catch((error) => {
  log.error(`Script failed: ${error.message}`);
  process.exit(1);
}); 