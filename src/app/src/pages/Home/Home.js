import { Navbar } from "../../components/Navbar/Navbar";

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
                            <a href="#" className="z-10 text-xl bg-accent py-3 px-16 rounded-xl hover:bg-white hover:text-accent">Register Now</a>
                        </div>
                    </div>
                </div>
                <div id="buttons">

                </div>
                <div id="pairs">

                </div>
            </div>
        </>
    )
}