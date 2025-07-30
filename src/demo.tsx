import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DatePicker } from './components/DatePicker/DatePicker';
import './styles/variables.css';

const Demo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React DatePicker Lite Demo</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Basic DatePicker</h2>
        <p>
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
        </p>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder='Select a date'
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>DatePicker with Default Value</h2>
        <p>
          Selected:{' '}
          {selectedDate2 ? selectedDate2.toLocaleDateString() : 'None'}
        </p>
        <DatePicker
          value={selectedDate2}
          onChange={setSelectedDate2}
          placeholder='Select a date'
          showWeekNumbers
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Disabled DatePicker</h2>
        <DatePicker
          value={new Date()}
          onChange={() => {}}
          disabled
          placeholder='Disabled picker'
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>DatePicker with Min/Max Dates</h2>
        <DatePicker
          value={null}
          onChange={() => {}}
          minDate={new Date(2024, 0, 1)} // Jan 1, 2024
          maxDate={new Date(2024, 11, 31)} // Dec 31, 2024
          placeholder='Select date in 2024'
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Custom Format</h2>
        <DatePicker
          value={null}
          onChange={() => {}}
          format='DD/MM/YYYY'
          placeholder='DD/MM/YYYY format'
        />
      </div>
    </div>
  );
};

// Mount the demo
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Demo />);
}
