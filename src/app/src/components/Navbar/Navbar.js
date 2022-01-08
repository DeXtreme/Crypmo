import Logo from './logo.svg';

export function Navbar(props){
    return(
        <>
            <div className="container flex items-center px-14 py-4 fixed z-50">
                <div className="flex flex-row items-center gap-3 mr-32"> 
                    <img src={Logo} className="w-8 h-8" alt="logo"/>
                    <p className="font-medium text-accent">CRYPMO</p>
                </div>
                <div className="flex gap-10">
                    <a href="#" className="transition-colors hover:text-accent">Market</a>
                    <a href="#" className="transition-colors hover:text-accent">Trade</a>
                    <a href="#" className="transition-colors hover:text-accent">Wallet</a>
                </div>
                <div className="flex items-center gap-10 ml-auto">
                    <a href="#"className="hover:text-accent">Log In</a>
                    <a href="#" className="transition-colors bg-accent py-2 px-5 rounded-md text-sm hover:bg-white hover:text-accent">Register</a>
                </div>
            </div>
            <div id="mobile menu">

            </div>
        </>
    )
}