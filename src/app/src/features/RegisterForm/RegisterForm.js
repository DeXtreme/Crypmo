import { checkPropTypes } from 'prop-types';
import {FaEnvelope, FaLock, FaEyeSlash, FaArrowRight} from 'react-icons/fa';
export function RegisterForm(props){
    return (
        <div className={props?.className}>
            <form className="bg-secondary py-10 px-6 rounded-lg">
                <h1 className="font-medium text-4xl mb-2 text-accent">Create Your Account</h1>
                <h2 className=" mb-8 text-lg">Register with your email</h2>
                <div className="mb-8 w-11/12">
                    <p className="mb-2">Email</p>
                    <div className="relative">
                        <input type="email" className="bg-primary px-14 py-3.5 w-full rounded-lg"
                        placeholder="Enter your email address" required/>
                    <FaEnvelope className="text-accent absolute top-3.5 left-4 text-xl"/>
                    </div>
                </div>
                <div className="mb-16 w-11/12">
                    <p className="mb-2">Password</p>
                    <div className="relative">
                        <input type="password" className="bg-primary px-14 py-3.5 w-full rounded-lg"
                        placeholder="Enter your password" required />
                        <FaLock className="text-accent absolute top-3.5 left-4 text-xl"/>
                        <FaEyeSlash className="text-secondary absolute top-3.5 right-4 text-xl"/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="bg-accent rounded-lg px-16 py-4 mb-4">
                        <div className="flex items-center justify-center">
                            Create account<FaArrowRight className="inline-block ml-3"/>
                        </div>
                    </button>
                </div>
                <p>Already have an account? <a href="#" className="text-accent font-medium">Log In</a></p>
            </form>
        </div>
    );
}


/*
<form className="bg-secondary py-10 px-6 rounded-lg">
            <h1 className="font-medium text-3xl mb-1">Create Your Account</h1>
            <h2 className=" mb-8">Register with your email</h2>
            <div className="mb-4">
                <p className="mb-1">Email</p>
                <div className="relative">
                    <input type="email" className="bg-primary px-14 py-3"
                    placeholder="Enter your email address" required/>
                <FaEnvelope className="text-accent absolute top-3.5 left-4 text-xl"/>
                </div>
            </div>
            <div className="mb-10">
                <p className="mb-1">Password</p>
                <div className="relative">
                    <input type="password" className="bg-primary px-14 py-3"
                    placeholder="Enter your password" required />
                    <FaLock className="text-accent absolute top-3.5 left-4 text-xl"/>
                    <FaEyeSlash className="text-secondary absolute top-3.5 right-4 text-xl"/>
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="group bg-accent w-14 h-14 rounded-full transition-all overflow-hidden hover:w-full hover:rounded-lg">
                    <div className="flex items-center justify-center">
                        <span className="transition-all w-0 overflow-hidden group-hover:w-auto group-hover:mr-2">Continue</span>
                        <FaArrowRight className="inline-block"/>
                    </div>
                </button>
            </div>
        </form>
        */