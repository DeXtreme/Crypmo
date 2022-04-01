import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from 'msw/node';

import { API_URL } from "../../constants";
import { store } from "../../store";
import * as cts from './constants';
import RegisterForm from ".";


const server = setupServer(
    rest.post(`${API_URL}/account/`, (req, res, ctx) =>{
        return res(ctx.status(200));
    })
)

let container;

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


it('should validate email addresses', async ()=>{
    render(<Provider store={store}>
                <Router>
                    <RegisterForm />
                </Router>
            </Provider>);

    userEvent.click(screen.getByText(/Create Account/gi));

    await waitFor(() => {
        expect(screen.getByTestId("email-valid")).toHaveClass("text-gray-600");
        expect(screen.getByPlaceholderText(/Email/gi)).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.EMAIL_REQUIRED_MESSAGE
            )).not.toBeNull();
    });

    userEvent.type(email,"testuser");
    userEvent.click(screen.getByText(/Create Account/gi));
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Email/gi)).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_EMAIL_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(screen.getByPlaceholderText(/Email/gi));
    userEvent.type(screen.getByPlaceholderText(/Email/gi),"testuser@gmail.com");    
    userEvent.click(screen.getByText(/Create Account/gi));

    await waitFor(() => {
        expect(screen.getByTestId("email-valid")).toHaveClass("text-green-500");
        expect(screen.getByPlaceholderText(/Email/gi)).not.toHaveClass("ring-1");
    });
})


it('should validate passwords', async ()=>{
    render(<Provider store={store}>
                <Router>
                    <RegisterForm />
                </Router>
            </Provider>);
    
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"abcd");

    await waitFor(()=>{
        expect(screen.getByTestId("password-valid")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("min-chars")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("has-upper")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("has-number")).toHaveClass("text-gray-600");
    })

    userEvent.click(screen.getByText(/Create Account/gi));
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Password/gi)).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSOWORD_LENGTH_MESSAGE
            )).not.toBeNull();
        
    });

    userEvent.clear(screen.getByPlaceholderText(/Password/gi));
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"abcdefgh");  
    
    await waitFor(()=>{
        expect(screen.getByTestId("password-valid")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("min-chars")).toHaveClass("text-green-500");
        expect(screen.getByTestId("has-upper")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("has-number")).toHaveClass("text-gray-600");
    })


    userEvent.click(screen.getByText(/Create Account/gi));
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Password/gi)).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSWORD_UPPERCASE_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(screen.getByPlaceholderText(/Password/gi));
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"Abcdefgh");    
    
    await waitFor(()=>{
        expect(screen.getByTestId("password-valid")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("min-chars")).toHaveClass("text-green-500");
        expect(screen.getByTestId("has-upper")).toHaveClass("text-green-500");
        expect(screen.getByTestId("has-number")).toHaveClass("text-gray-600");
    })

    userEvent.click(screen.getByText(/Create Account/gi));
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Password/gi)).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSWORD_NUMBER_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(screen.getByPlaceholderText(/Password/gi));
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"abcdefgh1");    
    
    await waitFor(()=>{
        expect(screen.getByTestId("password-valid")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("min-chars")).toHaveClass("text-green-500");
        expect(screen.getByTestId("has-upper")).toHaveClass("text-gray-600");
        expect(screen.getByTestId("has-number")).toHaveClass("text-green-500");
    })

    userEvent.clear(screen.getByPlaceholderText(/Password/gi));
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"Abcdefgh1");     
    userEvent.click(screen.getByText(/Create Account/gi));
    
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Password/gi)).not.toHaveClass("ring-1");
        expect(screen.getByTestId("password-valid")).toHaveClass("text-green-500");
    });
})


it("should show the success message", async ()=> {
    render(<Provider store={store}>
                <Router>
                    <RegisterForm />
                </Router>
            </Provider>);

    userEvent.type(screen.getByPlaceholderText(/Email/gi),"testuser@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/Password/gi),"Abcdefgh1");
    userEvent.click(screen.getByText(/Create Account/gi));

    await waitFor(()=>{
        expect(screen.queryByText(cts.SUCCESS_HEADER)).not.toBeNull();
        expect(screen.queryByText(cts.SUCCESS_MESSAGE)).not.toBeNull();
    })

})