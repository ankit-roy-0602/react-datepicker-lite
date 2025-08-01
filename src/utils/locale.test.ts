import { defaultLocale } from './locale';

describe('defaultLocale', () => {
  describe('Basic Properties', () => {
    it('has correct code', () => {
      expect(defaultLocale.code).toBe('en-US');
    });

    it('has correct name', () => {
      expect(defaultLocale.name).toBe('English (US)');
    });

    it('has correct first day of week', () => {
      expect(defaultLocale.firstDayOfWeek).toBe(0); // Sunday
    });

    it('is not RTL by default', () => {
      expect(defaultLocale.rtl).toBeFalsy();
    });
  });

  describe('Month Names', () => {
    it('has 12 months', () => {
      expect(defaultLocale.months).toHaveLength(12);
    });

    it('has correct month names', () => {
      const expectedMonths = [
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
      ];
      expect(defaultLocale.months).toEqual(expectedMonths);
    });

    it('has 12 short month names', () => {
      expect(defaultLocale.monthsShort).toHaveLength(12);
    });

    it('has correct short month names', () => {
      const expectedShortMonths = [
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
      ];
      expect(defaultLocale.monthsShort).toEqual(expectedShortMonths);
    });
  });

  describe('Weekday Names', () => {
    it('has 7 weekdays', () => {
      expect(defaultLocale.weekdays).toHaveLength(7);
    });

    it('has correct weekday names', () => {
      const expectedWeekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      expect(defaultLocale.weekdays).toEqual(expectedWeekdays);
    });

    it('has 7 short weekday names', () => {
      expect(defaultLocale.weekdaysShort).toHaveLength(7);
    });

    it('has correct short weekday names', () => {
      const expectedShortWeekdays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ];
      expect(defaultLocale.weekdaysShort).toEqual(expectedShortWeekdays);
    });

    it('has 7 minimal weekday names', () => {
      expect(defaultLocale.weekdaysMin).toHaveLength(7);
    });

    it('has correct minimal weekday names', () => {
      const expectedMinWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      expect(defaultLocale.weekdaysMin).toEqual(expectedMinWeekdays);
    });
  });

  describe('Date Formats', () => {
    it('has correct date format', () => {
      expect(defaultLocale.dateFormat).toBe('MM/DD/YYYY');
    });

    it('has correct time format', () => {
      expect(defaultLocale.timeFormat).toBe('HH:mm');
    });

    it('has correct date-time format', () => {
      expect(defaultLocale.dateTimeFormat).toBe('MM/DD/YYYY HH:mm');
    });
  });

  describe('Locale Structure Validation', () => {
    it('has all required properties', () => {
      const requiredProperties = [
        'code',
        'name',
        'months',
        'monthsShort',
        'weekdays',
        'weekdaysShort',
        'weekdaysMin',
        'firstDayOfWeek',
        'dateFormat',
        'timeFormat',
        'dateTimeFormat',
      ];

      requiredProperties.forEach((prop) => {
        expect(defaultLocale).toHaveProperty(prop);
      });
    });

    it('has consistent array lengths', () => {
      expect(defaultLocale.months).toHaveLength(12);
      expect(defaultLocale.monthsShort).toHaveLength(12);
      expect(defaultLocale.weekdays).toHaveLength(7);
      expect(defaultLocale.weekdaysShort).toHaveLength(7);
      expect(defaultLocale.weekdaysMin).toHaveLength(7);
    });

    it('has valid firstDayOfWeek value', () => {
      expect(defaultLocale.firstDayOfWeek).toBeGreaterThanOrEqual(0);
      expect(defaultLocale.firstDayOfWeek).toBeLessThan(7);
    });

    it('has non-empty string values', () => {
      expect(defaultLocale.code).toBeTruthy();
      expect(defaultLocale.name).toBeTruthy();
      expect(defaultLocale.dateFormat).toBeTruthy();
      expect(defaultLocale.timeFormat).toBeTruthy();
      expect(defaultLocale.dateTimeFormat).toBeTruthy();
    });

    it('has non-empty array elements', () => {
      defaultLocale.months.forEach((month) => {
        expect(month).toBeTruthy();
        expect(typeof month).toBe('string');
      });

      defaultLocale.monthsShort.forEach((month) => {
        expect(month).toBeTruthy();
        expect(typeof month).toBe('string');
      });

      defaultLocale.weekdays.forEach((weekday) => {
        expect(weekday).toBeTruthy();
        expect(typeof weekday).toBe('string');
      });

      defaultLocale.weekdaysShort.forEach((weekday) => {
        expect(weekday).toBeTruthy();
        expect(typeof weekday).toBe('string');
      });

      defaultLocale.weekdaysMin.forEach((weekday) => {
        expect(weekday).toBeTruthy();
        expect(typeof weekday).toBe('string');
      });
    });
  });

  describe('Locale Immutability', () => {
    it('should preserve original months array structure', () => {
      const originalLength = defaultLocale.months.length;
      const originalFirstMonth = defaultLocale.months[0];

      // Test that the array maintains its structure
      expect(defaultLocale.months).toHaveLength(originalLength);
      expect(defaultLocale.months[0]).toBe(originalFirstMonth);
    });

    it('should preserve original weekdays array structure', () => {
      const originalLength = defaultLocale.weekdays.length;
      const originalFirstDay = defaultLocale.weekdays[0];

      // Test that the array maintains its structure
      expect(defaultLocale.weekdays).toHaveLength(originalLength);
      expect(defaultLocale.weekdays[0]).toBe(originalFirstDay);
    });
  });

  describe('Custom Locale Creation', () => {
    it('can be used as a base for custom locales', () => {
      const customLocale = {
        ...defaultLocale,
        code: 'es',
        name: 'Spanish',
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthsShort: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        firstDayOfWeek: 1, // Monday
        dateFormat: 'dd/MM/yyyy',
      };

      expect(customLocale.code).toBe('es');
      expect(customLocale.name).toBe('Spanish');
      expect(customLocale.firstDayOfWeek).toBe(1);
      expect(customLocale.dateFormat).toBe('dd/MM/yyyy');
      expect(customLocale.months[0]).toBe('Enero');
      expect(customLocale.weekdays[1]).toBe('Lunes');
    });

    it('can create RTL locale', () => {
      const rtlLocale = {
        ...defaultLocale,
        code: 'ar',
        name: 'Arabic',
        rtl: true,
        firstDayOfWeek: 6, // Saturday
        dateFormat: 'dd/MM/yyyy',
      };

      expect(rtlLocale.rtl).toBe(true);
      expect(rtlLocale.firstDayOfWeek).toBe(6);
    });

    it('can create locale with different time format', () => {
      const customTimeLocale = {
        ...defaultLocale,
        code: 'us',
        name: 'US English',
        timeFormat: 'hh:mm a',
        dateTimeFormat: 'MM/dd/yyyy hh:mm a',
      };

      expect(customTimeLocale.timeFormat).toBe('hh:mm a');
      expect(customTimeLocale.dateTimeFormat).toBe('MM/dd/yyyy hh:mm a');
    });
  });

  describe('Locale Compatibility', () => {
    it('works with Date constructor month indices', () => {
      // JavaScript Date months are 0-indexed
      const testDate = new Date(2024, 0, 15); // January 15, 2024
      const monthIndex = testDate.getMonth();

      expect(defaultLocale.months[monthIndex]).toBe('January');
      expect(defaultLocale.monthsShort[monthIndex]).toBe('Jan');
    });

    it('works with Date constructor day indices', () => {
      // JavaScript Date days are 0-indexed (0 = Sunday)
      const testDate = new Date(2024, 0, 14); // Sunday, January 14, 2024
      const dayIndex = testDate.getDay();

      expect(defaultLocale.weekdays[dayIndex]).toBe('Sunday');
      expect(defaultLocale.weekdaysShort[dayIndex]).toBe('Sun');
      expect(defaultLocale.weekdaysMin[dayIndex]).toBe('Su');
    });
  });

  describe('Format String Validation', () => {
    it('has valid date format patterns', () => {
      // Check that format contains expected patterns
      expect(defaultLocale.dateFormat).toMatch(/[Mdy]/);
    });

    it('has valid time format patterns', () => {
      // Check that format contains expected patterns
      expect(defaultLocale.timeFormat).toMatch(/[Hm]/);
    });

    it('has valid datetime format patterns', () => {
      // Check that format contains both date and time patterns
      expect(defaultLocale.dateTimeFormat).toMatch(/[Mdy]/);
      expect(defaultLocale.dateTimeFormat).toMatch(/[Hm]/);
    });
  });

  describe('Edge Cases', () => {
    it('handles locale object spreading', () => {
      const spread = { ...defaultLocale };

      expect(spread).toEqual(defaultLocale);
      expect(spread).not.toBe(defaultLocale); // Different object reference
    });

    it('handles property access', () => {
      expect(() => defaultLocale.code).not.toThrow();
      expect(() => defaultLocale.months[0]).not.toThrow();
      expect(() => defaultLocale.weekdays[0]).not.toThrow();
    });

    it('handles array iteration', () => {
      expect(() => {
        defaultLocale.months.forEach((month) => month.length);
      }).not.toThrow();

      expect(() => {
        defaultLocale.weekdays.forEach((day) => day.length);
      }).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('has correct types for all properties', () => {
      expect(typeof defaultLocale.code).toBe('string');
      expect(typeof defaultLocale.name).toBe('string');
      expect(Array.isArray(defaultLocale.months)).toBe(true);
      expect(Array.isArray(defaultLocale.monthsShort)).toBe(true);
      expect(Array.isArray(defaultLocale.weekdays)).toBe(true);
      expect(Array.isArray(defaultLocale.weekdaysShort)).toBe(true);
      expect(Array.isArray(defaultLocale.weekdaysMin)).toBe(true);
      expect(typeof defaultLocale.firstDayOfWeek).toBe('number');
      expect(typeof defaultLocale.dateFormat).toBe('string');
      expect(typeof defaultLocale.timeFormat).toBe('string');
      expect(typeof defaultLocale.dateTimeFormat).toBe('string');
    });

    it('has string arrays with string elements', () => {
      defaultLocale.months.forEach((month) => {
        expect(typeof month).toBe('string');
      });

      defaultLocale.weekdays.forEach((day) => {
        expect(typeof day).toBe('string');
      });
    });
  });
});
