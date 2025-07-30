import React, { forwardRef, useCallback, useState } from 'react';
import type { DatePickerProps } from '@/types';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';
import './DateInput.css';

export interface DateInputProps<T = Date>
  extends Omit<DatePickerProps<T>, 'showWeekNumbers' | 'showToday' | 'closeOnSelect'> {
  onCalendarToggle?: (isOpen: boolean) => void;
  isCalendarOpen?: boolean;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      dateAdapter = nativeDateAdapter,
      format,
      placeholder = 'Select date',
      disabled = false,
      readOnly = false,
      autoFocus = false,
      className = '',
      locale = defaultLocale,
      minDate,
      maxDate,
      disabledDates,
      onFocus,
      onBlur,
      onKeyDown,
      onCalendarToggle,
      isCalendarOpen = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      id,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(() => {
      if (value && dateAdapter.isValid(value)) {
        return dateAdapter.format(value, format || locale.dateFormat);
      }
      return '';
    });

    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);

        if (newValue === '') {
          onChange?.(null);
          return;
        }

        const parsedDate = dateAdapter.parse(newValue, format || locale.dateFormat);
        if (parsedDate && dateAdapter.isValid(parsedDate)) {
          onChange?.(parsedDate);
        }
      },
      [dateAdapter, format, locale.dateFormat, onChange]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(event);
        onCalendarToggle?.(true);
      },
      [onFocus, onCalendarToggle]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(event);
        
        // Validate and format the input value on blur
        if (inputValue && value && dateAdapter.isValid(value)) {
          const formattedValue = dateAdapter.format(value, format || locale.dateFormat);
          setInputValue(formattedValue);
        }
      },
      [onBlur, inputValue, value, dateAdapter, format, locale.dateFormat]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);

        if (event.key === 'Escape') {
          onCalendarToggle?.(false);
        } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
          event.preventDefault();
          onCalendarToggle?.(true);
        }
      },
      [onKeyDown, onCalendarToggle]
    );

    // Update input value when external value changes
    React.useEffect(() => {
      if (value && dateAdapter.isValid(value)) {
        const formattedValue = dateAdapter.format(value, format || locale.dateFormat);
        setInputValue(formattedValue);
      } else if (value === null) {
        setInputValue('');
      }
    }, [value, dateAdapter, format, locale.dateFormat]);

    const inputClassName = [
      'rdl-date-input',
      isFocused && 'rdl-date-input--focused',
      disabled && 'rdl-date-input--disabled',
      readOnly && 'rdl-date-input--readonly',
      isCalendarOpen && 'rdl-date-input--calendar-open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="rdl-date-input-wrapper">
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={inputClassName}
          aria-label={ariaLabel || 'Date input'}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isCalendarOpen}
          aria-haspopup="dialog"
          role="combobox"
          id={id}
          {...rest}
        />
        <button
          type="button"
          className="rdl-date-input-toggle"
          onClick={() => onCalendarToggle?.(!isCalendarOpen)}
          disabled={disabled}
          aria-label="Open calendar"
          tabIndex={-1}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z" />
          </svg>
        </button>
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';
