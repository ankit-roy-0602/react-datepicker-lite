import type { Locale } from '@/types';

export const enUS: Locale = {
  code: 'en-US',
  name: 'English (US)',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  firstDayOfWeek: 0, // Sunday
  rtl: false,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'MM/DD/YYYY HH:mm',
};

export const defaultLocale = enUS;

export function getLocale(_code?: string): Locale {
  // For now, return default locale
  // In future phases, we'll implement locale loading
  return defaultLocale;
}
