# Usage Examples

This document provides practical examples of how to use react-datepicker-lite in your React applications.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h1>My App</h1>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date"
      />
      {selectedDate && (
        <p>Selected: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default App;
```

## With Date Restrictions

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';

function BookingForm() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  return (
    <div>
      <DatePicker
        value={checkInDate}
        onChange={setCheckInDate}
        placeholder="Check-in date"
        minDate={today}
        maxDate={maxDate}
      />
      
      <DatePicker
        value={checkOutDate}
        onChange={setCheckOutDate}
        placeholder="Check-out date"
        minDate={checkInDate || today}
        maxDate={maxDate}
      />
    </div>
  );
}
```

## Custom Styling

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';
import 'react-datepicker-lite/dist/index.css';
import './custom-datepicker.css';

function StyledDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      className="my-custom-datepicker"
      theme="dark"
    />
  );
}
```

```css
/* custom-datepicker.css */
.my-custom-datepicker {
  --rdp-primary-color: #ff6b6b;
  --rdp-border-radius: 8px;
  --rdp-font-family: 'Inter', sans-serif;
}
```

## With Form Libraries

### React Hook Form

```tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'react-datepicker-lite';

interface FormData {
  birthDate: Date | null;
  email: string;
}

function UserForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder="Birth date"
            maxDate={new Date()}
          />
        )}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Formik

```tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'react-datepicker-lite';

function FormikExample() {
  return (
    <Formik
      initialValues={{ eventDate: null }}
      onSubmit={(values) => console.log(values)}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Field name="eventDate">
            {() => (
              <DatePicker
                value={values.eventDate}
                onChange={(date) => setFieldValue('eventDate', date)}
                placeholder="Event date"
                minDate={new Date()}
              />
            )}
          </Field>
          
          <button type="submit">Create Event</button>
        </Form>
      )}
    </Formik>
  );
}
```

## Internationalization

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';

// Custom locale (you can create your own)
const frenchLocale = {
  code: 'fr-FR',
  name: 'French',
  months: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthsShort: [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
    'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ],
  weekdays: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 
    'Jeudi', 'Vendredi', 'Samedi'
  ],
  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  weekdaysMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  firstDayOfWeek: 1, // Monday
  rtl: false,
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
};

function InternationalDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      locale={frenchLocale}
      format="DD/MM/YYYY"
    />
  );
}
```

## Accessibility Features

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker-lite';

function AccessibleForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div>
      <label htmlFor="start-date">Project Start Date</label>
      <DatePicker
        id="start-date"
        value={startDate}
        onChange={setStartDate}
        aria-label="Select project start date"
        aria-describedby="start-date-help"
      />
      <div id="start-date-help">
        Choose when your project should begin
      </div>
    </div>
  );
}
```

## Advanced Usage with Custom Date Adapter

```tsx
import React, { useState } from 'react';
import { DatePicker, NativeDateAdapter } from 'react-datepicker-lite';

// Extend the native adapter for custom behavior
class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, format: string): string {
    // Custom formatting logic
    if (format === 'custom') {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return super.format(date, format);
  }
}

function CustomAdapterExample() {
  const [date, setDate] = useState<Date | null>(null);
  const customAdapter = new CustomDateAdapter();

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      dateAdapter={customAdapter}
      format="custom"
    />
  );
}
