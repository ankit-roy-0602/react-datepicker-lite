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

- 📧 Email: ankit.roy.0602@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/ankit-roy-0602/react-datepicker-lite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ankit-roy-0602/react-datepicker-lite/discussions)

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/ankit-roy-0602">Ankit Roy</a></strong>
</div>
