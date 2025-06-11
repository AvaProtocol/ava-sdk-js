#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to prepare packages for publishing by replacing workspace dependencies
 * with actual version numbers from the workspace packages.
 */

function getPackageVersion(packageName) {
  try {
    const packagePath = path.join(__dirname, '..', 'packages', packageName, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error(`Error reading version for ${packageName}:`, error.message);
    return null;
  }
}

function updatePackageJson(packagePath) {
  try {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let updated = false;

    // Update dependencies
    if (packageJson.dependencies) {
      for (const [dep, version] of Object.entries(packageJson.dependencies)) {
        if (version === 'workspace:*') {
          const actualVersion = getPackageVersion(dep.replace('@avaprotocol/', ''));
          if (actualVersion) {
            packageJson.dependencies[dep] = `^${actualVersion}`;
            updated = true;
            console.log(`Updated dependency ${dep} from workspace:* to ^${actualVersion}`);
          }
        }
      }
    }

    // Update devDependencies
    if (packageJson.devDependencies) {
      for (const [dep, version] of Object.entries(packageJson.devDependencies)) {
        if (version === 'workspace:*') {
          const actualVersion = getPackageVersion(dep.replace('@avaprotocol/', ''));
          if (actualVersion) {
            packageJson.devDependencies[dep] = `^${actualVersion}`;
            updated = true;
            console.log(`Updated devDependency ${dep} from workspace:* to ^${actualVersion}`);
          }
        }
      }
    }

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`Updated package.json for ${path.basename(packagePath)}`);
    } else {
      console.log(`No workspace dependencies found in ${path.basename(packagePath)}`);
    }

    return updated;
  } catch (error) {
    console.error(`Error updating package.json for ${packagePath}:`, error.message);
    return false;
  }
}

// Get the package directory from command line or use current directory
const packageDir = process.argv[2] || process.cwd();
const packageName = path.basename(packageDir);

console.log(`Preparing package: ${packageName}`);
updatePackageJson(packageDir); 