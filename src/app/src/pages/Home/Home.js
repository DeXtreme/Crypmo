import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar/Navbar";

import './home.css';

export function Home(props){
    return (
        <>
            <Navbar />
            <div>
                <div id="hero">
                    <div>
                        <h1 className="text-6xl mb-3">Buy &amp; Sell Crypto In Seconds</h1>
                        <h3 className="text-lg font-thin mb-10">Deposit and withdraw with mobile money</h3>
                        <div>
                            <Link to="register" className="z-10 bg-accent rounded-lg px-16 py-4 hover:bg-white hover:text-accent transition-colors">Register Now</Link>
                        </div>
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