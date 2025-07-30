import { render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker value={null} onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <DatePicker 
        value={null} 
        onChange={() => {}} 
        placeholder="Select a date" 
      />
    );
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
  });

  it('displays selected date', () => {
    const testDate = new Date('2024-01-15');
    render(<DatePicker value={testDate} onChange={() => {}} />);
    expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();
  });
});
