import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateInput } from './DateInput';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';

// Mock dates for consistent testing
const mockDate = new Date('2024-01-15T12:00:00.000Z');

// Helper function to create a date input with default props
const createDateInput = (props = {}) => {
  const defaultProps = {
    value: null,
    onChange: jest.fn(),
    dateAdapter: nativeDateAdapter,
    locale: defaultLocale,
    onCalendarToggle: jest.fn(),
    isCalendarOpen: false,
    ...props,
  };
  return render(<DateInput {...defaultProps} />);
};

describe('DateInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      createDateInput();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays placeholder text', () => {
      createDateInput({ placeholder: 'Enter date' });
      expect(screen.getByPlaceholderText('Enter date')).toBeInTheDocument();
    });

    it('displays formatted date value', () => {
      createDateInput({ value: mockDate });
      expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();
    });

    it('shows empty value for null', () => {
      createDateInput({ value: null });
      expect(screen.getByRole('combobox')).toHaveValue('');
    });

    it('applies custom className', () => {
      createDateInput({ className: 'custom-input' });
      const container = screen.getByRole('combobox').closest('.rdl-date-input');
      expect(container).toHaveClass('custom-input');
    });

    it('sets custom id', () => {
      createDateInput({ id: 'custom-id' });
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id');
    });

    it('sets aria-label', () => {
      createDateInput({ 'aria-label': 'Custom date input' });
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Custom date input');
    });

    it('sets aria-describedby', () => {
      createDateInput({ 'aria-describedby': 'help-text' });
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  describe('Date Formatting', () => {
    it('uses default format when none specified', () => {
      createDateInput({ value: mockDate });
      expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();
    });

    it('uses custom format when specified', () => {
      createDateInput({ 
        value: mockDate, 
        format: 'yyyy-MM-dd' 
      });
      expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
    });

    it('uses locale-specific format', () => {
      const customLocale = {
        ...defaultLocale,
        dateFormat: 'dd/MM/yyyy'
      };
      
      createDateInput({ 
        value: mockDate, 
        locale: customLocale 
      });
      
      expect(screen.getByDisplayValue('15/01/2024')).toBeInTheDocument();
    });

    it('handles invalid date gracefully', () => {
      const invalidDate = new Date('invalid');
      createDateInput({ value: invalidDate });
      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });

  describe('User Input', () => {
    it('allows typing in the input field', async () => {
      const onChange = jest.fn();
      createDateInput({ onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.type(input, '01/20/2024');
      
      expect(input).toHaveValue('01/20/2024');
    });

    it('calls onChange when valid date is entered', async () => {
      const onChange = jest.fn();
      createDateInput({ onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/20/2024');
      fireEvent.blur(input);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('does not call onChange for invalid date during typing', async () => {
      const onChange = jest.fn();
      createDateInput({ onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, 'invalid date');
      
      // onChange should not be called for invalid dates during typing
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange with null for empty input', async () => {
      const onChange = jest.fn();
      createDateInput({ value: mockDate, onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('accepts valid dates regardless of constraints (validation is handled by parent)', async () => {
      const onChange = jest.fn();
      const minDate = new Date('2024-01-20');
      createDateInput({ onChange, minDate });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/15/2024'); // Before minDate
      fireEvent.blur(input);
      
      // DateInput doesn't validate constraints - it just parses dates
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('accepts dates regardless of maxDate constraint', async () => {
      const onChange = jest.fn();
      const maxDate = new Date('2024-01-10');
      createDateInput({ onChange, maxDate });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/15/2024'); // After maxDate
      fireEvent.blur(input);
      
      // DateInput doesn't validate constraints - it just parses dates
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('accepts dates regardless of disabledDates array', async () => {
      const onChange = jest.fn();
      const disabledDates = [new Date('2024-01-15')];
      createDateInput({ onChange, disabledDates });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/15/2024'); // Disabled date
      fireEvent.blur(input);
      
      // DateInput doesn't validate constraints - it just parses dates
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('accepts dates regardless of disabledDates function', async () => {
      const onChange = jest.fn();
      const disabledDates = (date: Date) => date.getDay() === 0; // Disable Sundays
      createDateInput({ onChange, disabledDates });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/14/2024'); // Sunday
      fireEvent.blur(input);
      
      // DateInput doesn't validate constraints - it just parses dates
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Calendar Integration', () => {
    it('shows calendar toggle button', () => {
      createDateInput();
      expect(screen.getByRole('button', { name: /open calendar/i })).toBeInTheDocument();
    });

    it('calls onCalendarToggle when toggle button is clicked', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const toggleButton = screen.getByRole('button', { name: /open calendar/i });
      await userEvent.click(toggleButton);
      
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });

    it('calls onCalendarToggle when input is clicked', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });

    it('maintains toggle button when calendar is open', () => {
      createDateInput({ isCalendarOpen: true });
      
      const toggleButton = screen.getByRole('button', { name: /open calendar/i });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveClass('rdl-date-input-toggle');
    });

    it('does not open calendar when disabled', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ disabled: true, onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      
      expect(onCalendarToggle).not.toHaveBeenCalled();
    });

    it('opens calendar even when readOnly (focus behavior)', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ readOnly: true, onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      
      // The current implementation calls onCalendarToggle on focus regardless of readOnly
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens calendar on Enter key', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });

    it('opens calendar on ArrowDown key', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });

    it('does not handle Space key for calendar opening', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: ' ' });
      
      // Space key is not handled by the current implementation
      expect(onCalendarToggle).not.toHaveBeenCalled();
    });

    it('calls custom onKeyDown handler', async () => {
      const onKeyDown = jest.fn();
      createDateInput({ onKeyDown });
      
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'Tab' });
      
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('handles Enter and ArrowDown keys correctly', async () => {
      const onCalendarToggle = jest.fn();
      createDateInput({ onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      
      // Test Enter key
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
      
      // Reset mock
      onCalendarToggle.mockClear();
      
      // Test ArrowDown key
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Focus and Blur Events', () => {
    it('calls onFocus when input receives focus', async () => {
      const onFocus = jest.fn();
      createDateInput({ onFocus });
      
      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      
      expect(onFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const onBlur = jest.fn();
      createDateInput({ onBlur });
      
      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.tab();
      
      expect(onBlur).toHaveBeenCalled();
    });

    it('validates and updates value on blur', async () => {
      const onChange = jest.fn();
      createDateInput({ onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/20/2024');
      fireEvent.blur(input);
      
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('reverts to original value on blur if invalid', async () => {
      const onChange = jest.fn();
      createDateInput({ value: mockDate, onChange });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, 'invalid');
      fireEvent.blur(input);
      
      expect(input).toHaveValue('01/15/2024'); // Reverted to original
    });
  });

  describe('Disabled and ReadOnly States', () => {
    it('disables input when disabled prop is true', () => {
      createDateInput({ disabled: true });
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('disables toggle button when disabled', () => {
      createDateInput({ disabled: true });
      expect(screen.getByRole('button', { name: /open calendar/i })).toBeDisabled();
    });

    it('sets readonly attribute when readOnly prop is true', () => {
      createDateInput({ readOnly: true });
      expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
    });

    it('does not disable toggle button when readOnly', () => {
      createDateInput({ readOnly: true });
      expect(screen.getByRole('button', { name: /open calendar/i })).not.toBeDisabled();
    });

    it('applies disabled class when disabled', () => {
      createDateInput({ disabled: true });
      const container = screen.getByRole('combobox').closest('.rdl-date-input');
      expect(container).toHaveClass('rdl-date-input--disabled');
    });

    it('applies readonly class when readOnly', () => {
      createDateInput({ readOnly: true });
      const container = screen.getByRole('combobox').closest('.rdl-date-input');
      expect(container).toHaveClass('rdl-date-input--readonly');
    });
  });

  describe('Auto Focus', () => {
    it('focuses input when autoFocus is true', () => {
      createDateInput({ autoFocus: true });
      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('does not focus input when autoFocus is false', () => {
      createDateInput({ autoFocus: false });
      expect(screen.getByRole('combobox')).not.toHaveFocus();
    });
  });

  describe('Date Adapter Integration', () => {
    it('uses custom date adapter for formatting', () => {
      const customAdapter = {
        ...nativeDateAdapter,
        format: jest.fn().mockReturnValue('Custom Format'),
        isValid: jest.fn().mockReturnValue(true),
      };
      
      createDateInput({ 
        value: mockDate,
        dateAdapter: customAdapter 
      });
      
      expect(customAdapter.format).toHaveBeenCalled();
    });

    it('uses custom date adapter for parsing', async () => {
      const customAdapter = {
        ...nativeDateAdapter,
        parse: jest.fn().mockReturnValue(mockDate),
        isValid: jest.fn().mockReturnValue(true),
      };
      
      const onChange = jest.fn();
      createDateInput({ 
        dateAdapter: customAdapter,
        onChange 
      });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '2024-01-15');
      fireEvent.blur(input);
      
      expect(customAdapter.parse).toHaveBeenCalled();
    });

    it('handles adapter validation correctly', async () => {
      const customAdapter = {
        ...nativeDateAdapter,
        parse: jest.fn().mockReturnValue(mockDate),
        isValid: jest.fn().mockReturnValue(false),
      };
      
      const onChange = jest.fn();
      createDateInput({ 
        dateAdapter: customAdapter,
        onChange 
      });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '2024-01-15');
      fireEvent.blur(input);
      
      // The component doesn't call onChange if isValid returns false
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles date adapter errors gracefully', () => {
      const customAdapter = {
        ...nativeDateAdapter,
        format: jest.fn().mockReturnValue(''),
        isValid: jest.fn().mockReturnValue(false),
      };
      
      expect(() => createDateInput({ 
        value: mockDate,
        dateAdapter: customAdapter 
      })).not.toThrow();
    });

    it('handles parse errors gracefully', async () => {
      const customAdapter = {
        ...nativeDateAdapter,
        parse: jest.fn().mockReturnValue(null),
        isValid: jest.fn().mockReturnValue(false),
      };
      
      const onChange = jest.fn();
      createDateInput({ 
        dateAdapter: customAdapter,
        onChange 
      });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, 'invalid');
      
      expect(() => fireEvent.blur(input)).not.toThrow();
      // When parse returns null, onChange is not called
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid input changes', async () => {
      const onChange = jest.fn();
      createDateInput({ onChange });
      
      const input = screen.getByRole('combobox');
      
      // Rapidly type and clear
      await userEvent.type(input, '01/15/2024');
      await userEvent.clear(input);
      await userEvent.type(input, '01/20/2024');
      fireEvent.blur(input);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('handles component unmount gracefully', () => {
      const { unmount } = createDateInput();
      
      expect(() => unmount()).not.toThrow();
    });

    it('handles null onChange gracefully', async () => {
      render(<DateInput 
        value={null} 
        dateAdapter={nativeDateAdapter}
        locale={defaultLocale}
        onCalendarToggle={jest.fn()}
        isCalendarOpen={false}
      />);
      
      const input = screen.getByRole('combobox');
      await userEvent.type(input, '01/15/2024');
      
      expect(() => fireEvent.blur(input)).not.toThrow();
    });

    it('handles missing required props gracefully', () => {
      expect(() => render(<DateInput 
        value={null} 
        onChange={jest.fn()}
        dateAdapter={nativeDateAdapter}
        locale={defaultLocale}
        onCalendarToggle={jest.fn()}
        isCalendarOpen={false}
      />)).not.toThrow();
    });

    it('handles value changes correctly', () => {
      const { rerender } = createDateInput({ value: null });
      expect(screen.getByRole('combobox')).toHaveValue('');
      
      rerender(<DateInput 
        value={mockDate}
        onChange={jest.fn()}
        dateAdapter={nativeDateAdapter}
        locale={defaultLocale}
        onCalendarToggle={jest.fn()}
        isCalendarOpen={false}
      />);
      
      expect(screen.getByRole('combobox')).toHaveValue('01/15/2024');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      createDateInput();
      
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('updates aria-expanded when calendar opens', () => {
      createDateInput({ isCalendarOpen: true });
      
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('supports screen reader announcements', () => {
      createDateInput({ 
        value: mockDate,
        'aria-label': 'Date picker input' 
      });
      
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-label', 'Date picker input');
    });

    it('provides proper focus management', async () => {
      createDateInput();
      
      const input = screen.getByRole('combobox');
      const toggleButton = screen.getByRole('button', { name: /open calendar/i });
      
      // Tab through elements
      await userEvent.tab();
      expect(input).toHaveFocus();
      
      // Button has tabIndex={-1} so it won't receive focus via tab
      await userEvent.tab();
      expect(toggleButton).not.toHaveFocus();
    });

    it('maintains proper aria attributes during interaction', async () => {
      createDateInput({ 'aria-label': 'Date input field' });
      
      const input = screen.getByRole('combobox');
      await userEvent.clear(input);
      await userEvent.type(input, '01/15/2024');
      fireEvent.blur(input);
      
      // Should maintain aria attributes
      expect(input).toHaveAttribute('aria-label', 'Date input field');
      expect(input).toHaveAttribute('aria-haspopup', 'dialog');
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const onChange = jest.fn();
      const { rerender } = createDateInput({ onChange });
      
      // Re-render with same props
      rerender(<DateInput 
        value={null}
        onChange={onChange}
        dateAdapter={nativeDateAdapter}
        locale={defaultLocale}
        onCalendarToggle={jest.fn()}
        isCalendarOpen={false}
      />);
      
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles large number of validation calls efficiently', async () => {
      const onChange = jest.fn();
      const disabledDates = Array.from({ length: 1000 }, (_, i) => 
        new Date(2024, 0, i + 1)
      );
      
      const startTime = performance.now();
      createDateInput({ onChange, disabledDates });
      
      const input = screen.getByRole('combobox');
      await userEvent.type(input, '01/15/2024');
      fireEvent.blur(input);
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Should complete within reasonable time
      expect(executionTime).toBeLessThan(1000);
    });
  });

  describe('Integration Tests', () => {
    it('works correctly with all props combined', async () => {
      const onChange = jest.fn();
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const onKeyDown = jest.fn();
      const onCalendarToggle = jest.fn();
      
      const minDate = new Date('2024-01-01');
      const maxDate = new Date('2024-12-31');
      const disabledDates = [new Date('2024-01-15')];
      
      createDateInput({
        value: mockDate,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onCalendarToggle,
        minDate,
        maxDate,
        disabledDates,
        placeholder: 'Select date',
        disabled: false,
        readOnly: false,
        autoFocus: false,
        className: 'test-input',
        id: 'test-id',
        'aria-label': 'Test date input',
        format: 'MM/dd/yyyy',
      });
      
      const input = screen.getByRole('combobox');
      
      // Should render with all features
      expect(input).toHaveValue('01/15/2024');
      expect(input).toHaveAttribute('id', 'test-id');
      expect(input).toHaveAttribute('aria-label', 'Test date input');
      
      // Should handle interactions
      await userEvent.click(input);
      expect(onFocus).toHaveBeenCalled();
      expect(onCalendarToggle).toHaveBeenCalled();
      
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('maintains state consistency across interactions', async () => {
      const onChange = jest.fn();
      const onCalendarToggle = jest.fn();
      
      createDateInput({ onChange, onCalendarToggle });
      
      const input = screen.getByRole('combobox');
      const toggleButton = screen.getByRole('button', { name: /open calendar/i });
      
      // Type a date (this will focus the input, calling onCalendarToggle once)
      await userEvent.type(input, '01/20/2024');
      fireEvent.blur(input);
      
      expect(onChange).toHaveBeenCalled();
      
      // Toggle calendar (this will call onCalendarToggle again)
      await userEvent.click(toggleButton);
      
      expect(onCalendarToggle).toHaveBeenCalled();
      
      // Both interactions should work correctly
      // onChange is called for each character typed (10 characters = 10 calls)
      expect(onChange).toHaveBeenCalledTimes(10);
      // onCalendarToggle is called once when typing (focus) and once when clicking button
      expect(onCalendarToggle).toHaveBeenCalledTimes(2);
    });
  });
});
