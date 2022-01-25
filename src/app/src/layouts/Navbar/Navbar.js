import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {RiBarChart2Fill} from 'react-icons/ri';
import { FaWallet, FaChevronDown } from 'react-icons/fa';
import { MdSwapVert } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

import { useAccount } from '../../hooks';
import Logo from '../../img/logo.svg';


function Navbar({showMenu,fixed}){
    let {account, logout} = useAccount();
    let [showDropdown, setShowDropdown] = useState(false);

    let location = useLocation();
    let path = location.pathname;

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    

    return(
        <>
            <div className={`container flex items-center px-8 py-4 ${fixed ? 'fixed left-0 right-0': ""} z-50`}>
                <Link to="/">
                    <div className="flex flex-row items-center gap-3"> 
                        <img src={Logo} className="w-8 h-8" alt="logo"/>
                        <p className="font-bold text-accent hidden uppercase md:block">Crypmo</p>
                    </div>
                </Link>
                {showMenu && <>
                    <div className="fixed left-0 bottom-0 w-full bg-primary py-3 border-t-2 border-secondary
                    flex justify-around items-baseline text-gray-400">
                        <Link to="exchange/markets" className={`transition-colors hover:text-accent
                        ${(/\/exchange\/markets/ig.test(path)) && "text-accent"}`}>
                            <RiBarChart2Fill className='m-auto text-2xl'/>
                            Markets
                        </Link>
                        <Link to="exchange/trade" className={`transition-colors hover:text-accent
                        ${(/\/exchange\/trade/ig.test(path)) && "text-accent"}`}>
                            <MdSwapVert className='m-auto text-2xl' />
                            Trade
                        </Link>
                        <Link to="exchange/wallet" className={`transition-colors hover:text-accent
                        ${(/\/exchange\/wallet/ig.test(path)) && "text-accent"}`}>
                            <FaWallet className='m-auto text-2xl' />
                            Wallet
                        </Link>
                    </div>
                    { account.isLoggedIn ?
                    <div className="ml-auto relative">
                        <button onClick={toggleDropdown}>
                            <span>testuser@gmail.com</span>
                            <FaChevronDown className='inline-block ml-2 text-accent'/>
                        </button>
                        <div className={`bg-secondary text-right px-4 absolute
                        min-w-fit text-sm w-full right-0 rounded-lg transition-all overflow-y-hidden
                        ${showDropdown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                            <ul>
                                <li className='pb-4 mt-4'>
                                    <Link to="/account/logout" className="transition-colors hover:text-accent">
                                        Change password
                                    </Link>
                                </li>
                                <hr className='border-gray-600'></hr>
                                <li className='py-2 mb-4'>
                                    <button onClick={logout} className="transition-colors hover:text-accent">
                                        <BiLogOut className='inline-block mr-2 text-lg' />
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>:
                    <div className="flex items-center gap-6 ml-auto">
                        <Link to="login"className="hover:text-accent">Log In</Link>
                        <Link to="register" className="transition-colors bg-accent py-2 px-5 rounded-md text-sm hover:bg-white hover:text-accent">Register</Link>
                    </div>}
                </>}
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
