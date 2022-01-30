import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useState } from 'react';

import { FaEnvelope, FaArrowRight, FaRegEnvelope} from 'react-icons/fa';

import { useAPI } from '../../hooks';

import * as cts from './constants';
import {handleResponse} from './utils';

function ForgotForm({className}){
    let [ isSuccess, setSuccess ] = useState(false);
    let api = useAPI();
    
    const formik = useFormik({
        initialValues : {
            email: ""
        },
        validate(values){
            const errors = {};

            try {
                if(!values.email) throw cts.EMAIL_REQUIRED_MESSAGE;
                if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)){
                    throw cts.INVALID_EMAIL_MESSAGE;
                }
            }catch(e){
                errors.email = e;
            }

            return errors;
        },
        onSubmit(values, {setSubmitting}){
            let {email} = values;
            let result = api.post("account/forgot",{email},handleResponse);
            if(result){
                setSuccess(true);
            }
            setSubmitting(false);
        }
    });

    return(
        <div className={className}>
                { !isSuccess ?
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='font-medium text-4xl mb-2 text-accent'>Forgot password?</h1>
                    <h2 className='mb-8 text-lg'>Reset your password with your email</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 inline-block">Email</label>
                        <div className="relative">
                            <input id="email" type="email" {...formik.getFieldProps("email")}
                            className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                            ${formik.errors.email && formik.touched.email && "ring-1 ring-red-500 rounded-lg accent-red-500"}
                            transition-all disabled:brightness-75`}
                            placeholder="Enter your email address" required disabled={formik.isSubmitting}/>
                            
                            <FaEnvelope className="text-accent absolute top-4 left-4 text-xl"/>
                        </div>
                        {formik.errors.email && formik.touched.email && 
                        <p className="my-1 text-red-600 text-sm">{formik.errors.email}</p>}
                    </div>
                    <div>
                        <button type="submit" className="bg-accent rounded-lg px-16 py-4 mb-4 transition-all hover:bg-white hover:text-accent
                        disabled:brightness-75 disabled:hover:bg-accent disabled:hover:text-white" disabled={formik.isSubmitting}>
                        <div className="flex items-center justify-center">
                            Reset password<FaArrowRight className="inline-block ml-4"/>
                        </div>
                    </button>
                    </div>
                </form>:
                <div className='text-center md:text-left'>
                    <div className='flex flex-col items-center md:flex-row md:items-center
                    md:justify-start md:gap-4'>
                        <FaRegEnvelope className="text-accent text-6xl"/>
                        <h1 className="text-3xl font-medium">{cts.SUCCESS_HEADER}</h1>
                    </div>
                    <p className="mt-5">{cts.SUCCESS_MESSAGE}</p>
                </div>}
        </div>
    )
}

ForgotForm.propTypes = {
    className: PropTypes.string
}

export default ForgotForm;

