import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useState } from 'react';
import {object,string} from 'yup';
import {FaEnvelope, FaLock, FaEyeSlash, FaEye, FaArrowRight, FaRegEnvelope} from 'react-icons/fa';

import { register } from './services'
import { Link } from 'react-router-dom';

function RegisterForm(props){
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues : {
            email: "",
            password: ""
        },
        validationSchema: object({
            email: string().email("Please enter a valid email address")
                           .required("Please enter your email address"),
            password: string().min(8,"Password should be 8 characters or longer")
                              .matches(/[A-Z]/g,"Password should contain at least one uppercase letter")
                              .matches(/[0-9]/g,"Password should contain at least one number")
                              .required("Please enter your password")
        }),
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            let result = await register({email:values.email,
                                         password:values.password})

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
                
                <div className="mb-4 w-11/12">
                    <p className="mb-2">Email</p>
                    <div className="relative">
                        <input type="email" {...formik.getFieldProps("email")}
                        className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                        ${formik.errors.email && formik.touched.email && "ring-1 ring-red-600 rounded-lg accent-red-600"}
                        transition-all disabled:brightness-75`}
                        placeholder="Enter your email address" required disabled={formik.isSubmitting}/>
                        
                        <FaEnvelope className="text-accent absolute top-3.5 left-4 text-xl"/>
                    </div>
                    {formik.errors.email && formik.touched.email && 
                     <p className="my-1 text-red-600 text-sm">{formik.errors.email}</p>}
                </div>
                
                <div className="mb-16 w-11/12">
                    <p className="mb-2">Password</p>
                    <div className="relative">
                        <input type={isPasswordVisible ? "text" : "password"} {...formik.getFieldProps("password")} 
                        className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                        ${formik.errors.password && formik.touched.password && "ring-1 ring-red-600 rounded-lg accent-red-600"}
                        transition-all disabled:brightness-75`}
                        placeholder="Enter your password" required disabled={formik.isSubmitting}/>
                        
                        <FaLock className="text-accent absolute top-3.5 left-4 text-xl"/>
                        {isPasswordVisible ? <FaEye onClick={handleVisible} className="text-gray-500 absolute top-3.5 right-4 text-xl cursor-pointer"/> :
                            <FaEyeSlash onClick={handleVisible} className="text-gray-500 absolute top-3.5 right-4 text-xl cursor-pointer"/>}
                        
                        {formik.errors.password && formik.touched.password &&
                        <p className="my-1 text-red-600 text-sm">{formik.errors.password}</p>}
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
                <p>Already have an account? <Link to="login" className="text-accent font-medium">Log In</Link></p>
            </form>:
            <div>
                <h1 className="text-4xl font-medium"><FaRegEnvelope className="inline-block text-accent mr-5 text-6xl"/> Verify your account</h1>
                <p className="mt-5">Congratulations, you're almost done. Before being able to use your account
                   you need to verify your account by clicking the link that been sent to your email address.</p>
                <Link className="text-accent mt-4 inline-block" to="login">Log In</Link>
            </div>}
        </div>
    );
}

RegisterForm.propTypes = {
    className: PropTypes.string
}

export default RegisterForm;
