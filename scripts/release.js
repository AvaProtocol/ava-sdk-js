#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Release script that handles workspace dependencies and publishing
 */

function updateWorkspaceDependencies() {
  console.log('Updating workspace dependencies for publishing...');
  
  const packages = ['types', 'sdk-js'];
  
  for (const pkg of packages) {
    const packagePath = path.join(__dirname, '..', 'packages', pkg);
    const packageJsonPath = path.join(packagePath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        let updated = false;
        
        // Update dependencies
        if (packageJson.dependencies) {
          for (const [dep, version] of Object.entries(packageJson.dependencies)) {
            if (version === 'workspace:*') {
              const depPackageName = dep.replace('@avaprotocol/', '');
              const depPackagePath = path.join(__dirname, '..', 'packages', depPackageName, 'package.json');
              
              if (fs.existsSync(depPackagePath)) {
                const depPackageJson = JSON.parse(fs.readFileSync(depPackagePath, 'utf8'));
                packageJson.dependencies[dep] = `^${depPackageJson.version}`;
                updated = true;
                console.log(`Updated ${dep} to ^${depPackageJson.version} in ${pkg}`);
              }
            }
          }
        }
        
        if (updated) {
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        }
      } catch (error) {
        console.error(`Error updating ${pkg}:`, error.message);
      }
    }
  }
}

function restoreWorkspaceDependencies() {
  console.log('Restoring workspace dependencies...');
  
  const packages = ['types', 'sdk-js'];
  
  for (const pkg of packages) {
    const packagePath = path.join(__dirname, '..', 'packages', pkg);
    const packageJsonPath = path.join(packagePath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        let updated = false;
        
        // Restore dependencies
        if (packageJson.dependencies) {
          for (const [dep] of Object.entries(packageJson.dependencies)) {
            if (dep.startsWith('@avaprotocol/')) {
              packageJson.dependencies[dep] = 'workspace:*';
              updated = true;
            }
          }
        }
        
        if (updated) {
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
          console.log(`Restored workspace dependencies in ${pkg}`);
        }
      } catch (error) {
        console.error(`Error restoring ${pkg}:`, error.message);
      }
    }
  }
}

function release() {
  try {
    console.log('🚀 Starting release process...');
    
    // Check if there are any changesets
    const changesetPath = path.join(__dirname, '..', '.changeset');
    const changesetFiles = fs.readdirSync(changesetPath).filter(file => file.endsWith('.md'));
    
    if (changesetFiles.length === 0) {
      console.log('No changesets found. Run "yarn changeset" to create one.');
      return;
    }
    
    console.log(`Found ${changesetFiles.length} changeset(s)`);
    
    // Build all packages
    console.log('📦 Building packages...');
    execSync('yarn build', { stdio: 'inherit' });
    
    // Update workspace dependencies for publishing
    updateWorkspaceDependencies();
    
    // Version packages using changesets
    console.log('🏷️  Versioning packages...');
    execSync('yarn version', { stdio: 'inherit' });
    
    // Publish packages
    console.log('📤 Publishing packages...');
    execSync('yarn changeset publish', { stdio: 'inherit' });
    
    // Restore workspace dependencies
    restoreWorkspaceDependencies();
    
    console.log('✅ Release completed successfully!');
    
  } catch (error) {
    console.error('❌ Release failed:', error.message);
    
    // Always try to restore workspace dependencies on failure
    try {
      restoreWorkspaceDependencies();
    } catch (restoreError) {
      console.error('Failed to restore workspace dependencies:', restoreError.message);
    }
    
    process.exit(1);
  }
}

// Run the release process
release(); 