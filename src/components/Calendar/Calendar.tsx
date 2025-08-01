import React, { useMemo, useCallback } from 'react';
import type { CalendarProps, CalendarDay } from '@/types';
import { nativeDateAdapter } from '@/adapters/native';
import { defaultLocale } from '@/utils/locale';
import './Calendar.css';

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onCurrentDateChange,
  selectedDate,
  selectedRange,
  onDateSelect,
  dateAdapter = nativeDateAdapter,
  minDate,
  maxDate,
  disabledDates,
  locale = defaultLocale,
  showWeekNumbers = false,
  className = '',
  isRangeSelection = false,
  rangeHoverDate,
  onRangeHover,
}) => {
  const calendarDays = useMemo(() => {
    const startOfMonth = dateAdapter.startOfMonth(currentDate);
    const startOfCalendar = dateAdapter.addDays(
      startOfMonth,
      -((dateAdapter.getDay(startOfMonth) - locale.firstDayOfWeek + 7) % 7)
    );
    const endOfCalendar = dateAdapter.addDays(startOfCalendar, 41); // 6 weeks

    const days: CalendarDay[] = [];
    let current = startOfCalendar;

    while (dateAdapter.isBefore(current, endOfCalendar)) {
      const isToday = dateAdapter.isSameDay(current, dateAdapter.today());
      const isSelected = selectedDate
        ? dateAdapter.isSameDay(current, selectedDate)
        : false;
      const isOutsideMonth = !dateAdapter.isSameMonth(current, currentDate);
      const isWeekend =
        dateAdapter.getDay(current) === 0 || dateAdapter.getDay(current) === 6;

      let isDisabled = false;
      if (minDate && dateAdapter.isBefore(current, dateAdapter.startOfDay(minDate))) {
        isDisabled = true;
      }
      if (maxDate && dateAdapter.isAfter(current, dateAdapter.startOfDay(maxDate))) {
        isDisabled = true;
      }
      if (disabledDates && !isDisabled) {
        if (Array.isArray(disabledDates)) {
          isDisabled = disabledDates.some((disabledDate) =>
            dateAdapter.isSameDay(current, disabledDate)
          );
        } else {
          isDisabled = disabledDates(current);
        }
      }

      // Range selection logic
      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      if (isRangeSelection && selectedRange) {
        const { start, end } = selectedRange;
        if (start && end) {
          isInRange =
            (dateAdapter.isAfter(current, start) ||
              dateAdapter.isSameDay(current, start)) &&
            (dateAdapter.isBefore(current, end) ||
              dateAdapter.isSameDay(current, end));
          isRangeStart = dateAdapter.isSameDay(current, start);
          isRangeEnd = dateAdapter.isSameDay(current, end);
        } else if (start && rangeHoverDate) {
          const rangeStart = dateAdapter.isBefore(start, rangeHoverDate)
            ? start
            : rangeHoverDate;
          const rangeEnd = dateAdapter.isAfter(start, rangeHoverDate)
            ? start
            : rangeHoverDate;
          isInRange =
            (dateAdapter.isAfter(current, rangeStart) ||
              dateAdapter.isSameDay(current, rangeStart)) &&
            (dateAdapter.isBefore(current, rangeEnd) ||
              dateAdapter.isSameDay(current, rangeEnd));
        }
      }

      days.push({
        date: current,
        isToday,
        isSelected,
        isInRange,
        isRangeStart,
        isRangeEnd,
        isDisabled,
        isOutsideMonth,
        isWeekend,
      });

      current = dateAdapter.addDays(current, 1);
    }

    return days;
  }, [
    currentDate,
    selectedDate,
    selectedRange,
    dateAdapter,
    locale.firstDayOfWeek,
    minDate,
    maxDate,
    disabledDates,
    isRangeSelection,
    rangeHoverDate,
  ]);

  const handlePreviousMonth = useCallback(() => {
    onCurrentDateChange(dateAdapter.addMonths(currentDate, -1));
  }, [currentDate, dateAdapter, onCurrentDateChange]);

  const handleNextMonth = useCallback(() => {
    onCurrentDateChange(dateAdapter.addMonths(currentDate, 1));
  }, [currentDate, dateAdapter, onCurrentDateChange]);

  const handleDateClick = useCallback(
    (day: CalendarDay) => {
      if (day.isDisabled) return;
      onDateSelect(day.date);
    },
    [onDateSelect]
  );

  const handleDateHover = useCallback(
    (day: CalendarDay) => {
      if (isRangeSelection && onRangeHover && !day.isDisabled) {
        onRangeHover(day.date);
      }
    },
    [isRangeSelection, onRangeHover]
  );

  const handleDateMouseLeave = useCallback(() => {
    if (isRangeSelection && onRangeHover) {
      onRangeHover(null);
    }
  }, [isRangeSelection, onRangeHover]);

  const handleHeaderClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.shiftKey) {
        // Previous year
        onCurrentDateChange(dateAdapter.addYears(currentDate, -1));
      } else {
        // Next year
        onCurrentDateChange(dateAdapter.addYears(currentDate, 1));
      }
    },
    [currentDate, dateAdapter, onCurrentDateChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, day: CalendarDay) => {
      if (day.isDisabled) return;

      const currentIndex = calendarDays.findIndex(d => 
        dateAdapter.isSameDay(d.date, day.date)
      );

      let newIndex = currentIndex;

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          onDateSelect(day.date);
          break;
        case 'ArrowRight':
          event.preventDefault();
          newIndex = Math.min(currentIndex + 1, calendarDays.length - 1);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = Math.min(currentIndex + 7, calendarDays.length - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = Math.max(currentIndex - 7, 0);
          break;
        case 'Home':
          event.preventDefault();
          // Go to first day of week
          newIndex = currentIndex - (currentIndex % 7);
          break;
        case 'End':
          event.preventDefault();
          // Go to last day of week
          newIndex = currentIndex + (6 - (currentIndex % 7));
          break;
        case 'PageUp':
          event.preventDefault();
          onCurrentDateChange(dateAdapter.addMonths(currentDate, -1));
          break;
        case 'PageDown':
          event.preventDefault();
          onCurrentDateChange(dateAdapter.addMonths(currentDate, 1));
          break;
        default:
          return;
      }

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < calendarDays.length) {
        const newDay = calendarDays[newIndex];
        if (newDay && !newDay.isDisabled) {
          // Focus the new button
          const buttons = document.querySelectorAll('.rdl-calendar-day');
          const targetButton = buttons[newIndex] as HTMLButtonElement;
          if (targetButton) {
            targetButton.focus();
          }
        }
      }
    },
    [calendarDays, dateAdapter, onDateSelect, onCurrentDateChange, currentDate]
  );

  const weekdays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (locale.firstDayOfWeek + i) % 7;
      days.push(locale.weekdaysMin[dayIndex]);
    }
    return days;
  }, [locale]);

  const calendarClassName = [
    'rdl-calendar',
    showWeekNumbers && 'rdl-calendar--with-week-numbers',
    isRangeSelection && 'rdl-calendar--range-selection',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={calendarClassName}>
      <div className='rdl-calendar-header'>
        <button
          type='button'
          className='rdl-calendar-nav rdl-calendar-nav--prev'
          onClick={handlePreviousMonth}
          aria-label='Previous month'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z' />
          </svg>
        </button>

        <button
          type='button'
          className='rdl-calendar-title'
          onClick={handleHeaderClick}
          aria-label={`${locale.months[dateAdapter.getMonth(currentDate)]} ${dateAdapter.getYear(currentDate)}, click to navigate years`}
        >
          <span className='rdl-calendar-month'>
            {locale.months[dateAdapter.getMonth(currentDate)]}
          </span>
          <span className='rdl-calendar-year'>
            {dateAdapter.getYear(currentDate)}
          </span>
        </button>

        <button
          type='button'
          className='rdl-calendar-nav rdl-calendar-nav--next'
          onClick={handleNextMonth}
          aria-label='Next month'
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
            <path d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </button>
      </div>

      <div 
        className='rdl-calendar-grid'
        role='grid'
        aria-label={`Calendar for ${locale.months[dateAdapter.getMonth(currentDate)]} ${dateAdapter.getYear(currentDate)}`}
      >
        <div className='rdl-calendar-weekdays' role='row'>
          {showWeekNumbers && (
            <div className='rdl-calendar-weekday rdl-calendar-week-number-header' role='columnheader'>
              Wk
            </div>
          )}
          {weekdays.map((weekday, index) => (
            <div key={index} className='rdl-calendar-weekday' role='columnheader'>
              {weekday}
            </div>
          ))}
        </div>

        <div className='rdl-calendar-days'>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div key={weekIndex} className='rdl-calendar-week' role='row'>
              {showWeekNumbers && (
                <div className='rdl-calendar-week-number' role='rowheader'>
                  {/* Week number calculation would go here */}
                  {weekIndex + 1}
                </div>
              )}
              {calendarDays
                .slice(weekIndex * 7, (weekIndex + 1) * 7)
                .map((day, dayIndex) => {
                  const dayClassName = [
                    'rdl-calendar-day',
                    day.isToday && 'rdl-calendar-day--today',
                    day.isSelected && 'rdl-calendar-day--selected',
                    day.isInRange && 'rdl-calendar-day--in-range',
                    day.isRangeStart && 'rdl-calendar-day--range-start',
                    day.isRangeEnd && 'rdl-calendar-day--range-end',
                    day.isDisabled && 'rdl-calendar-day--disabled',
                    day.isOutsideMonth && 'rdl-calendar-day--outside-month',
                    day.isWeekend && 'rdl-calendar-day--weekend',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div key={dayIndex} role='gridcell'>
                      <button
                        type='button'
                        className={dayClassName}
                        onClick={() => handleDateClick(day)}
                        onMouseEnter={() => handleDateHover(day)}
                        onMouseLeave={handleDateMouseLeave}
                        onKeyDown={(e) => handleKeyDown(e, day)}
                        disabled={day.isDisabled}
                        aria-label={dateAdapter.format(
                          day.date,
                          locale.dateFormat
                        )}
                        aria-pressed={day.isSelected}
                        aria-disabled={day.isDisabled}
                        tabIndex={day.isSelected ? 0 : -1}
                      >
                        {dateAdapter.format(day.date, 'D')}
                      </button>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
