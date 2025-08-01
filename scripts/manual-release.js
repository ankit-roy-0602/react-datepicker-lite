#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Manual release script as an alternative to semantic-release
 * This script handles versioning, changelog generation, and publishing
 */

function execCommand(command, options = {}) {
  console.log(`Executing: ${command}`);
  try {
    const result = execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    });
    return result;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function updateVersion(newVersion) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
}

function getNextVersion(currentVersion, releaseType = 'patch') {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (releaseType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

function analyzeCommits() {
  // Get commits since last tag
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    const commits = execSync(`git log ${lastTag}..HEAD --oneline`, { encoding: 'utf8' });
    
    if (!commits.trim()) {
      console.log('No new commits since last release');
      return null;
    }
    
    // Analyze commit messages for conventional commits
    const commitLines = commits.trim().split('\n');
    let hasBreaking = false;
    let hasFeature = false;
    let hasFix = false;
    
    for (const commit of commitLines) {
      if (commit.includes('BREAKING CHANGE') || commit.includes('!:')) {
        hasBreaking = true;
      } else if (commit.startsWith('feat')) {
        hasFeature = true;
      } else if (commit.startsWith('fix')) {
        hasFix = true;
      }
    }
    
    if (hasBreaking) return 'major';
    if (hasFeature) return 'minor';
    if (hasFix) return 'patch';
    
    return 'patch'; // Default to patch for any changes
  } catch (error) {
    console.log('No previous tags found, this will be the first release');
    return 'patch';
  }
}

function generateChangelog(version) {
  const date = new Date().toISOString().split('T')[0];
  
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    const commits = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s (%h)"`, { encoding: 'utf8' });
    
    const changelogEntry = `\n## [${version}] - ${date}\n\n${commits}\n`;
    
    // Read existing changelog or create new one
    let changelog = '';
    if (fs.existsSync('CHANGELOG.md')) {
      changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    } else {
      changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n';
    }
    
    // Insert new entry after the header
    const lines = changelog.split('\n');
    const headerEndIndex = lines.findIndex(line => line.startsWith('## ')) || 3;
    lines.splice(headerEndIndex, 0, changelogEntry);
    
    fs.writeFileSync('CHANGELOG.md', lines.join('\n'));
    console.log(`Updated CHANGELOG.md with version ${version}`);
  } catch (error) {
    console.log('Could not generate changelog from git history');
  }
}

function createGitTag(version) {
  execCommand(`git add .`);
  execCommand(`git commit -m "chore(release): ${version} [skip ci]"`);
  execCommand(`git tag v${version}`);
  execCommand(`git push origin main`);
  execCommand(`git push origin v${version}`);
}

function createGitHubRelease(version) {
  try {
    // Try to create GitHub release using gh CLI if available
    execCommand(`gh release create v${version} --title "Release v${version}" --notes-from-tag`);
  } catch (error) {
    console.log('GitHub CLI not available or failed. Please create the release manually on GitHub.');
  }
}

function main() {
  const args = process.argv.slice(2);
  const releaseType = args[0] || 'auto';
  
  console.log('🚀 Starting manual release process...');
  
  // Ensure we're on main branch and up to date
  execCommand('git checkout main');
  execCommand('git pull origin main');
  
  // Run tests and build
  console.log('📋 Running tests and build...');
  execCommand('npm run type-check');
  execCommand('npm run lint');
  execCommand('npm run test:run');
  execCommand('npm run build');
  
  // Determine version bump
  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}`);
  
  let bumpType;
  if (releaseType === 'auto') {
    bumpType = analyzeCommits();
    if (!bumpType) {
      console.log('No changes detected. Skipping release.');
      return;
    }
  } else {
    bumpType = releaseType;
  }
  
  const newVersion = getNextVersion(currentVersion, bumpType);
  console.log(`Bumping version: ${currentVersion} → ${newVersion} (${bumpType})`);
  
  // Update package.json
  updateVersion(newVersion);
  
  // Generate changelog
  generateChangelog(newVersion);
  
  // Create git tag and push
  createGitTag(newVersion);
  
  // Publish to npm
  console.log('📦 Publishing to npm...');
  execCommand('npm publish');
  
  // Create GitHub release
  createGitHubRelease(newVersion);
  
  console.log(`✅ Release ${newVersion} completed successfully!`);
}

if (require.main === module) {
  main();
}

module.exports = { main, getNextVersion, analyzeCommits };
