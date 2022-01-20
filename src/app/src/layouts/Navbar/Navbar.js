import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {RiBarChart2Fill} from 'react-icons/ri';
import { FaWallet } from 'react-icons/fa';
import { MdSwapVert } from 'react-icons/md';

import './Navbar.css';
import Logo from './logo.svg';


function Navbar({showMenu,fixed}){
    return(
        <>
            <div className={`container flex items-center px-8 py-4 ${fixed ? 'fixed left-0 right-0': ""} z-50`}>
                <Link to="/">
                    <div className="flex flex-row items-center gap-3"> 
                        <img src={Logo} className="w-8 h-8" alt="logo"/>
                        <p className="font-medium text-accent invisible md:visible">CRYPMO</p>
                    </div>
                </Link>
                {showMenu && <>
                    <div className="fixed left-0 bottom-0 w-full bg-primary py-3 border-t-2 border-secondary
                    flex justify-evenly items-baseline text-gray-400">
                        <Link to="exchange/market" className="transition-colors hover:text-accent">
                            <RiBarChart2Fill className='m-auto text-2xl'/>Markets</Link>
                        <Link to="exchange/trades" className="transition-colors hover:text-accent">
                            <MdSwapVert className='m-auto text-2xl' />
                            Trade</Link>
                        <Link to="exchange/wallet" className="transition-colors hover:text-accent">
                            <FaWallet className='m-auto text-2xl' />
                            Wallet</Link>
                    </div>
                    {/*check store for user and render account dropdown*/}
                    <div className="flex items-center gap-6 ml-auto">
                        <Link to="login"className="hover:text-accent">Log In</Link>
                        <Link to="register" className="transition-colors bg-accent py-2 px-5 rounded-md text-sm hover:bg-white hover:text-accent">Register</Link>
                    </div>
                </>}
            </div>
            <div id="mobile menu">

            </div>
        </>
    )
}

Navbar.propTypes = {
    showMenu: PropTypes.bool,
    fixed: PropTypes.bool
}

Navbar.defaultProps = {
    showMenu: true,
    fixed: true
}

export default Navbar;
