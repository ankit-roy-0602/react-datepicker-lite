import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import { nativeDateAdapter } from '@/adapters/native';
import { useState } from 'react';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date input component with calendar toggle functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'The selected date value (controlled)',
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
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto-focus the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
    onCalendarToggle: {
      action: 'onCalendarToggle',
      description: 'Callback fired when calendar toggle is clicked',
    },
    isCalendarOpen: {
      control: 'boolean',
      description: 'Whether the calendar is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const DateInputWrapper = (args: any) => {
  const [value, setValue] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <DateInput
      {...args}
      value={value}
      onChange={setValue}
      dateAdapter={nativeDateAdapter}
      isCalendarOpen={isCalendarOpen}
      onCalendarToggle={setIsCalendarOpen}
    />
  );
};

export const Default: Story = {
  render: DateInputWrapper,
  args: {
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
      <DateInput
        {...args}
        value={value}
        onChange={setValue}
        dateAdapter={nativeDateAdapter}
        isCalendarOpen={isCalendarOpen}
        onCalendarToggle={setIsCalendarOpen}
      />
    );
  },
  args: {
    placeholder: 'Select a date',
  },
};

export const Disabled: Story = {
  render: DateInputWrapper,
  args: {
    placeholder: 'Select a date',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: (args) => {
    const [value] = useState<Date | null>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
      <DateInput
        {...args}
        value={value}
        onChange={() => {}}
        dateAdapter={nativeDateAdapter}
        isCalendarOpen={isCalendarOpen}
        onCalendarToggle={setIsCalendarOpen}
      />
    );
  },
  args: {
    placeholder: 'Select a date',
    readOnly: true,
  },
};

export const CustomFormat: Story = {
  render: DateInputWrapper,
  args: {
    placeholder: 'DD/MM/YYYY',
    format: 'dd/MM/yyyy',
  },
};

export const CalendarOpen: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
      <DateInput
        {...args}
        value={value}
        onChange={setValue}
        dateAdapter={nativeDateAdapter}
        isCalendarOpen={true}
        onCalendarToggle={() => {}}
      />
    );
  },
  args: {
    placeholder: 'Select a date',
  },
};

export const WithCustomPlaceholder: Story = {
  render: DateInputWrapper,
  args: {
    placeholder: 'Pick your birthday',
  },
};

export const AutoFocus: Story = {
  render: DateInputWrapper,
  args: {
    placeholder: 'Select a date',
    autoFocus: true,
  },
};
