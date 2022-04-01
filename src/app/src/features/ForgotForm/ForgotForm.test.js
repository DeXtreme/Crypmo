import React from "react";
import {render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { store } from '../../store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { API_URL } from "../../constants";
import * as cts from './constants';

import ForgotForm from '.';

let server = setupServer(
    rest.post(`${API_URL}/account/forgot/`, (req, res, ctx)=>{
        return res(ctx.status(200));
    }),
)

beforeAll(()=> server.listen());
afterEach(()=> server.resetHandlers());
afterAll(()=> server.close());


it('should render the success message after entering an email',async ()=>{
    render(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<ForgotForm />} />
                </Routes>
            </Router>
        </Provider>
    )

    userEvent.type(screen.getByLabelText(/Email/i),"testuser@gmail.com");
    userEvent.click(screen.getByText(/Reset password/i));
    
    await waitFor(()=>{
        expect(screen.getByText(cts.SUCCESS_MESSAGE));
    })

})