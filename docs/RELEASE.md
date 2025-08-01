# Release Process

This document outlines the release process for react-datepicker-lite, including both automated and manual approaches.

## Automated Release (Semantic Release)

The project uses semantic-release for automated releases based on conventional commits.

### How it works

1. **Commit Analysis**: Semantic-release analyzes commit messages to determine the version bump
2. **Version Bump**: Automatically updates package.json version
3. **Changelog**: Generates CHANGELOG.md entries
4. **Git Tag**: Creates and pushes git tags
5. **NPM Publish**: Publishes to npm registry
6. **GitHub Release**: Creates GitHub releases

### Commit Message Format

Follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `BREAKING CHANGE`: Breaking change (major version bump)
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

### Examples

```bash
# Patch release (1.0.0 → 1.0.1)
git commit -m "fix: resolve date parsing issue in Safari"

# Minor release (1.0.0 → 1.1.0)
git commit -m "feat: add keyboard navigation support"

# Major release (1.0.0 → 2.0.0)
git commit -m "feat!: redesign API for better TypeScript support

BREAKING CHANGE: DatePicker props have been restructured"
```

### Triggering a Release

1. Merge changes to `main` branch
2. GitHub Actions will automatically run semantic-release
3. If there are releasable changes, a new version will be published

### Configuration

Semantic-release configuration is in `.releaserc.json`:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}
```

## Manual Release (Fallback)

If semantic-release fails or you need manual control, use the manual release script.

### Prerequisites

- Node.js 18+
- npm authentication (`npm login`)
- Git authentication
- GitHub CLI (optional, for GitHub releases)

### Commands

```bash
# Automatic version detection based on commits
npm run release:manual

# Specific version bumps
npm run release:manual:patch  # 1.0.0 → 1.0.1
npm run release:manual:minor  # 1.0.0 → 1.1.0
npm run release:manual:major  # 1.0.0 → 2.0.0
```

### What the manual script does

1. **Validation**: Ensures you're on main branch and up to date
2. **Testing**: Runs type-check, lint, tests, and build
3. **Version Analysis**: Analyzes commits to determine version bump
4. **Version Update**: Updates package.json
5. **Changelog**: Generates changelog entries
6. **Git Operations**: Commits, tags, and pushes changes
7. **NPM Publish**: Publishes to npm registry
8. **GitHub Release**: Creates GitHub release (if gh CLI available)

### Manual Script Features

- **Commit Analysis**: Automatically detects version bump type from conventional commits
- **Safety Checks**: Validates environment before proceeding
- **Rollback Safe**: Each step is validated before proceeding
- **Flexible**: Supports manual version specification

## Troubleshooting

### Semantic Release Issues

If semantic-release fails with issue reference errors:

1. Check `.releaserc.json` configuration
2. Ensure no placeholder issue numbers in templates
3. Verify GitHub token permissions
4. Use manual release as fallback

### Common Issues

**Issue**: "Could not resolve to an issue or pull request"
**Solution**: Check for placeholder issue numbers (#123, #456) in:
- Pull request templates
- Issue templates
- Commit messages
- Release notes

**Issue**: NPM publish fails
**Solution**: 
- Verify npm authentication: `npm whoami`
- Check package name availability
- Ensure version doesn't already exist

**Issue**: Git push fails
**Solution**:
- Verify git authentication
- Check branch protection rules
- Ensure you have push permissions

## Best Practices

1. **Use Conventional Commits**: Enables automatic version detection
2. **Test Before Release**: Always run full test suite
3. **Review Changes**: Check generated changelog before release
4. **Monitor Releases**: Watch for successful deployment
5. **Rollback Plan**: Know how to revert if issues arise

## Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Version bump appropriate
- [ ] Changelog reviewed
- [ ] NPM package published
- [ ] GitHub release created
- [ ] Deployment verified

## Emergency Procedures

### Rollback a Release

```bash
# Unpublish from npm (within 24 hours)
npm unpublish react-datepicker-lite@<version>

# Delete git tag
git tag -d v<version>
git push origin :refs/tags/v<version>

# Delete GitHub release
gh release delete v<version>
```

### Hotfix Release

```bash
# Create hotfix branch from tag
git checkout -b hotfix/v<version> v<previous-version>

# Make fixes
git commit -m "fix: critical security issue"

# Manual release
npm run release:manual:patch
```

## Support

For release-related issues:
1. Check GitHub Actions logs
2. Review semantic-release documentation
3. Use manual release script as fallback
4. Contact maintainers if needed
