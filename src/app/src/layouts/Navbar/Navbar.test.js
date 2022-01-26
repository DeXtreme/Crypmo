import React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router} from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import { useAccount } from "../../hooks";
import { store } from '../../store';
import Navbar from "./Navbar";

let test_username = "test@gmail.com";

it("shows the account username when logged in",async ()=>{
    function TestLoggedInComponent(){
        let {login} = useAccount();
        
        useEffect(()=>login({username:test_username}),[]);

        return(
            <>
                <Navbar />
            </>
        )
    }

    render(
        <Provider store={store}>
            <Router>
               <TestLoggedInComponent />
            </Router>
        </Provider>)

    await waitFor(()=>{
        expect(screen.getByText(test_username)).toBeInTheDocument();
    })
})

it("logs out the user when log out is clicked", async ()=>{

    function TestLogoutComponent(){
        let {login} = useAccount();
        
        useEffect(()=>login({username:test_username}),[]);

        return(
            <></>
        )
    }

    render(
        <Provider store={store}>
            <Router>
                <Navbar />
               <TestLogoutComponent />
            </Router>
        </Provider>)

    userEvent.click(screen.getByText(/Log out/ig))
    
    await waitFor(()=>{
        expect(store.getState().account.isLoggedIn).toBe(false);
        expect(screen.queryByText(test_username)).not.toBeInTheDocument();
        expect(screen.getByTestId("login")).toBeInTheDocument();
        expect(screen.getByTestId("register")).toBeInTheDocument();
    }) 
})