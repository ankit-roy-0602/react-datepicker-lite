import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { DatePickerProps } from '@/types';
import { DateInput } from '../DateInput/DateInput';
import { Calendar } from '../Calendar/Calendar';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';
import './DatePicker.css';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  dateAdapter = nativeDateAdapter,
  format,
  placeholder,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  className = '',
  locale = defaultLocale,
  minDate,
  maxDate,
  disabledDates,
  showWeekNumbers = false,
  showToday = true,
  closeOnSelect = true,
  onFocus,
  onBlur,
  onKeyDown,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    if (value && dateAdapter.isValid(value)) {
      return value;
    }
    if (defaultValue && dateAdapter.isValid(defaultValue)) {
      return defaultValue;
    }
    return dateAdapter.today();
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle controlled/uncontrolled state
  const [internalValue, setInternalValue] = useState(
    () => defaultValue || null
  );
  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const handleDateChange = useCallback(
    (newDate: Date | null) => {
      if (value === undefined) {
        setInternalValue(newDate);
      }
      onChange?.(newDate);
    },
    [value, onChange]
  );

  const handleCalendarToggle = useCallback(
    (open: boolean) => {
      if (disabled || readOnly) return;
      setIsOpen(open);
    },
    [disabled, readOnly]
  );

  const handleDateSelect = useCallback(
    (selectedDate: Date) => {
      handleDateChange(selectedDate);
      setCurrentDate(selectedDate);

      if (closeOnSelect) {
        setIsOpen(false);
        // Focus the input after state update
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    },
    [handleDateChange, closeOnSelect]
  );

  const handleCurrentDateChange = useCallback((newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return undefined;
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        event.preventDefault();
      }
    },
    [onKeyDown, isOpen]
  );

  // Update current date when value changes
  useEffect(() => {
    if (currentValue && dateAdapter.isValid(currentValue)) {
      setCurrentDate(currentValue);
    }
  }, [currentValue, dateAdapter]);

  const pickerClassName = [
    'rdl-date-picker',
    isOpen && 'rdl-date-picker--open',
    disabled && 'rdl-date-picker--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Create props objects with proper type handling
  const dateInputProps: Record<string, unknown> = {
    ref: inputRef,
    onChange: handleDateChange,
    dateAdapter,
    disabled,
    readOnly,
    autoFocus,
    locale,
    onCalendarToggle: handleCalendarToggle,
    isCalendarOpen: isOpen,
    onKeyDown: handleKeyDown,
    ...(placeholder && { placeholder }),
    ...(format && { format }),
    ...(minDate !== undefined && { minDate }),
    ...(maxDate !== undefined && { maxDate }),
    ...(disabledDates && { disabledDates }),
    ...(onFocus && { onFocus }),
    ...(onBlur && { onBlur }),
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    ...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy }),
    ...(id && { id }),
  };

  // Add value or defaultValue based on controlled/uncontrolled state
  if (isControlled) {
    dateInputProps.value = value;
  } else {
    // For uncontrolled mode, pass the current internal value as value
    dateInputProps.value = internalValue;
  }

  const calendarProps = {
    currentDate,
    onCurrentDateChange: handleCurrentDateChange,
    selectedDate: currentValue,
    onDateSelect: handleDateSelect,
    dateAdapter,
    locale,
    showWeekNumbers,
    ...(minDate !== undefined && { minDate }),
    ...(maxDate !== undefined && { maxDate }),
    ...(disabledDates && { disabledDates }),
  };

  return (
    <div ref={containerRef} className={pickerClassName}>
      <DateInput {...dateInputProps} />

      {isOpen && (
        <div className='rdl-date-picker-dropdown'>
          <Calendar {...calendarProps} />

          {showToday && (
            <div className='rdl-date-picker-footer'>
              <button
                type='button'
                className='rdl-date-picker-today-button'
                onClick={() => handleDateSelect(dateAdapter.today())}
              >
                Today
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
