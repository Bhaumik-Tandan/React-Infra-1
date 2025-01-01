import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders Infra for frontend engineers text', () => {
  render(<App />);
  const textElement = screen.getByText(/Infra for frontend engineers/i);
  expect(textElement).toBeInTheDocument();
});
