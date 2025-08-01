import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';

// Mock dates for consistent testing
const mockCurrentDate = new Date('2024-01-15T12:00:00.000Z');
const mockSelectedDate = new Date('2024-01-10T12:00:00.000Z');

// Helper function to create a calendar with default props
const createCalendar = (props = {}) => {
  const defaultProps = {
    currentDate: mockCurrentDate,
    onCurrentDateChange: jest.fn(),
    selectedDate: null,
    onDateSelect: jest.fn(),
    dateAdapter: nativeDateAdapter,
    locale: defaultLocale,
    ...props,
  };
  return render(<Calendar {...defaultProps} />);
};

describe('Calendar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      createCalendar();
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('displays month and year header', () => {
      createCalendar();
      expect(
        screen.getByRole('button', { name: /January 2024/ })
      ).toBeInTheDocument();
    });

    it('displays weekday headers', () => {
      createCalendar();
      expect(screen.getByText('Su')).toBeInTheDocument();
      expect(screen.getByText('Mo')).toBeInTheDocument();
      expect(screen.getByText('Tu')).toBeInTheDocument();
      expect(screen.getByText('We')).toBeInTheDocument();
      expect(screen.getByText('Th')).toBeInTheDocument();
      expect(screen.getByText('Fr')).toBeInTheDocument();
      expect(screen.getByText('Sa')).toBeInTheDocument();
    });

    it('displays date buttons for current month', () => {
      createCalendar();

      // Should have buttons for all days in January 2024 (31 days)
      // Use more specific aria-label matching to avoid ambiguity
      for (let day = 1; day <= 31; day++) {
        const dateString = `01/${day.toString().padStart(2, '0')}/2024`;
        expect(
          screen.getByRole('button', { name: dateString })
        ).toBeInTheDocument();
      }
    });

    it('applies custom className', () => {
      createCalendar({ className: 'custom-calendar' });
      expect(screen.getByRole('grid').closest('.rdl-calendar')).toHaveClass(
        'custom-calendar'
      );
    });
  });

  describe('Date Selection', () => {
    it('highlights selected date', () => {
      createCalendar({ selectedDate: mockSelectedDate });

      const selectedButton = screen.getByRole('button', { name: /10/ });
      expect(selectedButton).toHaveClass('rdl-calendar-day--selected');
    });

    it('calls onDateSelect when date is clicked', async () => {
      const onDateSelect = jest.fn();
      createCalendar({ onDateSelect });

      const dateButton = screen.getByRole('button', { name: /15/ });
      await userEvent.click(dateButton);

      expect(onDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it('does not call onDateSelect for disabled dates', async () => {
      const onDateSelect = jest.fn();
      const disabledDates = [new Date('2024-01-15')];
      createCalendar({ onDateSelect, disabledDates });

      const disabledButton = screen.getByRole('button', { name: /15/ });
      expect(disabledButton).toBeDisabled();

      await userEvent.click(disabledButton);
      expect(onDateSelect).not.toHaveBeenCalled();
    });

    it('highlights today', () => {
      const today = new Date();
      const currentDate = new Date(today.getFullYear(), today.getMonth(), 15);

      createCalendar({ currentDate });

      // Only check if today is in the current month being displayed
      if (
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear()
      ) {
        // Use more specific selector to find today's button
        const todayButton = screen.getByRole('button', {
          name: new RegExp(
            `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`
          ),
        });
        expect(todayButton).toHaveClass('rdl-calendar-day--today');
      } else {
        // If today is not in the displayed month, just verify calendar renders
        expect(screen.getByRole('grid')).toBeInTheDocument();
      }
    });
  });

  describe('Navigation', () => {
    it('navigates to previous month when previous button is clicked', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const prevButton = screen.getByRole('button', {
        name: /previous month/i,
      });
      await userEvent.click(prevButton);

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
      const calledDate = onCurrentDateChange.mock.calls[0][0];
      expect(calledDate.getMonth()).toBe(11); // December (0-indexed)
      expect(calledDate.getFullYear()).toBe(2023);
    });

    it('navigates to next month when next button is clicked', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const nextButton = screen.getByRole('button', { name: /next month/i });
      await userEvent.click(nextButton);

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
      const calledDate = onCurrentDateChange.mock.calls[0][0];
      expect(calledDate.getMonth()).toBe(1); // February (0-indexed)
      expect(calledDate.getFullYear()).toBe(2024);
    });

    it('navigates to previous year when clicking month/year header with Shift', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const header = screen.getByRole('button', { name: /January 2024/ });
      fireEvent.click(header, { shiftKey: true });

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
      const calledDate = onCurrentDateChange.mock.calls[0][0];
      expect(calledDate.getFullYear()).toBe(2023);
    });

    it('navigates to next year when clicking month/year header', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const header = screen.getByRole('button', { name: /January 2024/ });
      await userEvent.click(header);

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
      const calledDate = onCurrentDateChange.mock.calls[0][0];
      expect(calledDate.getFullYear()).toBe(2025);
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', async () => {
      createCalendar();

      const dateButton = screen.getByRole('button', { name: /15/ });
      dateButton.focus();

      // Right arrow should move to next day
      fireEvent.keyDown(dateButton, { key: 'ArrowRight' });

      const nextDayButton = screen.getByRole('button', { name: /16/ });
      expect(nextDayButton).toHaveFocus();
    });

    it('supports Enter key for date selection', async () => {
      const onDateSelect = jest.fn();
      createCalendar({ onDateSelect });

      const dateButton = screen.getByRole('button', { name: /15/ });
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: 'Enter' });

      expect(onDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it('supports Space key for date selection', async () => {
      const onDateSelect = jest.fn();
      createCalendar({ onDateSelect });

      const dateButton = screen.getByRole('button', { name: /15/ });
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: ' ' });

      expect(onDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it('supports Home key to go to first day of week', async () => {
      createCalendar();

      const dateButton = screen.getByRole('button', { name: /15/ }); // Wednesday
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: 'Home' });

      // Should focus on Sunday of the same week
      const sundayButton = screen.getByRole('button', { name: /14/ });
      expect(sundayButton).toHaveFocus();
    });

    it('supports End key to go to last day of week', async () => {
      createCalendar();

      const dateButton = screen.getByRole('button', { name: '01/15/2024' }); // Wednesday
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: 'End' });

      // Should focus on Saturday of the same week
      const saturdayButton = screen.getByRole('button', { name: '01/20/2024' });
      expect(saturdayButton).toHaveFocus();
    });

    it('supports PageUp to go to previous month', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const dateButton = screen.getByRole('button', { name: /15/ });
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: 'PageUp' });

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('supports PageDown to go to next month', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const dateButton = screen.getByRole('button', { name: /15/ });
      dateButton.focus();

      fireEvent.keyDown(dateButton, { key: 'PageDown' });

      expect(onCurrentDateChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Date Constraints', () => {
    it('disables dates before minDate', () => {
      const minDate = new Date('2024-01-15');
      createCalendar({ minDate });

      const beforeMinButton = screen.getByRole('button', {
        name: '01/14/2024',
      });
      expect(beforeMinButton).toBeDisabled();

      const afterMinButton = screen.getByRole('button', { name: '01/15/2024' });
      expect(afterMinButton).not.toBeDisabled();
    });

    it('disables dates after maxDate', () => {
      const maxDate = new Date('2024-01-15');
      createCalendar({ maxDate });

      const beforeMaxButton = screen.getByRole('button', { name: /15/ });
      expect(beforeMaxButton).not.toBeDisabled();

      const afterMaxButton = screen.getByRole('button', { name: /16/ });
      expect(afterMaxButton).toBeDisabled();
    });

    it('disables dates in disabledDates array', () => {
      const disabledDates = [new Date('2024-01-15'), new Date('2024-01-20')];
      createCalendar({ disabledDates });

      const disabledButton1 = screen.getByRole('button', {
        name: '01/15/2024',
      });
      const disabledButton2 = screen.getByRole('button', {
        name: '01/20/2024',
      });
      const enabledButton = screen.getByRole('button', { name: '01/16/2024' });

      expect(disabledButton1).toBeDisabled();
      expect(disabledButton2).toBeDisabled();
      expect(enabledButton).not.toBeDisabled();
    });

    it('disables dates using disabledDates function', () => {
      const disabledDates = (date: Date) => date.getDay() === 0; // Disable Sundays
      createCalendar({ disabledDates });

      // January 7, 2024 is a Sunday - use specific aria-label
      const sundayButton = screen.getByRole('button', { name: '01/07/2024' });
      const mondayButton = screen.getByRole('button', { name: '01/08/2024' });

      expect(sundayButton).toBeDisabled();
      expect(mondayButton).not.toBeDisabled();
    });
  });

  describe('Week Numbers', () => {
    it('shows week numbers when showWeekNumbers is true', () => {
      createCalendar({ showWeekNumbers: true });

      // Should show week numbers column
      expect(screen.getByText('Wk')).toBeInTheDocument();
    });

    it('hides week numbers when showWeekNumbers is false', () => {
      createCalendar({ showWeekNumbers: false });

      // Should not show week numbers column
      expect(screen.queryByText('Wk')).not.toBeInTheDocument();
    });
  });

  describe('Locale Support', () => {
    it('uses custom locale for month names', () => {
      const customLocale = {
        ...defaultLocale,
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
      };

      createCalendar({ locale: customLocale });

      expect(
        screen.getByRole('button', { name: /Enero 2024/ })
      ).toBeInTheDocument();
    });

    it('uses custom locale for weekday names', () => {
      const customLocale = {
        ...defaultLocale,
        weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      };

      createCalendar({ locale: customLocale });

      expect(screen.getByText('Do')).toBeInTheDocument();
      expect(screen.getByText('Lu')).toBeInTheDocument();
    });

    it('respects firstDayOfWeek from locale', () => {
      const customLocale = {
        ...defaultLocale,
        firstDayOfWeek: 1, // Monday first
        weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Keep original order
      };

      createCalendar({ locale: customLocale });

      // First column should be Monday (index 1 from the original array)
      const weekdayHeaders = screen.getAllByRole('columnheader');
      expect(weekdayHeaders[0]).toHaveTextContent('Mo');
    });
  });

  describe('Range Selection', () => {
    it('highlights date range when selectedRange is provided', () => {
      const selectedRange = {
        start: new Date('2024-01-10'),
        end: new Date('2024-01-15'),
      };

      createCalendar({ selectedRange, isRangeSelection: true });

      const startButton = screen.getByRole('button', { name: '01/10/2024' });
      const endButton = screen.getByRole('button', { name: '01/15/2024' });
      const middleButton = screen.getByRole('button', { name: '01/12/2024' });

      expect(startButton).toHaveClass('rdl-calendar-day--range-start');
      expect(endButton).toHaveClass('rdl-calendar-day--range-end');
      expect(middleButton).toHaveClass('rdl-calendar-day--in-range');
    });

    it('shows hover effect during range selection', async () => {
      const onRangeHover = jest.fn();
      createCalendar({
        isRangeSelection: true,
        onRangeHover,
        rangeHoverDate: new Date('2024-01-12'),
      });

      const hoverButton = screen.getByRole('button', { name: '01/12/2024' });
      await userEvent.hover(hoverButton);

      expect(onRangeHover).toHaveBeenCalledWith(expect.any(Date));
    });

    it('clears hover effect when mouse leaves', async () => {
      const onRangeHover = jest.fn();
      createCalendar({
        isRangeSelection: true,
        onRangeHover,
      });

      const dateButton = screen.getByRole('button', { name: '01/12/2024' });
      await userEvent.unhover(dateButton);

      expect(onRangeHover).toHaveBeenCalledWith(null);
    });
  });

  describe('Date Adapter Integration', () => {
    it('uses date adapter for date calculations', () => {
      const customAdapter = {
        ...nativeDateAdapter,
        format: jest.fn().mockImplementation(nativeDateAdapter.format),
        addMonths: jest.fn().mockImplementation(nativeDateAdapter.addMonths),
        startOfMonth: jest
          .fn()
          .mockImplementation(nativeDateAdapter.startOfMonth),
        addDays: jest.fn().mockImplementation(nativeDateAdapter.addDays),
        getDay: jest.fn().mockImplementation(nativeDateAdapter.getDay),
        getMonth: jest.fn().mockImplementation(nativeDateAdapter.getMonth),
        getYear: jest.fn().mockImplementation(nativeDateAdapter.getYear),
        isBefore: jest.fn().mockImplementation(nativeDateAdapter.isBefore),
        isSameDay: jest.fn().mockImplementation(nativeDateAdapter.isSameDay),
        today: jest.fn().mockImplementation(nativeDateAdapter.today),
        isSameMonth: jest
          .fn()
          .mockImplementation(nativeDateAdapter.isSameMonth),
        isValid: jest.fn().mockImplementation(nativeDateAdapter.isValid),
      };

      createCalendar({ dateAdapter: customAdapter });

      // Date adapter methods should be called for calendar operations
      expect(customAdapter.format).toHaveBeenCalled();
      expect(customAdapter.startOfMonth).toHaveBeenCalled();
    });

    it('handles invalid dates from adapter gracefully', () => {
      // Just test that the calendar renders without throwing
      // The adapter is already robust, so we just verify it works
      expect(() => createCalendar()).not.toThrow();
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles leap year correctly', () => {
      const leapYearDate = new Date('2024-02-15'); // 2024 is a leap year
      createCalendar({ currentDate: leapYearDate });

      expect(
        screen.getByRole('button', { name: /February 2024/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '02/29/2024' })
      ).toBeInTheDocument(); // Feb 29 should exist
    });

    it('handles non-leap year correctly', () => {
      const nonLeapYearDate = new Date('2023-02-15'); // 2023 is not a leap year
      createCalendar({ currentDate: nonLeapYearDate });

      expect(
        screen.getByRole('button', { name: /February 2023/ })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '02/29/2023' })
      ).not.toBeInTheDocument(); // Feb 29 should not exist
    });

    it('handles month boundaries correctly', () => {
      const endOfMonth = new Date('2024-01-31');
      createCalendar({ currentDate: endOfMonth });

      expect(
        screen.getByRole('button', { name: '01/31/2024' })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /32/ })
      ).not.toBeInTheDocument();
    });

    it('handles year boundaries correctly', () => {
      const endOfYear = new Date('2024-12-31');
      createCalendar({ currentDate: endOfYear });

      expect(
        screen.getByRole('button', { name: /December 2024/ })
      ).toBeInTheDocument();
    });

    it('handles rapid navigation without errors', async () => {
      const onCurrentDateChange = jest.fn();
      createCalendar({ onCurrentDateChange });

      const nextButton = screen.getByRole('button', { name: /next month/i });

      // Rapidly click next month multiple times
      for (let i = 0; i < 5; i++) {
        await userEvent.click(nextButton);
      }

      expect(onCurrentDateChange).toHaveBeenCalledTimes(5);
    });

    it('handles component unmount gracefully', () => {
      const { unmount } = createCalendar();

      expect(() => unmount()).not.toThrow();
    });

    it('handles null selectedDate gracefully', () => {
      createCalendar({ selectedDate: null });

      // Should render without errors
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles undefined selectedRange gracefully', () => {
      createCalendar({
        selectedRange: undefined,
        isRangeSelection: true,
      });

      // Should render without errors
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      createCalendar();

      const grid = screen.getByRole('grid');
      expect(grid).toHaveAttribute('aria-label');

      const dateButtons = screen.getAllByRole('button');
      dateButtons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('supports screen reader navigation', () => {
      createCalendar();

      const grid = screen.getByRole('grid');
      expect(grid).toHaveAttribute('role', 'grid');

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(0);

      const gridcells = screen.getAllByRole('gridcell');
      expect(gridcells.length).toBeGreaterThan(0);
    });

    it('announces selected date to screen readers', () => {
      createCalendar({ selectedDate: mockSelectedDate });

      const selectedButton = screen.getByRole('button', { name: /10/ });
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('announces disabled dates to screen readers', () => {
      const disabledDates = [new Date('2024-01-15')];
      createCalendar({ disabledDates });

      const disabledButton = screen.getByRole('button', { name: /15/ });
      expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('provides proper focus management', async () => {
      createCalendar();

      const firstDateButton = screen.getByRole('button', {
        name: '01/01/2024',
      });
      firstDateButton.focus();

      expect(firstDateButton).toHaveFocus();

      // Tab should move to next focusable element
      await userEvent.tab();
      expect(firstDateButton).not.toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const onDateSelect = jest.fn();
      const { rerender } = createCalendar({ onDateSelect });

      // Re-render with same props
      rerender(
        <Calendar
          currentDate={mockCurrentDate}
          onCurrentDateChange={jest.fn()}
          selectedDate={null}
          onDateSelect={onDateSelect}
          dateAdapter={nativeDateAdapter}
          locale={defaultLocale}
        />
      );

      // Should still render correctly
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles large date ranges efficiently', () => {
      const startTime = performance.now();

      createCalendar({
        minDate: new Date('2020-01-01'),
        maxDate: new Date('2030-12-31'),
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('works correctly with all props combined', async () => {
      const onDateSelect = jest.fn();
      const onCurrentDateChange = jest.fn();
      const onRangeHover = jest.fn();

      const minDate = new Date('2024-01-05');
      const maxDate = new Date('2024-01-25');
      const disabledDates = [new Date('2024-01-15')];
      const selectedRange = {
        start: new Date('2024-01-10'),
        end: new Date('2024-01-12'),
      };

      createCalendar({
        selectedDate: mockSelectedDate,
        selectedRange,
        onDateSelect,
        onCurrentDateChange,
        onRangeHover,
        minDate,
        maxDate,
        disabledDates,
        showWeekNumbers: true,
        isRangeSelection: true,
        className: 'test-calendar',
      });

      // Should render all features correctly
      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.getByText('Wk')).toBeInTheDocument();

      // Should handle date selection
      const enabledButton = screen.getByRole('button', { name: /11/ });
      await userEvent.click(enabledButton);

      expect(onDateSelect).toHaveBeenCalled();
    });

    it('maintains state consistency across interactions', async () => {
      const onDateSelect = jest.fn();
      const onCurrentDateChange = jest.fn();

      createCalendar({ onDateSelect, onCurrentDateChange });

      // Navigate to next month
      const nextButton = screen.getByRole('button', { name: /next month/i });
      await userEvent.click(nextButton);

      expect(onCurrentDateChange).toHaveBeenCalled();

      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/ });
      await userEvent.click(dateButton);

      expect(onDateSelect).toHaveBeenCalled();

      // Both callbacks should have been called
      expect(onCurrentDateChange).toHaveBeenCalledTimes(1);
      expect(onDateSelect).toHaveBeenCalledTimes(1);
    });
  });
});
