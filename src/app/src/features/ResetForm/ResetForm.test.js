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

import Alert from "../../components/Alert";

import ResetForm from '.';

let server = setupServer(
    rest.post(`${API_URL}/account/reset/:token/`, (req, res, ctx)=>{
        return res(ctx.status(200));
    }),
    rest.get(`${API_URL}/account/reset/:token/`, (req, res, ctx)=>{
        return res(ctx.status(200));
    }),
)

beforeAll(()=> server.listen());
afterEach(()=> server.resetHandlers());
afterAll(()=> server.close());


it('should render the password form after clicking the link',async ()=>{
    render(
        <Provider store={store}>
            <Router>
                <Alert />
                <Routes>
                    <Route path="/" element={<ResetForm token="abcd"/>} />
                </Routes>
            </Router>
        </Provider>
    )
    
    await waitFor(()=>{
        expect(screen.getByPlaceholderText(/Password/ig)).toBeInTheDocument();
    })

})

it('should render an alert and redirect if token has expired',async ()=>{
    server.use(
        rest.get(`${API_URL}/account/reset/:token/`, (req, res, ctx)=>{
            return res(ctx.status(400));
        }),
    )

    render(
        <Provider store={store}>
            <Router>
                <Alert />
                <Routes>
                    <Route path="/" element={<ResetForm token="abcd"/>} />
                    <Route path="forgot" element={
                        <div>
                            Forgot password
                        </div>} />
                </Routes>
            </Router>
        </Provider>
    )
    
    await waitFor(()=>{
        expect(screen.getByText(cts.LINK_EXPIRED_MESSAGE)).toBeInTheDocument();
        expect(screen.getByText(/Forgot password/ig)).toBeInTheDocument();
    })

})



it('should redirect and render an alert after entering a valid password',async ()=>{
    render(
        <Provider store={store}>
            <Router>
                <Alert />
                <Routes>
                    <Route path="/" element={<ResetForm token="abcd"/>} />
                    <Route path="/login" element={<div>Log in</div>} />
                </Routes>
            </Router>
        </Provider>
    )

    await waitFor(()=>{
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Change password/i)).toBeInTheDocument();
    })

    userEvent.type(screen.getByPlaceholderText(/Password/i),"Testuser1");
    userEvent.click(screen.getByText(/Change password/i))
    
    await waitFor(()=>{
        expect(screen.getByText(cts.SUCCESS_MESSAGE)).toBeInTheDocument();
        expect(screen.getByText("Log in")).toBeInTheDocument();
    })

})