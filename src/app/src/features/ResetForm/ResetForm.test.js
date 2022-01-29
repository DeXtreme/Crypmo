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

import ResetForm from '.';

server = setupServer(
    rest.post(`${API_URL}/account/reset`, (req, res, ctx)=>{
        return res(ctx.status(200));
    }),
    rest.post(`${API_URL}/account/reset/:token`, (req, res, ctx)=>{
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
                    <Route path="/" element={<ResetForm />} />
                </Routes>
            </Router>
        </Provider>
    )

    userEvent.type(screen.getByPlaceholderText(/Email/ig),"testuser@gmail.com");
    userEvent.click(screen.getByText("Reset password"));
    
    await waitFor(()=>{
        expect(screen.getByText(cts.RESET_EMAIL_SUCCESS_MESSAGE));
    })

})

it('should render the password form after clicking the link',async ()=>{
    render(
        <Provider store={store}>
            <Router initialEntries={"/reset/token"}>
                <Routes>
                    <Route path="/reset/:token" element={<ResetForm />} />
                </Routes>
            </Router>
        </Provider>
    )
    
    await waitFor(()=>{
        expect(screen.getByPlaceholderText(/Password/ig)).toBeInDocument();
    })

})

it('should redirect and render an alert entering a valid password',async ()=>{
    render(
        <Provider store={store}>
            <Router initialEntries={"/reset/token"}>
                <Routes>
                    <Route path="/reset/:token" element={<ResetForm />} />
                    <Route path="/login" element={()=>{
                        return(
                            <div>
                                Log in
                            </div>
                        )
                    }}/>
                </Routes>
            </Router>
        </Provider>
    )

    userEvent.type(screen.getByPlaceholderText(/Password/ig),"Testuser1");
    userEvent.click(screen.getByText("Change password"))
    
    await waitFor(()=>{
        expect(screen.getByTestId("login")).toBeInDocument();
    })

})