import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from 'msw/node';

import { API_URL } from "../../constants";
import * as constants from './constants';
import VerifyAccount from ".";


const server = setupServer(
    rest.get(`${API_URL}/account/verify/*`, (req, res, ctx)=>{
        return res(ctx.status(201));
    })
)



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(()=> server.close());

it("should show a success message if token is valid", async () => {
    render(<VerifyAccount />)
    await waitFor(()=>{
        expect(screen.queryByText(
            constants.ACCOUNT_VERIFICATION_SUCCESS_HEADER
        )).not.toBeNull();

        expect(screen.queryByText(
            constants.ACCOUNT_VERIFICATION_SUCCESS_MESSAGE
        )).not.toBeNull();
    })
})

it("should show a failure message if token is invalid", async () => {
    server.use(
        rest.get(`${API_URL}/account/verify/*`, (req, res, ctx)=>{
            return res(ctx.status(500));
        })
    )
    
    render(<VerifyAccount />)

    await waitFor(()=>{
        expect(screen.queryByText(
            constants.ACCOUNT_VERIFICATION_FAIL_HEADER
        )).not.toBeNull();

        expect(screen.queryByText(
            constants.ACCOUNT_VERIFICATION_FAIL_MESSAGE
        )).not.toBeNull();
    })
})

