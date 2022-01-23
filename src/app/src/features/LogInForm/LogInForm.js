import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock} from 'react-icons/fa';
import { useFailAlert } from '../../components/Alert';
import { useAPI } from '../../hooks';

import { login } from './services';
import * as cts from './constants';


function LogInForm({className}){
    let api = useAPI();
    let goTo = useNavigate();
    let showFail = useFailAlert();
    let formik = useFormik({
        initialValues : {
            username: '',
            password: '',
        },
        validate(values){
            const errors = {};
            if(!values.username){
                errors.username = "required";
            }

            if(!values.password){
                errors.password = "required";
            }
            return errors;
        },
        onSubmit: async (values, {setSubmitting, setErrors}) =>{
            let result = await api.post("account/token",
                {username:values.username,
                password: values.password},
                login);
            
            if(result){
                goTo('/exchange');
            }else{
                showFail(cts.INVALID_CREDENTIALS_HEADER,
                    cts.INVALID_CREDENTIALS_MESSAGE);
                setErrors({username:"Invalid", password:"Invalid"});
                setSubmitting(false);
            }       
        },
        validateOnBlur: false,
    });

    return (
        <div className={className}>
            <form className='text-center px-4' onSubmit={formik.handleSubmit}>
                <h1 className='text-2xl mb-8 font-bold'>Log In</h1>
                <div className='relative mb-4'>
                    <input className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                    ${formik.errors.username && formik.touched.username && 
                      "ring-1 ring-red-500 rounded-lg accent-red-500"}
                    transition-all disabled:brightness-75`} placeholder='Email'  type="email"
                    {...formik.getFieldProps("username")} required disabled={formik.isSubmitting}/>
                    <FaEnvelope className="text-accent absolute top-4 left-4 text-xl"/>
                </div>
                <div className='relative mb-12'>
                    <input className={`bg-secondary px-14 py-3.5 w-full rounded-lg
                    ${formik.errors.password && formik.touched.password && 
                      "ring-1 ring-red-500 rounded-lg accent-red-500"}
                    transition-all disabled:brightness-75`} placeholder='Password' type="password"
                    {...formik.getFieldProps("password")} required disabled={formik.isSubmitting}/>
                    <FaLock className="text-accent absolute top-4 left-4 text-xl"/>
                </div>
                <button data-testid="login" className="bg-accent rounded-lg px-16 py-4 transition-all hover:bg-white
                hover:text-accent disabled:brightness-75 disabled:hover:bg-accent 
                disabled:hover:text-white mb-4 w-full" type='submit'>Log In</button>
                    <Link className='text-accent font-medium block text-left mb-12' to="/register">Forgot Password?</Link>
                    <p>Don't have account? <Link className='text-accent font-medium' to="/register">Register</Link></p>
                
            </form>
        </div>
    );
}

LogInForm.propTypes = {
    className : PropTypes.string
}

export default LogInForm;

