# [1.1.0](https://github.com/ankit-roy-0602/react-datepicker-lite/compare/v1.0.1...v1.1.0) (2025-08-01)


### Features

* add comprehensive performance optimization documentation ([2e383c9](https://github.com/ankit-roy-0602/react-datepicker-lite/commit/2e383c9cdf7c646c49f0a51a87f7c82fb7810f79))


## [1.1.1] - 2025-08-01

- Merge branch 'feat/add-performance-optimization-docs' (3fd382f)
- fix: resolve semantic-release issue and add manual release fallback (b3f262d)

## [1.0.1](https://github.com/ankit-roy-0602/react-datepicker-lite/compare/v1.0.0...v1.0.1) (2025-08-01)


### Bug Fixes

* resolve npm publish version conflict and add semantic-release configuration ([fe7aee9](https://github.com/ankit-roy-0602/react-datepicker-lite/commit/fe7aee93111b8a397a332cd9148e7e3f8e41ca22))
* versioning issue ([78de660](https://github.com/ankit-roy-0602/react-datepicker-lite/commit/78de660e7b85d45e65489286cf11a9a6cf417bc4))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [1.0.2] - 2025-01-31

### Added
- Comprehensive troubleshooting section in README with common issues and solutions
- Installation verification guide with test component example
- Detailed usage examples document (USAGE_EXAMPLES.md) covering:
  - Basic and advanced usage patterns
  - Form integration with React Hook Form and Formik
  - Framework integration (Next.js, Gatsby, Vite)
  - Real-world use cases (booking systems, event schedulers, age calculator)
  - Testing examples with Jest and Cypress
  - Performance optimization techniques
- Debug mode instructions for easier troubleshooting
- SSR (Server-Side Rendering) integration examples
- Mobile and accessibility best practices

### Changed
- Enhanced README.md with better organization and comprehensive troubleshooting
- Updated package.json to include USAGE_EXAMPLES.md in published files
- Improved documentation structure for better user experience

### Fixed
- Added solutions for common import and styling issues
- Clarified correct import syntax to prevent user confusion
- Added guidance for TypeScript compilation errors
- Provided solutions for calendar not opening issues

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
