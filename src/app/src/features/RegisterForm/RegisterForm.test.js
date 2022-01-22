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
    rest.post(`${API_URL}/account`, (req, res, ctx) =>{
        return res(ctx.status(200));
    })
)

let container;

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(()=> container = render(<Provider store={store}><Router><RegisterForm /></Router></Provider>).container)

it('should validate email addresses', async ()=>{
    
    let email = container.querySelector("[name=email]")
    let button = container.querySelector("[type=submit]");

    let email_valid = container.querySelector("#email-valid");

    userEvent.click(button);

    await waitFor(() => {
        expect(email).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.EMAIL_REQUIRED_MESSAGE
            )).not.toBeNull();
    });

    userEvent.type(email,"testuser");
    
    await waitFor(() => {
        expect(email_valid).toHaveClass("text-gray-600");
    })
    
    userEvent.click(button);
    
    await waitFor(() => {
        expect(email).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_EMAIL_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(email);
    userEvent.type(email,"testuser@gmail.com");    
    
    await waitFor(() => {
        expect(email_valid).toHaveClass("text-green-500");
    })

    userEvent.click(button);

    await waitFor(() => {
        expect(email).not.toHaveClass("ring-1");
    });
})


it('should validate passwords', async ()=>{
    
    let password = container.querySelector("[name=password]")
    let button = container.querySelector("[type=submit]");

    let pass_valid = container.querySelector("#pass-valid");
    let min_chars = container.querySelector("#min-chars");
    let has_upper = container.querySelector("#has-upper");
    let has_number = container.querySelector("#has-number");


    userEvent.type(password,"abcd");

    await waitFor(()=>{
        expect(pass_valid).toHaveClass("text-gray-600");
        expect(min_chars).toHaveClass("text-gray-600");
        expect(has_upper).toHaveClass("text-gray-600");
        expect(has_number).toHaveClass("text-gray-600");
    })

    userEvent.click(button);
    
    await waitFor(() => {
        expect(password).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSOWORD_LENGTH_MESSAGE
            )).not.toBeNull();
        
    });

    userEvent.clear(password);
    userEvent.type(password,"abcdefgh");  
    
    await waitFor(()=>{
        expect(pass_valid).toHaveClass("text-gray-600");
        expect(min_chars).toHaveClass("text-green-500");
        expect(has_upper).toHaveClass("text-gray-600");
        expect(has_number).toHaveClass("text-gray-600");
    })


    userEvent.click(button);
    
    await waitFor(() => {
        expect(password).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSWORD_UPPERCASE_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(password);
    userEvent.type(password,"Abcdefgh");    
    
    await waitFor(()=>{
        expect(pass_valid).toHaveClass("text-gray-600");
        expect(min_chars).toHaveClass("text-green-500");
        expect(has_upper).toHaveClass("text-green-500");
        expect(has_number).toHaveClass("text-gray-600");
    })

    userEvent.click(button);
    
    await waitFor(() => {
        expect(password).toHaveClass("ring-1");
        expect(screen.queryByText(
            cts.INVALID_PASSWORD_NUMBER_MESSAGE
            )).not.toBeNull();
    });

    userEvent.clear(password);
    userEvent.type(password,"abcdefgh1");    
    
    await waitFor(()=>{
        expect(pass_valid).toHaveClass("text-gray-600");
        expect(min_chars).toHaveClass("text-green-500");
        expect(has_upper).toHaveClass("text-gray-600");
        expect(has_number).toHaveClass("text-green-500");
    })

    userEvent.clear(password);
    userEvent.type(password,"Abcdefgh1");     
    userEvent.click(button);
    
    await waitFor(() => {
        expect(password).not.toHaveClass("ring-1");
        expect(pass_valid).toHaveClass("text-green-500");
    });
})


it("should show the success message", async ()=> {

    let email = container.querySelector("[name=email]")
    let password = container.querySelector("[name=password]")
    let button = container.querySelector("[type=submit]");

    userEvent.type(email,"testuser@gmail.com");
    userEvent.type(password,"Abcdefgh1");
    userEvent.click(button);

    await waitFor(()=>{
        expect(screen.queryByText(cts.SUCCESS_HEADER)).not.toBeNull();
        expect(screen.queryByText(cts.SUCCESS_MESSAGE)).not.toBeNull();
    })

})