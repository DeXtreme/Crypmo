import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';


function Navbar({showMenu,fixed}){
    return(
        <>
            <div className={`container flex items-center px-14 py-4 ${fixed ? 'fixed': ""} z-50`}>
                <Link to="/" className="mr-32">
                    <div className="flex flex-row items-center gap-3"> 
                        <img src={Logo} className="w-8 h-8" alt="logo"/>
                        <p className="font-medium text-accent">CRYPMO</p>
                    </div>
                </Link>
                {showMenu && <>
                    <div className="flex gap-10">
                        <a href="market" className="transition-colors hover:text-accent">Market</a>
                        <a href="trade" className="transition-colors hover:text-accent">Trade</a>
                        <a href="wallet" className="transition-colors hover:text-accent">Wallet</a>
                    </div>
                    <div className="flex items-center gap-10 ml-auto">
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