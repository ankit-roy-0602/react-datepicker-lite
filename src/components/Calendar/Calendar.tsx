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
      if (minDate && dateAdapter.isBefore(current, minDate)) {
        isDisabled = true;
      }
      if (maxDate && dateAdapter.isAfter(current, maxDate)) {
        isDisabled = true;
      }
      if (disabledDates) {
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

        <div className='rdl-calendar-title'>
          <span className='rdl-calendar-month'>
            {locale.months[dateAdapter.getMonth(currentDate)]}
          </span>
          <span className='rdl-calendar-year'>
            {dateAdapter.getYear(currentDate)}
          </span>
        </div>

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

      <div className='rdl-calendar-grid'>
        <div className='rdl-calendar-weekdays'>
          {showWeekNumbers && (
            <div className='rdl-calendar-weekday rdl-calendar-week-number-header'>
              Wk
            </div>
          )}
          {weekdays.map((weekday, index) => (
            <div key={index} className='rdl-calendar-weekday'>
              {weekday}
            </div>
          ))}
        </div>

        <div className='rdl-calendar-days'>
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div key={weekIndex} className='rdl-calendar-week'>
              {showWeekNumbers && (
                <div className='rdl-calendar-week-number'>
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
                    <button
                      key={dayIndex}
                      type='button'
                      className={dayClassName}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => handleDateHover(day)}
                      disabled={day.isDisabled}
                      aria-label={dateAdapter.format(
                        day.date,
                        locale.dateFormat
                      )}
                      aria-pressed={day.isSelected}
                    >
                      {dateAdapter.format(day.date, 'D')}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
