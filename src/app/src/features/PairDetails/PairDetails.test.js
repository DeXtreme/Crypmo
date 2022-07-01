import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from 'msw/node';

import { API_URL } from "../../constants";
import { APISocketProvider } from "../../apisocket";
import { store } from "../../store";

import PairDetails from ".";
import PairDetailsSlice from './slices';


const pair = {id:1, name:"TestCoin", ticker: "TC", 
            blockchain:"TestChain", price: 1.23,
            volume: 300,change: 3}

const h1_price_history = [
    {time:"2022-02-03 00:00", open:2, high:3, low:1, close: 5},
    {time:"2022-02-03 01:00", open:5, high:6, low:4, close: 2},
    {time:"2022-02-03 02:00", open:2, high:3, low:1, close: 5},
    {time:"2022-02-03 03:00", open:5, high:6, low:4, close: 2},
    {time:"2022-02-03 04:00", open:2, high:3, low:1, close: 5}
]

const m1_price_history = [
    {time:"2022-02-03 00:00", open:2, high:3, low:1, close: 5},
    {time:"2022-02-03 00:01", open:5, high:6, low:4, close: 2},
    {time:"2022-02-03 00:02", open:2, high:3, low:1, close: 5},
    {time:"2022-02-03 00:03", open:5, high:6, low:4, close: 2},
    {time:"2022-02-03 00:04", open:2, high:3, low:1, close: 5}
]

const server = setupServer(
    rest.get(`${API_URL}/exchange/:ticker/`,(req, res, ctx)=>{
        return res(ctx.json(pair),ctx.status(200))
    }),
    rest.get(`${API_URL}/exchange/:ticker/candles/`,(req, res, ctx)=>{
        return res(ctx.json({interval:"h1", candles: h1_price_history}),ctx.status(200))
    })
) 


beforeAll(()=> server.listen())
afterEach(()=> {
    server.resetHandlers();
    let initalState = PairDetailsSlice.getInitialState()
    store.dispatch(PairDetailsSlice.actions.setPair(initalState.pair));
    store.dispatch(PairDetailsSlice.actions.setPair(initalState.interval));
    store.dispatch(PairDetailsSlice.actions.setCandles(initalState.candles));
})
afterAll(()=> server.close())

jest.mock("../../components/Chart",()=>()=><div/>);

it("loads the pair and price history", async ()=>{
    render(
        <Provider store={store}>
            <APISocketProvider>
                <PairDetails ticker={"TC"}/>
            </APISocketProvider>
        </Provider>
    )

    await waitFor(()=>{
        let data = store.getState().pairDetails;
        expect(data.pair).toEqual(pair);
        expect(data.interval).toEqual("h1");
        expect(data.candles).toEqual(h1_price_history);
    })
})

it("loads new data when the interval is changed", async()=>{
    
    render(
        <Provider store={store}>
            <APISocketProvider>
                <PairDetails ticker={"TC"}/>
            </APISocketProvider>
        </Provider>
    )

    await waitFor(()=>{
        let data = store.getState().pairDetails;
        expect(data.pair).toEqual(pair);
        expect(data.candles).toEqual(h1_price_history);
    })

    server.use(
        rest.get(`${API_URL}/exchange/:ticker/candles/`,(req, res, ctx)=>{
            return res(ctx.json({interval:"m1", candles: m1_price_history}),ctx.status(200));
        })
    )

    let m1_button = await screen.findByText(/m1/ig);
    userEvent.click(m1_button);
    
    await waitFor(()=>{
        let data = store.getState().pairDetails;
        expect(data.pair).toEqual(pair);
        expect(data.candles).toEqual(m1_price_history);
    })
})