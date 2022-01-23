import React from "react";
import { Provider } from 'react-redux';
import {render, waitFor, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { store } from '../../store';
import { useSuccessAlert,
         useFailAlert,
         useInfoAlert,
         useWarningAlert } from '.';

import Alert from '.';


let header = "header";
let message = "message"

it('should render the success alert box',async()=>{

    function TestUseSuccessAlertComponent(){
        let showSuccess = useSuccessAlert();
        showSuccess(header,message);
    
        return (
            <></>
        )
    }

    render(<Provider store={store}>
                <Alert />
                <TestUseSuccessAlertComponent />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByTestId("icon")).toHaveClass("text-green-500");
        expect(screen.getByText(header)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
})


it('should render the fail alert box', async()=>{

    function TestUseFailAlertComponent(){
        let showFail = useFailAlert();
        showFail(header,message);
        return (
            <></>
        )
    }
    
    render(<Provider store={store}>
                <Alert />
                <TestUseFailAlertComponent />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByTestId("icon")).toHaveClass("text-red-500");
        expect(screen.getByText(header)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
})

it('should render the warning alert box', async()=>{

    function TestUseWarningAlertComponent(){
        let showWarning = useWarningAlert();
        showWarning(header,message);
        return (
            <></>
        )
    }
    
    render(<Provider store={store}>
                <Alert />
                <TestUseWarningAlertComponent />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByTestId("icon")).toHaveClass("text-yellow-500");
        expect(screen.getByText(header)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
})

it('should render the info alert box', async()=>{

    function TestUseInfoAlertComponent(){
        let showInfo = useInfoAlert();
        showInfo(header,message);
        return (
            <></>
        )
    }
    
    render(<Provider store={store}>
                <Alert />
                <TestUseInfoAlertComponent />
           </Provider>)

    await waitFor(()=>{
        expect(screen.getByTestId("icon")).toHaveClass("text-blue-500");
        expect(screen.getByText(header)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
})

it('should dimiss alert box when dismiss is clicked', async()=>{

    function TestUseInfoAlertComponent(){
        let showInfo = useInfoAlert();
        showInfo(header,message);
        return (
            <></>
        )
    }
    
    render(<Provider store={store}>
                <Alert />
                <TestUseInfoAlertComponent />
           </Provider>)

    let dismiss = await screen.findByTestId("dismiss");
    userEvent.click(dismiss);
        
    await waitFor(()=>{
        expect(screen.queryByText(header)).not.toBeInTheDocument();
    });
})
