// Import CSS variables
import './styles/variables.css';

// Core components
export { DatePicker } from './components/DatePicker/DatePicker';
export { Calendar } from './components/Calendar/Calendar';
export { DateInput } from './components/DateInput/DateInput';

// Types
export type {
  DateAdapter,
  Locale,
  DateRange,
  CalendarDay,
  DatePickerProps,
  RangePickerProps,
  CalendarProps,
  TimePickerProps,
  ViewType,
  BrowserFeatures,
  ThemeVariables,
} from './types';

// Adapters
export { NativeDateAdapter, nativeDateAdapter } from './adapters/native';

// Utils
export { enUS, defaultLocale, getLocale } from './utils/locale';

// Version
export const version = '1.0.1';
