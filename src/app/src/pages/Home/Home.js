import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar/Navbar";

import './home.css';

export default function Home(props){
    let isLoggedIn = useSelector(state => state.account.isLoggedIn);

    return (
        <>
            <Navbar />
            <div>
                <div id="hero">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl mb-10 md:text-6xl md:mb-3">Buy &amp; Sell Crypto In Seconds</h1>
                        <h3 className="text-xl font-normal mb-10 leading-tight">Deposit and withdraw with mobile money</h3>
                        { isLoggedIn ?
                        <div>
                            <Link to="/exchange/trade" className="z-10 bg-accent rounded-lg px-16 py-4 
                            hover:bg-white hover:text-accent transition-colors ">Go to Exchange</Link>
                        </div>:
                        <div>
                            <Link to="register" className="z-10 bg-accent rounded-lg px-16 py-4 
                            hover:bg-white hover:text-accent transition-colors ">Register Now</Link>
                        </div>
                        }
                    </div>
                    <a href='https://www.freepik.com/vectors/background' className="absolute text-secondary text-xs right-0 bottom-0 z-0">Background vector created by starline - www.freepik.com</a>
                </div>
                <div id="buttons">

                </div>
                <div id="pairs">

                </div>
            </div>
        </>
    )
}