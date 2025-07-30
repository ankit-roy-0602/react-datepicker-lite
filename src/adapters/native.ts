import type { DateAdapter } from '@/types';

export class NativeDateAdapter implements DateAdapter<Date> {
  format(date: Date, format: string): string {
    if (!this.isValid(date)) {
      return '';
    }

    // Simple format mapping for common patterns
    const formatMap: Record<string, (date: Date) => string> = {
      YYYY: (d) => d.getFullYear().toString(),
      YY: (d) => d.getFullYear().toString().slice(-2),
      MM: (d) => (d.getMonth() + 1).toString().padStart(2, '0'),
      M: (d) => (d.getMonth() + 1).toString(),
      DD: (d) => d.getDate().toString().padStart(2, '0'),
      D: (d) => d.getDate().toString(),
      HH: (d) => d.getHours().toString().padStart(2, '0'),
      H: (d) => d.getHours().toString(),
      mm: (d) => d.getMinutes().toString().padStart(2, '0'),
      m: (d) => d.getMinutes().toString(),
      ss: (d) => d.getSeconds().toString().padStart(2, '0'),
      s: (d) => d.getSeconds().toString(),
    };

    let result = format;
    Object.entries(formatMap).forEach(([pattern, formatter]) => {
      result = result.replace(new RegExp(pattern, 'g'), formatter(date));
    });

    return result;
  }

  parse(dateString: string, _format: string): Date | null {
    if (!dateString) {
      return null;
    }

    // For now, use native Date parsing
    // In a production version, we'd implement proper format-aware parsing
    const parsed = new Date(dateString);
    return this.isValid(parsed) ? parsed : null;
  }

  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  startOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  startOfYear(date: Date): Date {
    const result = new Date(date);
    result.setMonth(0, 1);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  endOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  endOfYear(date: Date): Date {
    const result = new Date(date);
    result.setMonth(11, 31);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  isAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }

  isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  getDay(date: Date): number {
    return date.getDay();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  today(): Date {
    return new Date();
  }
}

export const nativeDateAdapter = new NativeDateAdapter();
