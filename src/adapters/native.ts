import type { DateAdapter } from '@/types';

export class NativeDateAdapter implements DateAdapter<Date> {
  format(date: Date, format: string): string {
    if (!this.isValid(date)) {
      return '';
    }

    try {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const monthNamesShort = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      
      const dayNames = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ];
      
      const dayNamesShort = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ];

      let result = format;
      
      // Simple approach: replace longest patterns first to avoid conflicts
      const formatMap: Record<string, string> = {
        'EEEE': dayNames[date.getDay()] || '',
        'EEE': dayNamesShort[date.getDay()] || '',
        'MMMM': monthNames[date.getMonth()] || '',
        'MMM': monthNamesShort[date.getMonth()] || '',
        'yyyy': date.getFullYear().toString(),
        'YYYY': date.getFullYear().toString(),
        'MM': (date.getMonth() + 1).toString().padStart(2, '0'),
        'dd': date.getDate().toString().padStart(2, '0'),
        'DD': date.getDate().toString().padStart(2, '0'),
        'HH': date.getHours().toString().padStart(2, '0'),
        'mm': date.getMinutes().toString().padStart(2, '0'),
        'ss': date.getSeconds().toString().padStart(2, '0'),
        'YY': date.getFullYear().toString().slice(-2),
        'M': (date.getMonth() + 1).toString(),
        'D': date.getDate().toString(),
        'H': date.getHours().toString(),
        'm': date.getMinutes().toString(),
        's': date.getSeconds().toString(),
      };

      // Replace patterns in specific order to avoid conflicts
      // Use word boundaries and specific ordering
      const patterns = [
        'EEEE', 'EEE', 'MMMM', 'MMM', 'yyyy', 'YYYY', 'MM', 'dd', 'DD', 'HH', 'mm', 'ss', 'YY', 'M', 'D', 'H', 'm', 's'
      ];
      
      for (const pattern of patterns) {
        const value = formatMap[pattern];
        if (value !== undefined) {
          // Use word boundaries for single character patterns to avoid partial replacements
          if (pattern.length === 1) {
            result = result.replace(new RegExp(`\\b${pattern}\\b`, 'g'), value);
          } else {
            result = result.replace(new RegExp(pattern, 'g'), value);
          }
        }
      }

      return result;
    } catch (error) {
      return '';
    }
  }

  parse(dateString: string, format: string): Date | null {
    if (!dateString) {
      return null;
    }

    try {
      // Handle common formats
      if (format === 'MM/dd/yyyy') {
        const match = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (match && match[1] && match[2] && match[3]) {
          const month = parseInt(match[1]);
          const day = parseInt(match[2]);
          const year = parseInt(match[3]);
          
          // Basic range validation
          if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1) {
            return null;
          }
          
          const date = new Date(year, month - 1, day);
          // Validate the date components match what was parsed
          // This catches cases like Feb 31 -> Mar 3
          if (date.getFullYear() === year && 
              date.getMonth() === month - 1 && 
              date.getDate() === day) {
            return date;
          }
          return null;
        }
      } else if (format === 'dd/MM/yyyy') {
        const match = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (match && match[1] && match[2] && match[3]) {
          const day = parseInt(match[1]);
          const month = parseInt(match[2]);
          const year = parseInt(match[3]);
          const date = new Date(year, month - 1, day);
          // Validate the date components match what was parsed
          if (date.getFullYear() === year && 
              date.getMonth() === month - 1 && 
              date.getDate() === day) {
            return date;
          }
        }
      } else if (format === 'yyyy-MM-dd') {
        const match = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (match && match[1] && match[2] && match[3]) {
          const year = parseInt(match[1]);
          const month = parseInt(match[2]);
          const day = parseInt(match[3]);
          const date = new Date(year, month - 1, day);
          // Validate the date components match what was parsed
          if (date.getFullYear() === year && 
              date.getMonth() === month - 1 && 
              date.getDate() === day) {
            return date;
          }
        }
      } else if (format === 'MMM dd, yyyy') {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const match = dateString.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
        if (match && match[1] && match[2] && match[3]) {
          const monthStr = match[1];
          const day = parseInt(match[2]);
          const year = parseInt(match[3]);
          const monthIndex = monthNames.indexOf(monthStr);
          if (monthIndex !== -1) {
            const date = new Date(year, monthIndex, day);
            // Validate the date components match what was parsed
            if (date.getFullYear() === year && 
                date.getMonth() === monthIndex && 
                date.getDate() === day) {
              return date;
            }
          }
        }
      }

      // Fallback to native Date parsing
      const parsed = new Date(dateString);
      return this.isValid(parsed) ? parsed : null;
    } catch (error) {
      return null;
    }
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
    const originalDay = result.getDate();
    result.setMonth(result.getMonth() + months);
    
    // Handle month overflow (e.g., Jan 31 + 1 month should be Feb 28/29, not Mar 3)
    if (result.getDate() !== originalDay) {
      result.setDate(0); // Set to last day of previous month
    }
    
    return result;
  }

  addYears(date: Date, years: number): Date {
    const result = new Date(date);
    const originalMonth = result.getMonth();
    const originalDay = result.getDate();
    
    result.setFullYear(result.getFullYear() + years);
    
    // Handle leap year edge case (Feb 29 -> Feb 28 in non-leap year)
    if (result.getMonth() !== originalMonth) {
      result.setDate(0); // Set to last day of previous month
    }
    
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
    if (!this.isValid(date1) || !this.isValid(date2)) {
      return false;
    }
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    if (!this.isValid(date1) || !this.isValid(date2)) {
      return false;
    }
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }

  isSameYear(date1: Date, date2: Date): boolean {
    if (!this.isValid(date1) || !this.isValid(date2)) {
      return false;
    }
    return date1.getFullYear() === date2.getFullYear();
  }

  isAfter(date1: Date, date2: Date): boolean {
    if (!this.isValid(date1) || !this.isValid(date2)) {
      return false;
    }
    return date1.getTime() > date2.getTime();
  }

  isBefore(date1: Date, date2: Date): boolean {
    if (!this.isValid(date1) || !this.isValid(date2)) {
      return false;
    }
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
