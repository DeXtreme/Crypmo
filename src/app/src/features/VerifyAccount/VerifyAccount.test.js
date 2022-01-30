import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from 'msw/node';

import { API_URL } from "../../constants";
import * as cts from './constants';
import { store } from "../../store";
import Alert from "../../components/Alert";

import VerifyAccount from ".";



const server = setupServer(
    rest.get(`${API_URL}/account/verify/*`, (req, res, ctx)=>{
        return res(ctx.status(201));
    })
)



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(()=> server.close());

it("should render a success alert if token is valid", async () => {
    render(<Provider store={store}>
                <Alert />
                <VerifyAccount />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByText(
            cts.SUCCESS_HEADER
        )).toBeInTheDocument()
        expect(screen.getByText(
            cts.SUCCESS_MESSAGE
        )).toBeInTheDocument()
    })
})

it("should render a fail alert if token is invalid", async () => {
    server.use(
        rest.get(`${API_URL}/account/verify/*`, (req, res, ctx)=>{
            return res(ctx.status(500));
        })
    )
    
    render(<Provider store={store}>
                <Alert />
                <VerifyAccount />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByText(
            cts.FAIL_HEADER
        )).toBeInTheDocument();

        expect(screen.getByText(
            cts.FAIL_MESSAGE
        )).toBeInTheDocument();
    })
})
