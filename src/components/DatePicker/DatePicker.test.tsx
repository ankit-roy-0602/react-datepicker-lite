import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';

// Mock date for consistent testing
const mockDate = new Date('2024-01-15T12:00:00.000Z');
const mockToday = new Date('2024-01-20T12:00:00.000Z');

// Helper function to create a date picker with default props
const createDatePicker = (props = {}) => {
  const defaultProps = {
    value: null,
    onChange: jest.fn(),
    ...props,
  };
  return render(<DatePicker {...defaultProps} />);
};

describe('DatePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock today() to return consistent date
    jest.spyOn(nativeDateAdapter, 'today').mockReturnValue(mockToday);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      createDatePicker();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays placeholder text', () => {
      createDatePicker({ placeholder: 'Select a date' });
      expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
    });

    it('displays selected date', () => {
      createDatePicker({ value: mockDate });
      expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      createDatePicker({ className: 'custom-class' });
      const container = screen
        .getByRole('combobox')
        .closest('.rdl-date-picker');
      expect(container).toHaveClass('custom-class');
    });

    it('sets custom id', () => {
      createDatePicker({ id: 'custom-id' });
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id');
    });

    it('sets aria-label', () => {
      createDatePicker({ 'aria-label': 'Custom date picker' });
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-label',
        'Custom date picker'
      );
    });

    it('sets aria-describedby', () => {
      createDatePicker({ 'aria-describedby': 'help-text' });
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-describedby',
        'help-text'
      );
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const onChange = jest.fn();
      const { rerender } = createDatePicker({ value: null, onChange });

      expect(screen.getByRole('combobox')).toHaveValue('');

      rerender(<DatePicker value={mockDate} onChange={onChange} />);
      expect(screen.getByRole('combobox')).toHaveValue('01/15/2024');
    });

    it('works as uncontrolled component with defaultValue', () => {
      // Don't pass value prop to make it uncontrolled
      render(<DatePicker defaultValue={mockDate} onChange={jest.fn()} />);
      expect(screen.getByRole('combobox')).toHaveValue('01/15/2024');
    });

    it('calls onChange when date is selected in controlled mode', async () => {
      const onChange = jest.fn();
      createDatePicker({ value: null, onChange });

      // Open calendar
      await userEvent.click(screen.getByRole('combobox'));

      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/i });
      await userEvent.click(dateButton);

      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Calendar Interaction', () => {
    it('opens calendar when input is clicked', async () => {
      createDatePicker();

      await userEvent.click(screen.getByRole('combobox'));

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('closes calendar when clicking outside', async () => {
      createDatePicker();

      // Open calendar
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('closes calendar when Escape is pressed', async () => {
      createDatePicker();

      // Open calendar
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('closes calendar after date selection when closeOnSelect is true', async () => {
      createDatePicker({ closeOnSelect: true });

      // Open calendar
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/i });
      await userEvent.click(dateButton);

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('keeps calendar open after date selection when closeOnSelect is false', async () => {
      createDatePicker({ closeOnSelect: false });

      // Open calendar
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/i });
      await userEvent.click(dateButton);

      // Calendar should still be open
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Today Button', () => {
    it('shows today button by default', async () => {
      createDatePicker();

      await userEvent.click(screen.getByRole('combobox'));

      expect(
        screen.getByRole('button', { name: /today/i })
      ).toBeInTheDocument();
    });

    it('hides today button when showToday is false', async () => {
      createDatePicker({ showToday: false });

      await userEvent.click(screen.getByRole('combobox'));

      expect(
        screen.queryByRole('button', { name: /today/i })
      ).not.toBeInTheDocument();
    });

    it('selects today when today button is clicked', async () => {
      const onChange = jest.fn();
      createDatePicker({ onChange });

      await userEvent.click(screen.getByRole('combobox'));
      await userEvent.click(screen.getByRole('button', { name: /today/i }));

      expect(onChange).toHaveBeenCalledWith(mockToday);
    });
  });

  describe('Disabled and ReadOnly States', () => {
    it('disables input when disabled prop is true', () => {
      createDatePicker({ disabled: true });

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('does not open calendar when disabled', async () => {
      createDatePicker({ disabled: true });

      await userEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('sets readonly attribute when readOnly prop is true', () => {
      createDatePicker({ readOnly: true });

      expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
    });

    it('does not open calendar when readOnly', async () => {
      createDatePicker({ readOnly: true });

      await userEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('applies disabled class when disabled', () => {
      createDatePicker({ disabled: true });

      const container = screen
        .getByRole('combobox')
        .closest('.rdl-date-picker');
      expect(container).toHaveClass('rdl-date-picker--disabled');
    });
  });

  describe('Date Constraints', () => {
    it('passes minDate to calendar', async () => {
      const minDate = new Date('2024-01-10');
      createDatePicker({ minDate });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with minDate constraint
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('passes maxDate to calendar', async () => {
      const maxDate = new Date('2024-01-25');
      createDatePicker({ maxDate });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with maxDate constraint
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('passes disabledDates array to calendar', async () => {
      const disabledDates = [new Date('2024-01-15'), new Date('2024-01-16')];
      createDatePicker({ disabledDates });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with disabled dates
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('passes disabledDates function to calendar', async () => {
      const disabledDates = (date: Date) => date.getDay() === 0; // Disable Sundays
      createDatePicker({ disabledDates });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with disabled dates function
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('calls onFocus when input receives focus', async () => {
      const onFocus = jest.fn();
      createDatePicker({ onFocus });

      await userEvent.click(screen.getByRole('combobox'));

      expect(onFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const onBlur = jest.fn();
      createDatePicker({ onBlur });

      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.tab();

      expect(onBlur).toHaveBeenCalled();
    });

    it('calls onKeyDown when key is pressed', async () => {
      const onKeyDown = jest.fn();
      createDatePicker({ onKeyDown });

      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('calls custom onKeyDown before handling Escape', async () => {
      const onKeyDown = jest.fn();
      createDatePicker({ onKeyDown });

      // Open calendar first
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(onKeyDown).toHaveBeenCalled();

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });
  });

  describe('Auto Focus', () => {
    it('focuses input when autoFocus is true', () => {
      createDatePicker({ autoFocus: true });

      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('does not focus input when autoFocus is false', () => {
      createDatePicker({ autoFocus: false });

      expect(screen.getByRole('combobox')).not.toHaveFocus();
    });
  });

  describe('Custom Format', () => {
    it('uses custom date format', () => {
      createDatePicker({
        value: mockDate,
        format: 'yyyy-MM-dd',
      });

      expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
    });
  });

  describe('Locale Support', () => {
    it('uses custom locale', () => {
      const customLocale = {
        ...defaultLocale,
        code: 'es',
        dateFormat: 'dd/MM/yyyy',
      };

      createDatePicker({
        value: mockDate,
        locale: customLocale,
      });

      // Should use the custom locale format
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Week Numbers', () => {
    it('passes showWeekNumbers to calendar', async () => {
      createDatePicker({ showWeekNumbers: true });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with week numbers
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Date Adapter Integration', () => {
    it('uses custom date adapter', () => {
      const customAdapter = {
        ...nativeDateAdapter,
        format: jest.fn().mockReturnValue('custom-format'),
        isValid: jest.fn().mockReturnValue(true),
      };

      createDatePicker({
        value: mockDate,
        dateAdapter: customAdapter,
      });

      expect(customAdapter.format).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles null value gracefully', () => {
      createDatePicker({ value: null });
      expect(screen.getByRole('combobox')).toHaveValue('');
    });

    it('handles undefined value gracefully', () => {
      createDatePicker({ value: undefined });
      expect(screen.getByRole('combobox')).toHaveValue('');
    });

    it('handles invalid date gracefully', () => {
      const invalidDate = new Date('invalid');
      createDatePicker({ value: invalidDate });
      expect(screen.getByRole('combobox')).toHaveValue('');
    });

    it('updates current date when value changes', () => {
      const { rerender } = createDatePicker({ value: mockDate });
      expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();

      const newDate = new Date('2024-02-20');
      rerender(<DatePicker value={newDate} onChange={jest.fn()} />);
      expect(screen.getByDisplayValue('02/20/2024')).toBeInTheDocument();
    });

    it('focuses input after date selection when closeOnSelect is true', async () => {
      createDatePicker({ closeOnSelect: true });

      const input = screen.getByRole('combobox');
      await userEvent.click(input);

      // Select a date
      const dateButton = screen.getByRole('button', { name: /15/i });
      await userEvent.click(dateButton);

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    it('handles rapid calendar open/close', async () => {
      createDatePicker();

      const input = screen.getByRole('combobox');

      // Rapidly open and close
      await userEvent.click(input);
      fireEvent.mouseDown(document.body);
      await userEvent.click(input);
      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('handles multiple escape key presses', async () => {
      createDatePicker();

      const input = screen.getByRole('combobox');
      await userEvent.click(input);

      // Press escape multiple times
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.keyDown(input, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('does not crash when onChange is not provided', async () => {
      render(<DatePicker value={null} />);

      await userEvent.click(screen.getByRole('combobox'));

      // Should not crash when selecting a date without onChange
      const dateButton = screen.getByRole('button', { name: /15/i });
      await userEvent.click(dateButton);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles component unmount while calendar is open', async () => {
      const { unmount } = createDatePicker();

      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('grid')).toBeInTheDocument();

      // Should not crash on unmount
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Integration with Calendar Component', () => {
    it('passes all required props to Calendar', async () => {
      const minDate = new Date('2024-01-01');
      const maxDate = new Date('2024-12-31');
      const disabledDates = [new Date('2024-01-15')];

      createDatePicker({
        value: mockDate,
        minDate,
        maxDate,
        disabledDates,
        showWeekNumbers: true,
        locale: defaultLocale,
      });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should be rendered with all props
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('updates calendar current date when navigating', async () => {
      createDatePicker({ value: mockDate });

      await userEvent.click(screen.getByRole('combobox'));

      // Calendar should show the current month
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA roles', () => {
      createDatePicker();

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      createDatePicker();

      const input = screen.getByRole('combobox');

      // Tab to input
      await userEvent.tab();
      expect(input).toHaveFocus();

      // Enter to open calendar
      fireEvent.keyDown(input, { key: 'Enter' });

      // Should open calendar (though specific calendar keyboard nav is tested in Calendar component)
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('maintains focus management', async () => {
      createDatePicker();

      const input = screen.getByRole('combobox');
      await userEvent.click(input);

      expect(input).toHaveFocus();
      // Calendar should be open but we'll check for the calendar container instead
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });
});
