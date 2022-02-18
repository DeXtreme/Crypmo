import React from "react";
import { Provider } from "react-redux";
import { waitFor, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { setupServer } from "msw/node";
import { rest } from "msw";

import {API_URL} from '../../constants';
import { store } from "../../store";
import Alert from "../../components/Alert";
import PairList from '.';

let pair = {id:1, name:"TestCoin", ticker: "TC", 
            blockchain:"TestChain", price: 1.23,
            volume: 300,change: 3}

let server = setupServer(
    rest.get(`${API_URL}/exchange`, (req, res, ctx)=>{
        return res(ctx.status(200),
            ctx.json([pair]));
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


it("renders the pair data", async ()=>{
    render(
        <Provider store={store}>
            <Alert />
            <PairList />
        </Provider>
    );
    const formatPrice = (value) => {
        return value.toLocaleString('en-US', 
            { minimumFractionDigits : 4}) 
    }

    const formatVolume = (value) => {
        return value.toLocaleString('en-US') 
    }

    const formatChange = (value) => {
        return value.toLocaleString('en-US', 
            { minimumFractionDigits : 2}) 
    }
    await waitFor(()=>{
        expect(screen.getByText(pair.ticker)).toBeInTheDocument();
        expect(screen.getByText(pair.blockchain)).toBeInTheDocument();
        expect(screen.getAllByText(formatPrice(pair.price))).not.toBeNull();
        expect(screen.getByText(formatVolume(pair.volume))).toBeInTheDocument();
        expect(screen.getByText(`+${formatChange(pair.change)}%`)).toBeInTheDocument();
    })
})