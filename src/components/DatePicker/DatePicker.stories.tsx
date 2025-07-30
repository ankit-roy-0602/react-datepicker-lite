import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { nativeDateAdapter } from '@/adapters/native';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A lightweight, accessible, and customizable React date picker component with TypeScript support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'The selected date value (controlled)',
    },
    defaultValue: {
      control: false,
      description: 'The default selected date value (uncontrolled)',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when the date changes',
    },
    dateAdapter: {
      control: false,
      description: 'Date adapter for date operations',
    },
    format: {
      control: 'text',
      description: 'Date format string',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the date picker is read-only',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto-focus the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
    minDate: {
      control: false,
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: false,
      description: 'Maximum selectable date',
    },
    showWeekNumbers: {
      control: 'boolean',
      description: 'Whether to show week numbers',
    },
    showToday: {
      control: 'boolean',
      description: 'Whether to show the today button',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close the calendar on date selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
    dateAdapter: nativeDateAdapter,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(),
    placeholder: 'Select a date',
    dateAdapter: nativeDateAdapter,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select a date',
    disabled: true,
    dateAdapter: nativeDateAdapter,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: new Date(),
    placeholder: 'Select a date',
    readOnly: true,
    dateAdapter: nativeDateAdapter,
  },
};

export const WithMinMaxDates: Story = {
  args: {
    placeholder: 'Select a date',
    minDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    dateAdapter: nativeDateAdapter,
  },
};

export const WithWeekNumbers: Story = {
  args: {
    placeholder: 'Select a date',
    showWeekNumbers: true,
    dateAdapter: nativeDateAdapter,
  },
};

export const WithoutTodayButton: Story = {
  args: {
    placeholder: 'Select a date',
    showToday: false,
    dateAdapter: nativeDateAdapter,
  },
};

export const KeepOpenOnSelect: Story = {
  args: {
    placeholder: 'Select a date',
    closeOnSelect: false,
    dateAdapter: nativeDateAdapter,
  },
};

export const CustomFormat: Story = {
  args: {
    placeholder: 'Select a date',
    format: 'dd/MM/yyyy',
    dateAdapter: nativeDateAdapter,
  },
};
