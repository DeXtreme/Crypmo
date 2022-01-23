import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useState } from 'react';
import {FaEnvelope, FaLock, FaEyeSlash,
    FaEye, FaArrowRight, FaRegEnvelope, FaCheckCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { register } from './services'
import { useAPI } from '../../hooks';

import * as cts from './constants';

function RegisterForm(props){
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);

    // Track password validation state
    const [hasUpper, setHasUpper] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasMinChar, setHasMinChar] = useState(false);

    const api = useAPI();

    const formik = useFormik({
        initialValues : {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors = {};

            try {
                if(!values.email) throw cts.EMAIL_REQUIRED_MESSAGE;
                if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)){
                    throw cts.INVALID_EMAIL_MESSAGE;
                }
                setEmailValid(true);
            }catch(e){
                errors.email = e;
                setEmailValid(false);
            }

            try{
                if(!values.password) throw cts.PASSWORD_REQUIRED_MESSAGE;

                // Run all three validations and track the result
                let errors = []
                if(values.password.length < 8){
                    setHasMinChar(false);
                    errors.push(cts.INVALID_PASSOWORD_LENGTH_MESSAGE);
                }else{
                    setHasMinChar(true);
                }

                if(!/[A-Z]/g.test(values.password)){
                    setHasUpper(false);
                    errors.push(cts.INVALID_PASSWORD_UPPERCASE_MESSAGE);
                }else{
                    setHasUpper(true);
                }

                if(!/[0-9]/g.test(values.password)){
                    setHasNumber(false);
                    errors.push(cts.INVALID_PASSWORD_NUMBER_MESSAGE);
                }else{
                    setHasNumber(true);
                }
                // Throw the first error for display
                if(errors.length) throw errors[0];
                setPasswordValid(true)
            }catch(e){
                errors.password = e;
                setPasswordValid(false);
            }

            return errors;
        },

        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            let result = await api.post("account",
                                {email: values.email,password: values.password},
                                register);
            register()

            if(result.success){
                setSuccess(true);
            }else if(result.errors){   
                Object.keys(result.errors).map(x=> setFieldError(x, result.errors[x][0]))
            }

            setSubmitting(false);
        }
    })

    const handleVisible = () => setPasswordVisible(prev => !prev)

    return (
        <div className={props?.className}>
           
            {!isSuccess ? <form className=" py-10 px-6 rounded-lg relative" onSubmit={formik.handleSubmit}>
                
                <h1 className="font-medium text-4xl mb-2 text-accent">Create Your Account</h1>
                <h2 className=" mb-8 text-lg">Register with your email</h2>
                
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 inline-block">Email</label>
                    <div className="relative">
                        <input id="email" type="email" {...formik.getFieldProps("email")}
                        className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                        ${formik.errors.email && formik.touched.email && "ring-1 ring-red-500 rounded-lg accent-red-500"}
                        transition-all disabled:brightness-75`}
                        placeholder="Enter your email address" required disabled={formik.isSubmitting}/>
                        
                        <FaEnvelope className="text-accent absolute top-4 left-4 text-xl"/>
                        <FaCheckCircle data-testid="email-valid" className={`${isEmailValid ? "text-green-500":"text-gray-600"} 
                        absolute top-4 right-4 text-xl`}/>
                    </div>
                    {formik.errors.email && formik.touched.email && 
                     <p className="my-1 text-red-600 text-sm">{formik.errors.email}</p>}
                </div>
                
                <div className="mb-16">
                    <label htmlFor="password" className="mb-2 inline-block">Password</label>
                    <div className="relative">
                        <input type={isPasswordVisible ? "text" : "password"} {...formik.getFieldProps("password")} 
                        className={`peer bg-secondary pl-14 pr-20 py-3.5 w-full rounded-lg
                        ${formik.errors.password && formik.touched.password && "ring-1 ring-red-500 rounded-lg accent-red-500"}
                        transition-all disabled:brightness-75`}
                        placeholder="Enter your password" required disabled={formik.isSubmitting}/>
                        
                        <FaLock className="text-accent absolute top-4 left-4 text-xl"/>
                        {
                            isPasswordVisible ? 
                            <FaEye onClick={handleVisible} className="text-gray-500 absolute top-4 
                            right-12 text-xl cursor-pointer"/> :
                            <FaEyeSlash onClick={handleVisible} className="text-gray-500 absolute top-4 
                            right-12 text-xl cursor-pointer"/>
                        }
                        
                        <FaCheckCircle data-testid="password-valid" className={`${isPasswordValid ? "text-green-500":"text-gray-600"}
                         absolute top-4 right-4 text-xl`} />

                        {formik.errors.password && formik.touched.password &&
                        <p className="my-1 text-red-600 text-sm">{formik.errors.password}</p>}

                        {!isPasswordValid && <ul className='bg-secondary text-white p-4 mt-1 rounded-md right-0 
                        absolute invisible peer-focus:visible'>
                            <li className='flex items-center mb-1'>
                                <FaCheckCircle data-testid="min-chars" className={`${hasMinChar? "text-green-500":"text-gray-600"} 
                                inline-block text-xl mr-2`}/> At least 8 characters
                            </li>

                            <li className='flex items-center mb-1'>
                                <FaCheckCircle data-testid="has-upper" className={`${hasUpper? "text-green-500":"text-gray-600"} 
                                inline-block text-xl mr-2`}/> Has uppercase letters
                            </li>

                            <li className='flex items-center mb-1'>
                                <FaCheckCircle data-testid="has-number" className={`${hasNumber? "text-green-500":"text-gray-600"} 
                                inline-block text-xl mr-2`}/> Has numbers
                            </li>
                            
                        </ul>}
                    </div>

                </div>
                <div>
                    <button type="submit" className="bg-accent rounded-lg px-16 py-4 mb-4 transition-all hover:bg-white hover:text-accent
                    disabled:brightness-75 disabled:hover:bg-accent disabled:hover:text-white" disabled={formik.isSubmitting}>
                        <div className="flex items-center justify-center">
                            Create account<FaArrowRight className="inline-block ml-3"/>
                        </div>
                    </button>
                </div>
                <p>Already have an account? <Link to="/login" className="text-accent font-medium">Log In</Link></p>
            </form>:
            <div>
                <h1 className="text-4xl font-medium"><FaRegEnvelope className="inline-block text-accent mr-5 text-6xl"/>{cts.SUCCESS_HEADER}</h1>
                <p className="mt-5">{cts.SUCCESS_MESSAGE}</p>
                <Link className="text-accent mt-4 inline-block" to="/login">Log In</Link>
            </div>}
        </div>
    );
}

RegisterForm.propTypes = {
    className: PropTypes.string
}

export default RegisterForm;