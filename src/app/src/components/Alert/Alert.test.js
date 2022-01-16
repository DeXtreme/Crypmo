import React from "react";
import {render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Alert from '.';


it('should render the header and message', ()=> {

    let header = "header";
    let message = "message";

    render(<Alert header={header} message={message} />);

    expect(screen.queryByText(header)).not.toBeNull();
    expect(screen.queryByText(message)).not.toBeNull();
})

it('should render the right icon', ()=>{
    
    let container = render(<Alert type={Alert.SUCCESS} />).container;
    
    let icon = container.querySelector("svg.text-green-500");
    expect(icon).not.toBeNull();

    container = render(<Alert type={Alert.WARNING} />).container;

    icon = container.querySelector("svg.text-yellow-500");
    expect(icon).not.toBeNull();

    container = render(<Alert type={Alert.FAIL} />).container;

    icon = container.querySelector("svg.text-red-500");
    expect(icon).not.toBeNull();

    container = render(<Alert type={Alert.INFO} />).container;

    icon = container.querySelector("svg.text-blue-500");
    expect(icon).not.toBeNull();
})
