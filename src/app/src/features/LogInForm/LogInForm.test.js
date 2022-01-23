import React from "react";
import jwt_decode from 'jwt-decode';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from "msw/node";

import { API_URL } from "../../constants";
import Alert from "../../components/Alert";
import { store } from "../../store";

import LogInForm from ".";
import * as cts from './constants';


/* Test jwt payload
{
  "sub": "1234567890",
  "username": "test",
  "iat": 1642884412,
  "exp": 1642888012
}*/

let test_access = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjQyODg0NDEyLCJleHAiOjE2NDI4ODgwMTJ9.IzKu_sREpLOgB5Wy51RmCIEdPAmlKpp6jXMdlxUpm0A";
let test_refresh = "test refresh";

let server = setupServer(
    rest.post(`${API_URL}/account/token`, (req, res, ctx)=>{
        return res(ctx.status(200),
            ctx.json({access: test_access, refresh: test_refresh}))
    })
)

beforeAll(()=> server.listen())
afterEach(()=> server.resetHandlers())
afterAll(()=> server.close())


it("should successfully logs in and redirects with valid credential", async() =>{
    render(<Provider store={store}>
            <Alert />
            <Router>
                <Routes>
                    <Route path="/" element={<LogInForm />} />
                    <Route path="/exchange" element={
                        <div>
                            Exchange
                        </div>
                    }/>
                </Routes>
            </Router>
            </Provider>);

    userEvent.type(screen.getByPlaceholderText(/email/ig),"testuser@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/password/ig),"testpassword");

    let button = screen.getByTestId("login");
    userEvent.click(button);

    await waitFor(()=>{
        expect(screen.queryByPlaceholderText(/email/ig)).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/password/ig)).not.toBeInTheDocument();
        expect(screen.queryByText("Exchange")).toBeInTheDocument();
        expect(store.getState().account.username).toBe("test");
        expect(store.getState().account.access).toBe(test_access);
        expect(store.getState().account.refresh).toBe(test_refresh);
    })

})


it("should render a fail alert and red borders with invalid credentials", async() =>{
    server.use(
        rest.post(`${API_URL}/account/token`,(req, res, ctx)=>{
            return res(ctx.status(401));
        })
    )

    render(<Provider store={store}>
                <Alert />
                <Router>
                    <LogInForm />
                </Router>
            </Provider>);

    userEvent.type(screen.getByPlaceholderText(/email/ig),"testuser@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/password/ig),"testpassword");

    let button = screen.getByTestId("login");
    userEvent.click(button);

    await waitFor(()=>{
        expect(screen.getByText(cts.INVALID_CREDENTIALS_MESSAGE)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/ig)).toHaveClass('ring-red-500');
        expect(screen.getByPlaceholderText(/password/ig)).toHaveClass('ring-red-500');
    })

})

