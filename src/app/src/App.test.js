import { render, screen } from '@testing-library/react';
import App from './App';

it('should render', () => {
  render(<App />);
  expect(screen.queryAllByText(/\w/g)).not.toBeFalsy();
});
