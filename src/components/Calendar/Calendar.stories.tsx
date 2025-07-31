import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A calendar component for date selection with support for single dates and date ranges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentDate: {
      control: false,
      description: 'The currently displayed month/year',
    },
    onCurrentDateChange: {
      action: 'onCurrentDateChange',
      description: 'Callback fired when the displayed month/year changes',
    },
    selectedDate: {
      control: false,
      description: 'The currently selected date',
    },
    onDateSelect: {
      action: 'onDateSelect',
      description: 'Callback fired when a date is selected',
    },
    dateAdapter: {
      control: false,
      description: 'Date adapter for date operations',
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
    isRangeSelection: {
      control: 'boolean',
      description: 'Whether to enable range selection mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CalendarWrapper = (args: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      {...args}
      currentDate={currentDate}
      onCurrentDateChange={setCurrentDate}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      dateAdapter={nativeDateAdapter}
    />
  );
};

export const Default: Story = {
  render: CalendarWrapper,
  args: {},
};

export const WithSelectedDate: Story = {
  render: CalendarWrapper,
  args: {},
};

export const WithWeekNumbers: Story = {
  render: CalendarWrapper,
  args: {
    showWeekNumbers: true,
  },
};

const WithMinMaxDatesWrapper = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      currentDate={currentDate}
      onCurrentDateChange={setCurrentDate}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      dateAdapter={nativeDateAdapter}
      locale={defaultLocale}
      minDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)} // 7 days ago
      maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
    />
  );
};

export const WithMinMaxDates: Story = {
  render: () => <WithMinMaxDatesWrapper />,
  args: {},
};

const WithDisabledDatesWrapper = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Calendar
      currentDate={currentDate}
      onCurrentDateChange={setCurrentDate}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      dateAdapter={nativeDateAdapter}
      locale={defaultLocale}
      disabledDates={isWeekend}
    />
  );
};

export const WithDisabledDates: Story = {
  render: () => <WithDisabledDatesWrapper />,
  args: {},
};

const RangeSelectionWrapper = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [rangeHoverDate, setRangeHoverDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Start new range
      setSelectedRange({ start: date, end: null });
    } else {
      // Complete the range
      const start = selectedRange.start;
      const end = date;
      if (nativeDateAdapter.isBefore(start, end)) {
        setSelectedRange({ start, end });
      } else {
        setSelectedRange({ start: end, end: start });
      }
    }
  };

  return (
    <Calendar
      currentDate={currentDate}
      onCurrentDateChange={setCurrentDate}
      selectedRange={selectedRange}
      onDateSelect={handleDateSelect}
      dateAdapter={nativeDateAdapter}
      locale={defaultLocale}
      isRangeSelection={true}
      rangeHoverDate={rangeHoverDate}
      onRangeHover={setRangeHoverDate}
    />
  );
};

export const RangeSelection: Story = {
  render: () => <RangeSelectionWrapper />,
  args: {},
};
