    # 🗓️ React DatePicker Lite

[![npm version](https://badge.fury.io/js/react-datepicker-lite.svg)](https://badge.fury.io/js/react-datepicker-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-datepicker-lite)](https://bundlephobia.com/package/react-datepicker-lite)

> A lightweight, accessible, and highly customizable React date picker component with TypeScript support. Built for modern React applications with performance and user experience in mind.

## ✨ Features

- 🪶 **Ultra Lightweight** - Less than 45KB minified + gzipped
- ♿ **Fully Accessible** - WCAG 2.1 compliant with keyboard navigation
- 📱 **Mobile Friendly** - Touch-optimized with responsive design
- 🎨 **Highly Customizable** - CSS variables and custom themes
- 🔧 **TypeScript First** - Built with TypeScript for better DX
- 🌍 **Internationalization** - Multi-language support
- 📅 **Flexible Date Handling** - Works with native Date objects or Moment.js
- ⚡ **Zero Dependencies** - No external runtime dependencies
- 🎯 **Modern React** - Hooks-based architecture
- 🧪 **Well Tested** - Comprehensive test coverage

## 🚀 Quick Start

### Installation

```bash
npm install react-datepicker-lite
```

```bash
yarn add react-datepicker-lite
```

```bash
pnpm add react-datepicker-lite
```

### Module Compatibility

React DatePicker Lite supports both **ES Modules (ESM)** and **CommonJS** environments:

- ✅ **Modern bundlers** (Vite, Webpack 5, Rollup) - Uses ESM version automatically
- ✅ **Node.js CommonJS** - Uses UMD version automatically  
- ✅ **Legacy bundlers** - Falls back to UMD version
- ✅ **TypeScript projects** - Full type definitions included
- ✅ **Browser environments** - Works with both module types

The package automatically selects the appropriate format based on your environment thanks to the `exports` field in package.json.

### Basic Usage

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date"
    />
  );
}
```

## 📖 Documentation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | The selected date |
| `onChange` | `(date: Date \| null) => void` | - | Callback when date changes |
| `placeholder` | `string` | `"Select date"` | Input placeholder text |
| `disabled` | `boolean` | `false` | Disable the date picker |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `format` | `string` | `"MM/dd/yyyy"` | Date display format |
| `locale` | `string` | `"en"` | Locale for internationalization |
| `className` | `string` | - | Custom CSS class |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme |

### Advanced Usage

#### Custom Styling

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  className="my-custom-datepicker"
  theme="dark"
/>
```

#### Date Range Restrictions

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
/>
```

#### Custom Date Format

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  format="dd/MM/yyyy"
  locale="en-GB"
/>
```

## 🎨 Theming

React DatePicker Lite supports extensive customization through CSS variables:

```css
:root {
  --rdp-primary-color: #007bff;
  --rdp-secondary-color: #6c757d;
  --rdp-background-color: #ffffff;
  --rdp-border-color: #dee2e6;
  --rdp-border-radius: 4px;
  --rdp-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --rdp-font-size: 14px;
  --rdp-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### Dark Theme

```css
[data-theme="dark"] {
  --rdp-primary-color: #0d6efd;
  --rdp-background-color: #212529;
  --rdp-border-color: #495057;
  --rdp-text-color: #ffffff;
}
```

## 🌍 Internationalization

The component supports multiple locales:

```tsx
import { DatePicker } from 'react-datepicker-lite';

// French locale
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  locale="fr"
  format="dd/MM/yyyy"
/>

// German locale
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  locale="de"
  format="dd.MM.yyyy"
/>
```

## ♿ Accessibility

React DatePicker Lite is built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Escape
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Logical focus flow and visible focus indicators
- **High Contrast**: Supports high contrast mode and custom themes
- **WCAG 2.1 Compliant**: Meets AA accessibility standards

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space/Enter` | Open/close calendar |
| `Arrow Keys` | Navigate dates |
| `Page Up/Down` | Navigate months |
| `Shift + Page Up/Down` | Navigate years |
| `Home/End` | Go to start/end of week |
| `Escape` | Close calendar |

## 📱 Mobile Support

The component is optimized for mobile devices:

- Touch-friendly interface with larger touch targets
- Responsive design that adapts to screen size
- Native mobile date picker fallback option
- Swipe gestures for month navigation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## 📦 Bundle Size

React DatePicker Lite is designed to be lightweight:

- **Minified**: ~25KB
- **Minified + Gzipped**: ~8KB
- **Zero runtime dependencies**

## ⚡ Performance Optimization

### Tree Shaking

React DatePicker Lite supports tree shaking out of the box. Import only what you need:

```tsx
// ✅ Tree-shakable imports
import { DatePicker } from 'react-datepicker-lite';
import { Calendar } from 'react-datepicker-lite';
import { DateInput } from 'react-datepicker-lite';

// ❌ Avoid importing everything
import * as RDL from 'react-datepicker-lite';
```

### Code Splitting

For large applications, consider code splitting the DatePicker:

```tsx
// Lazy load the DatePicker
import { lazy, Suspense } from 'react';

const DatePicker = lazy(() => 
  import('react-datepicker-lite').then(module => ({ 
    default: module.DatePicker 
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePicker value={date} onChange={setDate} />
    </Suspense>
  );
}
```

### CSS Optimization

Load CSS efficiently:

```tsx
// ✅ Import CSS once in your main file
import 'react-datepicker-lite/dist/index.css';

// Or use CSS-in-JS for better tree shaking
import { DatePicker } from 'react-datepicker-lite';
// CSS will be automatically included with the component
```

### Memory Management

For applications with many DatePicker instances:

```tsx
// ✅ Memoize callback functions
const handleDateChange = useCallback((date: Date | null) => {
  setSelectedDate(date);
}, []);

// ✅ Memoize the component when props don't change frequently
const MemoizedDatePicker = memo(DatePicker);
```

## ✅ Installation Verification

To verify that the package is working correctly, create a simple test component:

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function TestDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ padding: '20px' }}>
      <h3>DatePicker Test</h3>
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Click to select a date"
      />
      {date && (
        <p>Selected: {date.toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default TestDatePicker;
```

If the component renders and you can select dates, the installation is successful!

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "Module not found" or Import Errors

**Problem**: Cannot import the DatePicker component.

**Solutions**:
```tsx
// ✅ Correct import
import { DatePicker } from 'react-datepicker-lite';

// ❌ Incorrect - don't use default import
import DatePicker from 'react-datepicker-lite';

// ✅ Import multiple components
import { DatePicker, Calendar, DateInput } from 'react-datepicker-lite';
```

#### 2. Styles Not Applied

**Problem**: DatePicker appears unstyled or broken.

**Solution**: Make sure to import the CSS file:
```tsx
// ✅ Required CSS import
import 'react-datepicker-lite/dist/index.css';

// Or in your main CSS file
@import 'react-datepicker-lite/dist/index.css';
```

#### 3. TypeScript Errors

**Problem**: TypeScript compilation errors.

**Solutions**:
```tsx
// ✅ Proper typing
const [date, setDate] = useState<Date | null>(null);

// ✅ Event handler typing
const handleDateChange = (newDate: Date | null) => {
  setDate(newDate);
};

// ✅ Component props typing
import { DatePickerProps } from 'react-datepicker-lite';
```

#### 4. Calendar Not Opening

**Problem**: Clicking the input doesn't open the calendar.

**Possible causes and solutions**:
- **CSS conflicts**: Check if other CSS is overriding styles
- **Event propagation**: Ensure no parent elements are stopping events
- **Disabled state**: Check if `disabled` prop is set to `true`

```tsx
// ✅ Debug by adding event handlers
<DatePicker
  value={date}
  onChange={setDate}
  onFocus={() => console.log('Input focused')}
  onBlur={() => console.log('Input blurred')}
/>
```

#### 5. Date Format Issues

**Problem**: Dates display in wrong format.

**Solution**: Use the `format` prop with proper format strings:
```tsx
// ✅ Common formats
<DatePicker format="MM/DD/YYYY" />  // US format
<DatePicker format="DD/MM/YYYY" />  // European format
<DatePicker format="YYYY-MM-DD" />  // ISO format
```

#### 6. Build/Bundle Issues

**Problem**: Module doesn't work in production build.

**Solutions**:
- Ensure you're importing from the correct path
- Check if your bundler supports ES modules
- For older bundlers, try importing the UMD version:

```tsx
// For older bundlers
import { DatePicker } from 'react-datepicker-lite/dist/index.umd.js';
```

#### 7. React Version Compatibility

**Problem**: Compatibility issues with React version.

**Requirements**:
- React >= 16.8.0 (hooks support required)
- React-DOM >= 16.8.0

```bash
# Check your React version
npm list react react-dom

# Update if needed
npm install react@latest react-dom@latest
```

#### 8. SSR (Server-Side Rendering) Issues

**Problem**: Component breaks during server-side rendering.

**Solution**: Use dynamic imports for SSR frameworks:

```tsx
// Next.js example
import dynamic from 'next/dynamic';

const DatePicker = dynamic(
  () => import('react-datepicker-lite').then(mod => ({ default: mod.DatePicker })),
  { ssr: false }
);
```

### Getting Help

If you're still experiencing issues:

1. **Check the console**: Look for error messages in browser dev tools
2. **Verify imports**: Ensure all imports are correct
3. **Test isolation**: Try the component in a minimal setup
4. **Check versions**: Ensure compatible React and Node.js versions
5. **Create an issue**: [Report bugs on GitHub](https://github.com/ankit-roy-0602/react-datepicker-lite/issues)

### Debug Mode

Enable debug logging by setting a global variable:

```tsx
// Add this before importing the component
(window as any).__RDL_DEBUG__ = true;

import { DatePicker } from 'react-datepicker-lite';
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the React community's need for a lightweight date picker
- Built with modern React patterns and TypeScript best practices
- Accessibility guidelines from WCAG 2.1 and WAI-ARIA

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/ankit-roy-0602/react-datepicker-lite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ankit-roy-0602/react-datepicker-lite/discussions)

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/ankit-roy-0602">Ankit Roy</a></strong>
</div>
