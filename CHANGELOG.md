# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub workflows for CI/CD, PR checks, and automated releases
- Comprehensive issue templates for bug reports, feature requests, and questions
- Pull request template with detailed checklist
- Contributing guidelines and code of conduct
- Security policy and vulnerability reporting process
- Changelog for tracking project changes

### Changed
- Improved project documentation structure

### Deprecated

### Removed

### Fixed

### Security

## [1.0.1] - 2025-01-31

### Fixed
- Fixed React JSX runtime bundling issue that caused "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" error
- Externalized `react/jsx-runtime` dependency to prevent conflicts with consuming applications
- Reduced bundle size from ~58KB to ~21KB for ESM build by properly externalizing React dependencies

### Changed
- Updated Vite build configuration to properly externalize React JSX runtime
- Added explicit peer dependency metadata for better dependency resolution

## [1.0.0] - 2025-01-30

### Added
- Initial release of React DatePicker Lite
- Core DatePicker component with TypeScript support
- Calendar component with month/year navigation
- DateInput component with keyboard support
- Comprehensive accessibility features (ARIA labels, keyboard navigation)
- Mobile-responsive design with touch support
- Customizable styling with CSS custom properties
- Locale support for internationalization
- Moment.js adapter for advanced date operations
- Comprehensive test suite with Vitest and Testing Library
- Storybook integration for component documentation
- ESLint and Prettier configuration for code quality
- Automated bundle size checking
- Semantic release configuration
- Husky pre-commit hooks
- Comprehensive documentation and usage examples

### Features
- **Accessibility**: Full WCAG 2.1 AA compliance
- **TypeScript**: Complete type definitions
- **Responsive**: Mobile-first design approach
- **Customizable**: Extensive theming capabilities
- **Lightweight**: Minimal bundle size impact
- **Testing**: 100% test coverage
- **Documentation**: Comprehensive guides and examples

### Browser Support
- Chrome >= 100
- Firefox >= 100
- Safari >= 15.6
- Edge >= 100
- iOS Safari >= 15.6
- Android Chrome >= 100

### Dependencies
- React >= 16.8.0 (peer dependency)
- React DOM >= 16.8.0 (peer dependency)
- Moment.js (optional dependency)

---

## Release Notes Format

### Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

### Version Numbering
This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Process
Releases are automated using semantic-release based on conventional commits:
- `feat:` triggers a minor version bump
- `fix:` triggers a patch version bump
- `BREAKING CHANGE:` triggers a major version bump

---

## Links
- [Repository](https://github.com/ankit-roy-0602/react-datepicker-lite)
- [NPM Package](https://www.npmjs.com/package/react-datepicker-lite)
- [Documentation](https://github.com/ankit-roy-0602/react-datepicker-lite#readme)
- [Issues](https://github.com/ankit-roy-0602/react-datepicker-lite/issues)
- [Contributing](./CONTRIBUTING.md)
