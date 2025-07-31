import type { Preview } from '@storybook/react';
import '../src/styles/variables.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'A lightweight, accessible, and customizable React date picker component.',
      },
    },
  },
};

export default preview;
