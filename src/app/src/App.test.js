import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';
import { FaJenkins } from 'react-icons/fa';

jest.mock("./components/Chart",()=>()=><div/>);

it('should render', () => {
  render(<Provider store={store}><App /></Provider>);
  expect(screen.queryAllByText(/\w/g)).not.toBeFalsy();
});
