# 📚 React DatePicker Lite - Usage Examples

This document provides comprehensive examples of how to use React DatePicker Lite in various scenarios.

## 🚀 Basic Examples

### Simple Date Picker

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function BasicExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h3>Select a Date</h3>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Choose a date..."
      />
      {selectedDate && (
        <p>You selected: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
}
```

### With Default Value

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function DefaultValueExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date"
    />
  );
}
```

## 🎨 Styling Examples

### Custom CSS Classes

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';
import './custom-datepicker.css'; // Your custom styles

function StyledExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      className="my-custom-datepicker"
      placeholder="Styled date picker"
    />
  );
}
```

**custom-datepicker.css:**
```css
.my-custom-datepicker {
  --rdl-primary: #ff6b6b;
  --rdl-border-radius: 12px;
  --rdl-font-family: 'Inter', sans-serif;
}

.my-custom-datepicker .rdl-date-input {
  border: 2px solid #e1e5e9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-custom-datepicker .rdl-date-input:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}
```

### Dark Theme

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function DarkThemeExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div data-theme="dark" style={{ background: '#1a1a1a', padding: '20px' }}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Dark theme picker"
      />
    </div>
  );
}
```

## 📅 Date Restrictions

### Min/Max Dates

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function DateRestrictionsExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // 30 days from today

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      minDate={today} // Can't select past dates
      maxDate={maxDate} // Can't select dates more than 30 days ahead
      placeholder="Select within date range"
    />
  );
}
```

### Disabled Specific Dates

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function DisabledDatesExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      disabledDates={isWeekend}
      placeholder="Weekdays only"
    />
  );
}
```

### Disable Specific Date Array

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function DisabledDatesArrayExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Disable specific holidays
  const holidays = [
    new Date(2025, 11, 25), // Christmas
    new Date(2025, 0, 1),   // New Year
    new Date(2025, 6, 4),   // Independence Day
  ];

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      disabledDates={holidays}
      placeholder="Holidays disabled"
    />
  );
}
```

## 🌍 Internationalization

### Different Locales

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function LocaleExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [locale, setLocale] = useState('en-US');

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Locale: 
          <select value={locale} onChange={(e) => setLocale(e.target.value)}>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="es">Spanish</option>
          </select>
        </label>
      </div>
      
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        locale={locale}
        format={locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
        placeholder="Select date"
      />
    </div>
  );
}
```

## 📱 Form Integration

### With React Hook Form

```tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

interface FormData {
  birthDate: Date | null;
  startDate: Date | null;
}

function ReactHookFormExample() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Birth Date:</label>
        <Controller
          name="birthDate"
          control={control}
          rules={{ required: 'Birth date is required' }}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Select birth date"
              maxDate={new Date()} // Can't select future dates
            />
          )}
        />
        {errors.birthDate && (
          <span style={{ color: 'red' }}>{errors.birthDate.message}</span>
        )}
      </div>

      <div>
        <label>Start Date:</label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Select start date"
              minDate={new Date()} // Can't select past dates
            />
          )}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### With Formik

```tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function FormikExample() {
  return (
    <Formik
      initialValues={{ eventDate: null }}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label>Event Date:</label>
            <DatePicker
              value={values.eventDate}
              onChange={(date) => setFieldValue('eventDate', date)}
              placeholder="Select event date"
              minDate={new Date()}
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

## 🔧 Advanced Usage

### Controlled vs Uncontrolled

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function ControlledVsUncontrolled() {
  const [controlledDate, setControlledDate] = useState<Date | null>(null);

  return (
    <div>
      {/* Controlled Component */}
      <div>
        <h4>Controlled DatePicker</h4>
        <DatePicker
          value={controlledDate}
          onChange={setControlledDate}
          placeholder="Controlled"
        />
        <button onClick={() => setControlledDate(new Date())}>
          Set to Today
        </button>
        <button onClick={() => setControlledDate(null)}>
          Clear
        </button>
      </div>

      {/* Uncontrolled Component */}
      <div>
        <h4>Uncontrolled DatePicker</h4>
        <DatePicker
          defaultValue={new Date()}
          onChange={(date) => console.log('Selected:', date)}
          placeholder="Uncontrolled"
        />
      </div>
    </div>
  );
}
```

### Custom Date Formats

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function CustomFormatsExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [format, setFormat] = useState('MM/DD/YYYY');

  const formats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'DD MMM YYYY',
    'MMM DD, YYYY'
  ];

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Format: 
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            {formats.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>
      
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        format={format}
        placeholder={`Format: ${format}`}
      />
    </div>
  );
}
```

### Event Handlers

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function EventHandlersExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          addLog(`Date changed to: ${date?.toLocaleDateString() || 'null'}`);
        }}
        onFocus={() => addLog('Input focused')}
        onBlur={() => addLog('Input blurred')}
        onKeyDown={(e) => addLog(`Key pressed: ${e.key}`)}
        placeholder="Event tracking picker"
      />
      
      <div style={{ marginTop: '20px' }}>
        <h4>Event Log:</h4>
        <div style={{ height: '150px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ fontSize: '12px', marginBottom: '2px' }}>
              {log}
            </div>
          ))}
        </div>
        <button onClick={() => setLogs([])}>Clear Log</button>
      </div>
    </div>
  );
}
```

## 🧪 Testing Examples

### Jest + React Testing Library

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from 'react-datepicker-lite';

describe('DatePicker', () => {
  test('renders with placeholder', () => {
    render(
      <DatePicker
        value={null}
        onChange={() => {}}
        placeholder="Select date"
      />
    );
    
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  test('calls onChange when date is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <DatePicker
        value={null}
        onChange={handleChange}
        placeholder="Select date"
      />
    );
    
    // Click the input to open calendar
    await user.click(screen.getByPlaceholderText('Select date'));
    
    // Click on a date (assuming today's date is available)
    const today = new Date().getDate().toString();
    const dateButton = screen.getByRole('button', { name: new RegExp(today) });
    await user.click(dateButton);
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('respects min/max date restrictions', () => {
    const minDate = new Date(2025, 0, 1);
    const maxDate = new Date(2025, 11, 31);
    
    render(
      <DatePicker
        value={null}
        onChange={() => {}}
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select date"
      />
    );
    
    // Test implementation would verify disabled dates
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });
});
```

### Cypress E2E Testing

```tsx
// cypress/integration/datepicker.spec.ts
describe('DatePicker E2E', () => {
  beforeEach(() => {
    cy.visit('/datepicker-test'); // Your test page
  });

  it('should open calendar when clicked', () => {
    cy.get('[data-testid="datepicker-input"]').click();
    cy.get('.rdl-calendar').should('be.visible');
  });

  it('should select a date', () => {
    cy.get('[data-testid="datepicker-input"]').click();
    cy.get('.rdl-calendar-day').contains('15').click();
    cy.get('[data-testid="datepicker-input"]').should('contain.value', '15');
  });

  it('should close calendar when clicking outside', () => {
    cy.get('[data-testid="datepicker-input"]').click();
    cy.get('.rdl-calendar').should('be.visible');
    cy.get('body').click(0, 0);
    cy.get('.rdl-calendar').should('not.exist');
  });
});
```

## 🚀 Framework Integration

### Next.js Integration

```tsx
// pages/datepicker-example.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const DatePicker = dynamic(
  () => import('react-datepicker-lite').then(mod => ({ default: mod.DatePicker })),
  { ssr: false }
);

// Import CSS in _app.tsx or here
import 'react-datepicker-lite/dist/index.css';

export default function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h1>Next.js DatePicker Example</h1>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date"
      />
    </div>
  );
}
```

### Gatsby Integration

```tsx
// src/components/DatePickerComponent.tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date"
    />
  );
};

export default DatePickerComponent;
```

```tsx
// src/pages/index.tsx
import React from 'react';
import DatePickerComponent from '../components/DatePickerComponent';

const IndexPage = () => {
  return (
    <div>
      <h1>Gatsby DatePicker Example</h1>
      <DatePickerComponent />
    </div>
  );
};

export default IndexPage;
```

### Vite + React Integration

```tsx
// src/App.tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vite + React DatePicker</h1>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select a date"
        />
        {selectedDate && (
          <p>Selected: {selectedDate.toLocaleDateString()}</p>
        )}
      </header>
    </div>
  );
}

export default App;
```

## 🎯 Real-World Use Cases

### Booking System

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function BookingSystem() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Disable past dates and booked dates
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (date < today) return true;
    
    // Disable some random booked dates (in real app, fetch from API)
    const bookedDates = [
      new Date(2025, 7, 15),
      new Date(2025, 7, 16),
      new Date(2025, 7, 20),
    ];
    
    return bookedDates.some(bookedDate => 
      date.toDateString() === bookedDate.toDateString()
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hotel Booking</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label>Check-in Date:</label>
          <DatePicker
            value={checkIn}
            onChange={setCheckIn}
            disabledDates={isDateDisabled}
            placeholder="Select check-in"
          />
        </div>
        
        <div>
          <label>Check-out Date:</label>
          <DatePicker
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : new Date()}
            disabledDates={isDateDisabled}
            placeholder="Select check-out"
          />
        </div>
      </div>
      
      {checkIn && checkOut && (
        <div style={{ padding: '10px', background: '#f0f8ff', borderRadius: '4px' }}>
          <strong>Booking Summary:</strong>
          <p>Check-in: {checkIn.toLocaleDateString()}</p>
          <p>Check-out: {checkOut.toLocaleDateString()}</p>
          <p>Duration: {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</p>
        </div>
      )}
    </div>
  );
}
```

### Event Scheduler

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

interface Event {
  id: string;
  title: string;
  date: Date;
}

function EventScheduler() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');

  const addEvent = () => {
    if (selectedDate && eventTitle.trim()) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventTitle.trim(),
        date: selectedDate,
      };
      setEvents(prev => [...prev, newEvent]);
      setEventTitle('');
      setSelectedDate(null);
    }
  };

  const hasEvent = (date: Date) => {
    return events.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Event Scheduler</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event title"
            style={{ marginRight: '10px', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select event date"
            minDate={new Date()}
          />
        </div>
        
        <button 
          onClick={addEvent}
          disabled={!selectedDate || !eventTitle.trim()}
          style={{ padding: '8px 16px' }}
        >
          Add Event
        </button>
      </div>
      
      <div>
        <h3>Scheduled Events:</h3>
        {events.length === 0 ? (
          <p>No events scheduled</p>
        ) : (
          <ul>
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(event => (
                <li key={event.id} style={{ marginBottom: '8px' }}>
                  <strong>{event.title}</strong> - {event.date.toLocaleDateString()}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

### Age Calculator

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getDaysUntilBirthday = (birthDate: Date) => {
    const today = new Date();
    const thisYear = today.getFullYear();
    let birthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
    
    if (birthday < today) {
      birthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    const diffTime = birthday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Age Calculator</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Enter your birth date:</label>
        <DatePicker
          value={birthDate}
          onChange={setBirthDate}
          maxDate={new Date()} // Can't select future dates
          placeholder="Select birth date"
        />
      </div>
      
      {birthDate && (
        <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Results:</h3>
          <p><strong>Age:</strong> {calculateAge(birthDate)} years old</p>
          <p><strong>Birth Date:</strong> {birthDate.toLocaleDateString()}</p>
          <p><strong>Days until next birthday:</strong> {getDaysUntilBirthday(birthDate)} days</p>
        </div>
      )}
    </div>
  );
}
```

## 🔧 Performance Optimization

### Memoization Example

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function OptimizedDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [holidays, setHolidays] = useState<Date[]>([
    new Date(2025, 11, 25), // Christmas
    new Date(2025, 0, 1),   // New Year
  ]);

  // Memoize the disabled dates function
  const isDateDisabled = useCallback((date: Date) => {
    return holidays.some(holiday => 
      holiday.toDateString() === date.toDateString()
    );
  }, [holidays]);

  // Memoize expensive calculations
  const dateStats = useMemo(() => {
    if (!selectedDate) return null;
    
    return {
      dayOfYear: Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
      weekOfYear: Math.ceil(((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(selectedDate.getFullYear(), 0, 1).getDay() + 1) / 7),
      quarter: Math.ceil((selectedDate.getMonth() + 1) / 3),
    };
  }, [selectedDate]);

  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        disabledDates={isDateDisabled}
        placeholder="Select a date"
      />
      
      {dateStats && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <p>Day of year: {dateStats.dayOfYear}</p>
          <p>Week of year: {dateStats.weekOfYear}</p>
          <p>Quarter: Q{dateStats.quarter}</p>
        </div>
      )}
    </div>
  );
}
```

This comprehensive guide covers most common use cases and integration patterns for React DatePicker Lite. Each example is production-ready and follows React best practices.
