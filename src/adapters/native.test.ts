import { nativeDateAdapter } from './native';

describe('nativeDateAdapter', () => {
  const testDate = new Date('2024-01-15T12:00:00.000Z');
  const invalidDate = new Date('invalid');

  describe('format', () => {
    it('formats date with default format', () => {
      const result = nativeDateAdapter.format(testDate, 'MM/dd/yyyy');
      expect(result).toBe('01/15/2024');
    });

    it('formats date with custom format', () => {
      const result = nativeDateAdapter.format(testDate, 'yyyy-MM-dd');
      expect(result).toBe('2024-01-15');
    });

    it('formats date with different patterns', () => {
      expect(nativeDateAdapter.format(testDate, 'dd/MM/yyyy')).toBe(
        '15/01/2024'
      );
      expect(nativeDateAdapter.format(testDate, 'MMM dd, yyyy')).toBe(
        'Jan 15, 2024'
      );
      expect(nativeDateAdapter.format(testDate, 'MMMM dd, yyyy')).toBe(
        'January 15, 2024'
      );
      expect(nativeDateAdapter.format(testDate, 'EEE, MMM dd')).toBe(
        'Mon, Jan 15'
      );
      expect(nativeDateAdapter.format(testDate, 'EEEE, MMMM dd, yyyy')).toBe(
        'Monday, January 15, 2024'
      );
    });

    it('handles invalid date gracefully', () => {
      const result = nativeDateAdapter.format(invalidDate, 'MM/dd/yyyy');
      expect(result).toBe('');
    });

    it('handles null date gracefully', () => {
      const result = nativeDateAdapter.format(null as any, 'MM/dd/yyyy');
      expect(result).toBe('');
    });

    it('handles undefined date gracefully', () => {
      const result = nativeDateAdapter.format(undefined as any, 'MM/dd/yyyy');
      expect(result).toBe('');
    });
  });

  describe('parse', () => {
    it('parses valid date string', () => {
      const result = nativeDateAdapter.parse('01/15/2024', 'MM/dd/yyyy');
      expect(result).toEqual(new Date(2024, 0, 15)); // Local date
    });

    it('parses different date formats', () => {
      expect(nativeDateAdapter.parse('2024-01-15', 'yyyy-MM-dd')).toEqual(
        new Date(2024, 0, 15)
      );
      expect(nativeDateAdapter.parse('15/01/2024', 'dd/MM/yyyy')).toEqual(
        new Date(2024, 0, 15)
      );
      expect(nativeDateAdapter.parse('Jan 15, 2024', 'MMM dd, yyyy')).toEqual(
        new Date(2024, 0, 15)
      );
    });

    it('returns null for invalid date string', () => {
      const result = nativeDateAdapter.parse('invalid', 'MM/dd/yyyy');
      expect(result).toBeNull();
    });

    it('returns null for empty string', () => {
      const result = nativeDateAdapter.parse('', 'MM/dd/yyyy');
      expect(result).toBeNull();
    });

    it('returns null for null input', () => {
      const result = nativeDateAdapter.parse(null as any, 'MM/dd/yyyy');
      expect(result).toBeNull();
    });

    it('returns null for undefined input', () => {
      const result = nativeDateAdapter.parse(undefined as any, 'MM/dd/yyyy');
      expect(result).toBeNull();
    });

    it('handles malformed date strings', () => {
      expect(nativeDateAdapter.parse('13/32/2024', 'MM/dd/yyyy')).toBeNull();
      expect(nativeDateAdapter.parse('02/31/2024', 'MM/dd/yyyy')).toBeNull();
      expect(nativeDateAdapter.parse('00/15/2024', 'MM/dd/yyyy')).toBeNull();
    });
  });

  describe('isValid', () => {
    it('returns true for valid date', () => {
      expect(nativeDateAdapter.isValid(testDate)).toBe(true);
    });

    it('returns false for invalid date', () => {
      expect(nativeDateAdapter.isValid(invalidDate)).toBe(false);
    });

    it('returns false for null', () => {
      expect(nativeDateAdapter.isValid(null as any)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(nativeDateAdapter.isValid(undefined as any)).toBe(false);
    });

    it('returns false for non-date objects', () => {
      expect(nativeDateAdapter.isValid('2024-01-15' as any)).toBe(false);
      expect(nativeDateAdapter.isValid(123456789 as any)).toBe(false);
      expect(nativeDateAdapter.isValid({} as any)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('adds positive days', () => {
      const result = nativeDateAdapter.addDays(testDate, 5);
      expect(result).toEqual(new Date('2024-01-20T12:00:00.000Z'));
    });

    it('adds negative days (subtracts)', () => {
      const result = nativeDateAdapter.addDays(testDate, -5);
      expect(result).toEqual(new Date('2024-01-10T12:00:00.000Z'));
    });

    it('adds zero days', () => {
      const result = nativeDateAdapter.addDays(testDate, 0);
      expect(result).toEqual(testDate);
    });

    it('handles month boundaries', () => {
      const endOfMonth = new Date('2024-01-31T12:00:00.000Z');
      const result = nativeDateAdapter.addDays(endOfMonth, 1);
      expect(result).toEqual(new Date('2024-02-01T12:00:00.000Z'));
    });

    it('handles year boundaries', () => {
      const endOfYear = new Date('2024-12-31T12:00:00.000Z');
      const result = nativeDateAdapter.addDays(endOfYear, 1);
      expect(result).toEqual(new Date('2025-01-01T12:00:00.000Z'));
    });

    it('handles leap year', () => {
      const feb28 = new Date('2024-02-28T12:00:00.000Z'); // 2024 is leap year
      const result = nativeDateAdapter.addDays(feb28, 1);
      expect(result).toEqual(new Date('2024-02-29T12:00:00.000Z'));
    });
  });

  describe('addMonths', () => {
    it('adds positive months', () => {
      const result = nativeDateAdapter.addMonths(testDate, 3);
      expect(result).toEqual(new Date('2024-04-15T12:00:00.000Z'));
    });

    it('adds negative months (subtracts)', () => {
      const result = nativeDateAdapter.addMonths(testDate, -3);
      expect(result).toEqual(new Date('2023-10-15T12:00:00.000Z'));
    });

    it('adds zero months', () => {
      const result = nativeDateAdapter.addMonths(testDate, 0);
      expect(result).toEqual(testDate);
    });

    it('handles year boundaries', () => {
      const result = nativeDateAdapter.addMonths(testDate, 12);
      expect(result).toEqual(new Date('2025-01-15T12:00:00.000Z'));
    });

    it('handles month with different number of days', () => {
      const jan31 = new Date('2024-01-31T12:00:00.000Z');
      const result = nativeDateAdapter.addMonths(jan31, 1);
      // Should handle Feb not having 31 days
      expect(result.getMonth()).toBe(1); // February
      expect(result.getFullYear()).toBe(2024);
    });
  });

  describe('addYears', () => {
    it('adds positive years', () => {
      const result = nativeDateAdapter.addYears(testDate, 2);
      expect(result).toEqual(new Date('2026-01-15T12:00:00.000Z'));
    });

    it('adds negative years (subtracts)', () => {
      const result = nativeDateAdapter.addYears(testDate, -2);
      expect(result).toEqual(new Date('2022-01-15T12:00:00.000Z'));
    });

    it('adds zero years', () => {
      const result = nativeDateAdapter.addYears(testDate, 0);
      expect(result).toEqual(testDate);
    });

    it('handles leap year edge case', () => {
      const feb29 = new Date('2024-02-29T12:00:00.000Z'); // Leap year
      const result = nativeDateAdapter.addYears(feb29, 1);
      // 2025 is not a leap year, so should adjust to Feb 28
      expect(result).toEqual(new Date('2025-02-28T12:00:00.000Z'));
    });
  });

  describe('startOfDay', () => {
    it('returns start of day', () => {
      const result = nativeDateAdapter.startOfDay(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('handles already start of day', () => {
      const startOfDay = new Date('2024-01-15T00:00:00.000Z');
      const result = nativeDateAdapter.startOfDay(startOfDay);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('startOfMonth', () => {
    it('returns start of month', () => {
      const result = nativeDateAdapter.startOfMonth(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('handles first day of month', () => {
      const firstDay = new Date('2024-01-01T12:00:00.000Z');
      const result = nativeDateAdapter.startOfMonth(firstDay);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('startOfYear', () => {
    it('returns start of year', () => {
      const result = nativeDateAdapter.startOfYear(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('handles first day of year', () => {
      const firstDay = new Date('2024-01-01T12:00:00.000Z');
      const result = nativeDateAdapter.startOfYear(firstDay);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    it('returns end of day', () => {
      const result = nativeDateAdapter.endOfDay(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('endOfMonth', () => {
    it('returns end of month for January', () => {
      const result = nativeDateAdapter.endOfMonth(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it('returns end of month for February (leap year)', () => {
      const feb = new Date('2024-02-15T12:00:00.000Z');
      const result = nativeDateAdapter.endOfMonth(feb);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(29);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it('returns end of month for February (non-leap year)', () => {
      const feb = new Date('2023-02-15T12:00:00.000Z');
      const result = nativeDateAdapter.endOfMonth(feb);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(28);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('endOfYear', () => {
    it('returns end of year', () => {
      const result = nativeDateAdapter.endOfYear(testDate);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const date1 = new Date(2024, 0, 15, 10, 0, 0); // January 15, 2024, 10:00 AM local time
      const date2 = new Date(2024, 0, 15, 20, 0, 0); // January 15, 2024, 8:00 PM local time
      expect(nativeDateAdapter.isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-01-16T10:00:00.000Z');
      expect(nativeDateAdapter.isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different months', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-02-15T10:00:00.000Z');
      expect(nativeDateAdapter.isSameDay(date1, date2)).toBe(false);
    });

    it('returns false for different years', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2025-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('isSameMonth', () => {
    it('returns true for same month', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-01-25T20:00:00.000Z');
      expect(nativeDateAdapter.isSameMonth(date1, date2)).toBe(true);
    });

    it('returns false for different months', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-02-15T10:00:00.000Z');
      expect(nativeDateAdapter.isSameMonth(date1, date2)).toBe(false);
    });

    it('returns false for different years', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2025-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isSameMonth(date1, date2)).toBe(false);
    });
  });

  describe('isSameYear', () => {
    it('returns true for same year', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-12-25T20:00:00.000Z');
      expect(nativeDateAdapter.isSameYear(date1, date2)).toBe(true);
    });

    it('returns false for different years', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2025-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isSameYear(date1, date2)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('returns true when first date is after second', () => {
      const date1 = new Date('2024-01-16T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isAfter(date1, date2)).toBe(true);
    });

    it('returns false when first date is before second', () => {
      const date1 = new Date('2024-01-14T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isAfter(date1, date2)).toBe(false);
    });

    it('returns false when dates are equal', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isAfter(date1, date2)).toBe(false);
    });
  });

  describe('isBefore', () => {
    it('returns true when first date is before second', () => {
      const date1 = new Date('2024-01-14T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isBefore(date1, date2)).toBe(true);
    });

    it('returns false when first date is after second', () => {
      const date1 = new Date('2024-01-16T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isBefore(date1, date2)).toBe(false);
    });

    it('returns false when dates are equal', () => {
      const date1 = new Date('2024-01-15T10:00:00.000Z');
      const date2 = new Date('2024-01-15T10:00:00.000Z');
      expect(nativeDateAdapter.isBefore(date1, date2)).toBe(false);
    });
  });

  describe('getDay', () => {
    it('returns correct day of week', () => {
      // January 15, 2024 is a Monday (1)
      expect(nativeDateAdapter.getDay(testDate)).toBe(1);
    });

    it('returns correct day for Sunday', () => {
      const sunday = new Date('2024-01-14T12:00:00.000Z');
      expect(nativeDateAdapter.getDay(sunday)).toBe(0);
    });

    it('returns correct day for Saturday', () => {
      const saturday = new Date('2024-01-13T12:00:00.000Z');
      expect(nativeDateAdapter.getDay(saturday)).toBe(6);
    });
  });

  describe('getMonth', () => {
    it('returns correct month (0-indexed)', () => {
      // January is month 0
      expect(nativeDateAdapter.getMonth(testDate)).toBe(0);
    });

    it('returns correct month for December', () => {
      const december = new Date('2024-12-15T12:00:00.000Z');
      expect(nativeDateAdapter.getMonth(december)).toBe(11);
    });
  });

  describe('getYear', () => {
    it('returns correct year', () => {
      expect(nativeDateAdapter.getYear(testDate)).toBe(2024);
    });

    it('returns correct year for different year', () => {
      const date2025 = new Date('2025-01-15T12:00:00.000Z');
      expect(nativeDateAdapter.getYear(date2025)).toBe(2025);
    });
  });

  describe('getDaysInMonth', () => {
    it('returns correct days for January', () => {
      expect(nativeDateAdapter.getDaysInMonth(testDate)).toBe(31);
    });

    it('returns correct days for February (leap year)', () => {
      const feb2024 = new Date('2024-02-15T12:00:00.000Z');
      expect(nativeDateAdapter.getDaysInMonth(feb2024)).toBe(29);
    });

    it('returns correct days for February (non-leap year)', () => {
      const feb2023 = new Date('2023-02-15T12:00:00.000Z');
      expect(nativeDateAdapter.getDaysInMonth(feb2023)).toBe(28);
    });

    it('returns correct days for April', () => {
      const april = new Date('2024-04-15T12:00:00.000Z');
      expect(nativeDateAdapter.getDaysInMonth(april)).toBe(30);
    });
  });

  describe('today', () => {
    it('returns current date', () => {
      const today = nativeDateAdapter.today();
      const now = new Date();

      expect(today.getFullYear()).toBe(now.getFullYear());
      expect(today.getMonth()).toBe(now.getMonth());
      expect(today.getDate()).toBe(now.getDate());
    });

    it('returns date object', () => {
      const today = nativeDateAdapter.today();
      expect(today).toBeInstanceOf(Date);
      expect(nativeDateAdapter.isValid(today)).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles invalid dates in comparison functions', () => {
      expect(nativeDateAdapter.isAfter(invalidDate, testDate)).toBe(false);
      expect(nativeDateAdapter.isBefore(invalidDate, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameDay(invalidDate, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameMonth(invalidDate, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameYear(invalidDate, testDate)).toBe(false);
    });

    it('handles null dates in comparison functions', () => {
      expect(nativeDateAdapter.isAfter(null as any, testDate)).toBe(false);
      expect(nativeDateAdapter.isBefore(null as any, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameDay(null as any, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameMonth(null as any, testDate)).toBe(false);
      expect(nativeDateAdapter.isSameYear(null as any, testDate)).toBe(false);
    });

    it('handles invalid dates in manipulation functions', () => {
      expect(() => nativeDateAdapter.addDays(invalidDate, 1)).not.toThrow();
      expect(() => nativeDateAdapter.addMonths(invalidDate, 1)).not.toThrow();
      expect(() => nativeDateAdapter.addYears(invalidDate, 1)).not.toThrow();
    });

    it('handles invalid dates in getter functions', () => {
      expect(() => nativeDateAdapter.getDay(invalidDate)).not.toThrow();
      expect(() => nativeDateAdapter.getMonth(invalidDate)).not.toThrow();
      expect(() => nativeDateAdapter.getYear(invalidDate)).not.toThrow();
      expect(() => nativeDateAdapter.getDaysInMonth(invalidDate)).not.toThrow();
    });

    it('handles extreme dates', () => {
      const extremeDate = new Date('1900-01-01T00:00:00.000Z');
      expect(nativeDateAdapter.isValid(extremeDate)).toBe(true);
      expect(nativeDateAdapter.format(extremeDate, 'yyyy-MM-dd')).toBe(
        '1900-01-01'
      );
    });

    it('handles future dates', () => {
      const futureDate = new Date(2100, 11, 31, 23, 59, 59, 999); // December 31, 2100 in local time
      expect(nativeDateAdapter.isValid(futureDate)).toBe(true);
      expect(nativeDateAdapter.format(futureDate, 'yyyy-MM-dd')).toBe(
        '2100-12-31'
      );
    });
  });

  describe('Performance', () => {
    it('handles large number of operations efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const date = nativeDateAdapter.addDays(testDate, i);
        nativeDateAdapter.format(date, 'MM/dd/yyyy');
        nativeDateAdapter.isValid(date);
      }

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete within reasonable time
      expect(executionTime).toBeLessThan(1000);
    });
  });

  describe('Integration', () => {
    it('works correctly with all functions together', () => {
      // Create a date, manipulate it, and verify results
      const startDate = nativeDateAdapter.parse('01/01/2024', 'MM/dd/yyyy');
      expect(startDate).not.toBeNull();

      const futureDate = nativeDateAdapter.addMonths(startDate!, 6);
      expect(nativeDateAdapter.format(futureDate, 'MM/dd/yyyy')).toBe(
        '07/01/2024'
      );

      const endOfMonth = nativeDateAdapter.endOfMonth(futureDate);
      expect(nativeDateAdapter.format(endOfMonth, 'MM/dd/yyyy')).toBe(
        '07/31/2024'
      );

      expect(nativeDateAdapter.isSameMonth(futureDate, endOfMonth)).toBe(true);
      expect(nativeDateAdapter.isAfter(endOfMonth, futureDate)).toBe(true);
    });

    it('maintains consistency across operations', () => {
      const date1 = nativeDateAdapter.startOfDay(testDate);
      const date2 = nativeDateAdapter.endOfDay(testDate);

      expect(nativeDateAdapter.isSameDay(date1, date2)).toBe(true);
      expect(nativeDateAdapter.isBefore(date1, date2)).toBe(true);
      expect(nativeDateAdapter.isAfter(date2, date1)).toBe(true);
    });
  });
});
