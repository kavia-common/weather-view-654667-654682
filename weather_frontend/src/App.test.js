import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header brand title', () => {
  render(<App />);
  const title = screen.getByText(/Weather Viewer/i);
  expect(title).toBeInTheDocument();
});
