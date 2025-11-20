import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pre-flight checklist app heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Pre-Flight Checklist App/i);
  expect(headingElement).toBeInTheDocument();
});
