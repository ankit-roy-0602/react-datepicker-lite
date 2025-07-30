export interface DateAdapter<T = Date> {
  format(date: T, format: string): string;
  parse(dateString: string, format: string): T | null;
  isValid(date: T): boolean;
  addDays(date: T, days: number): T;
  addMonths(date: T, months: number): T;
  addYears(date: T, years: number): T;
  startOfDay(date: T): T;
  startOfMonth(date: T): T;
  startOfYear(date: T): T;
  endOfDay(date: T): T;
  endOfMonth(date: T): T;
  endOfYear(date: T): T;
  isSameDay(date1: T, date2: T): boolean;
  isSameMonth(date1: T, date2: T): boolean;
  isSameYear(date1: T, date2: T): boolean;
  isAfter(date1: T, date2: T): boolean;
  isBefore(date1: T, date2: T): boolean;
  getDay(date: T): number;
  getMonth(date: T): number;
  getYear(date: T): number;
  getDaysInMonth(date: T): number;
  today(): T;
}

export interface Locale {
  code: string;
  name: string;
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  firstDayOfWeek: number;
  rtl?: boolean;
  dateFormat: string;
  timeFormat: string;
  dateTimeFormat: string;
}

export interface DateRange<T = Date> {
  start: T | null;
  end: T | null;
}

export interface CalendarDay<T = Date> {
  date: T;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  isOutsideMonth: boolean;
  isWeekend: boolean;
}

export interface DatePickerProps<T = Date> {
  // Core props
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (date: T | null) => void;

  // Date adapter
  dateAdapter?: DateAdapter<T>;

  // Formatting
  format?: string;
  placeholder?: string;

  // Constraints
  minDate?: T | null;
  maxDate?: T | null;
  disabledDates?: T[] | ((date: T) => boolean);

  // Locale
  locale?: Locale;

  // UI customization
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;

  // Calendar behavior
  showWeekNumbers?: boolean;
  showToday?: boolean;
  closeOnSelect?: boolean;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;

  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface RangePickerProps<T = Date>
  extends Omit<DatePickerProps<T>, 'value' | 'defaultValue' | 'onChange'> {
  value?: DateRange<T>;
  defaultValue?: DateRange<T>;
  onChange?: (range: DateRange<T>) => void;
  allowSingleDateInRange?: boolean;
}

export interface CalendarProps<T = Date> {
  // Current view
  currentDate: T;
  onCurrentDateChange: (date: T) => void;

  // Selection
  selectedDate?: T | null;
  selectedRange?: DateRange<T>;
  onDateSelect: (date: T) => void;

  // Date adapter
  dateAdapter: DateAdapter<T>;

  // Constraints
  minDate?: T | null;
  maxDate?: T | null;
  disabledDates?: T[] | ((date: T) => boolean);

  // Locale
  locale: Locale;

  // UI
  showWeekNumbers?: boolean;
  className?: string;

  // Range selection
  isRangeSelection?: boolean;
  rangeHoverDate?: T | null;
  onRangeHover?: (date: T | null) => void;
}

export interface TimePickerProps<T = Date> {
  value?: T | null;
  onChange?: (time: T | null) => void;
  dateAdapter: DateAdapter<T>;
  format?: string;
  use12Hours?: boolean;
  minuteStep?: number;
  hourStep?: number;
  disabled?: boolean;
  className?: string;
}

export type ViewType = 'day' | 'month' | 'year';

export interface BrowserFeatures {
  hasTouch: boolean;
  hasIntersectionObserver: boolean;
  hasResizeObserver: boolean;
  supportsPassiveEvents: boolean;
  supportsCSSCustomProperties: boolean;
}

export interface ThemeVariables {
  // Colors
  primary: string;
  primaryHover: string;
  background: string;
  backgroundHover: string;
  border: string;
  borderHover: string;
  text: string;
  textMuted: string;
  textDisabled: string;

  // Spacing
  spacing: string;
  borderRadius: string;

  // Typography
  fontFamily: string;
  fontSize: string;
  fontWeight: string;

  // Shadows
  shadow: string;
  shadowHover: string;

  // Z-index
  zIndex: number;
}
