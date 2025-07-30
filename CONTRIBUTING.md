# Contributing to React DatePicker Lite

Thank you for your interest in contributing to React DatePicker Lite! We welcome contributions from the community and are grateful for your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-datepicker-lite.git
   cd react-datepicker-lite
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ankit-roy-0602/react-datepicker-lite.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Run tests**
   ```bash
   npm test
   ```

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Test improvements**
- 🎨 **UI/UX enhancements**
- ♿ **Accessibility improvements**
- 🌐 **Internationalization**
- ⚡ **Performance optimizations**

### Before You Start

1. **Check existing issues** - Look for existing issues or discussions about your idea
2. **Create an issue** - For new features or significant changes, create an issue first to discuss
3. **Get feedback** - Wait for maintainer feedback before starting work on large changes

## Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Check formatting
npm run format:check

# Type checking
npm run type-check

# Build the project
npm run build
```

### 4. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new date range selection feature"
git commit -m "fix: resolve keyboard navigation issue"
git commit -m "docs: update API documentation"
```

### 5. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use strict TypeScript configuration

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Component Guidelines

- Use functional components with hooks
- Follow React best practices
- Implement proper accessibility (ARIA attributes, keyboard navigation)
- Use semantic HTML elements
- Ensure mobile responsiveness

### CSS Guidelines

- Use CSS custom properties for theming
- Follow BEM naming convention
- Ensure cross-browser compatibility
- Use relative units (rem, em) when appropriate

## Testing Guidelines

### Test Requirements

- **Unit tests** for all new functions and components
- **Integration tests** for component interactions
- **Accessibility tests** using axe-core
- **Visual regression tests** for UI changes

### Writing Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('should render with default props', () => {
    render(<DatePicker />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should handle date selection', () => {
    const onDateChange = jest.fn();
    render(<DatePicker onDateChange={onDateChange} />);
    
    // Test implementation
  });
});
```

### Test Coverage

- Maintain minimum 80% test coverage
- Focus on critical paths and edge cases
- Test accessibility features

## Documentation

### Code Documentation

- Use JSDoc comments for public APIs
- Include examples in documentation
- Document complex logic with inline comments

### README Updates

- Update README.md for new features
- Include usage examples
- Update API documentation

### Storybook

- Add stories for new components
- Include different use cases and variants
- Document component props and events

## Issue Guidelines

### Bug Reports

When reporting bugs:

- Use the bug report template
- Provide minimal reproduction case
- Include environment details
- Add screenshots if applicable

### Feature Requests

When requesting features:

- Use the feature request template
- Explain the use case and problem
- Provide API design suggestions
- Consider backward compatibility

### Questions

For questions:

- Check existing documentation first
- Search previous issues
- Use the question template
- Be specific about your use case

## Development Workflow

### Branch Naming

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation
- `refactor/component-name` - Refactoring
- `test/test-description` - Test improvements

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

### Release Process

We use semantic versioning and automated releases:

- Patch: Bug fixes and small improvements
- Minor: New features (backward compatible)
- Major: Breaking changes

## Performance Considerations

- Keep bundle size minimal
- Avoid unnecessary re-renders
- Use React.memo and useMemo appropriately
- Consider lazy loading for large features
- Test performance impact of changes

## Accessibility Requirements

- Follow WCAG 2.1 AA guidelines
- Ensure keyboard navigation works
- Provide proper ARIA labels
- Test with screen readers
- Maintain good color contrast

## Browser Support

We support:

- Chrome >= 100
- Firefox >= 100
- Safari >= 15.6
- Edge >= 100
- iOS Safari >= 15.6
- Android Chrome >= 100

## Getting Help

- 💬 **Discussions** - Use GitHub Discussions for questions
- 🐛 **Issues** - Report bugs and request features
- 📧 **Email** - Contact maintainers for security issues
- 📖 **Documentation** - Check our comprehensive docs

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

## License

By contributing to React DatePicker Lite, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to React DatePicker Lite! 🎉
