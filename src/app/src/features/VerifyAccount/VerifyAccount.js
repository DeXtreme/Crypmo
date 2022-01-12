import PropTypes from 'prop-types';
import { useEffect,useState } from "react";
import Alert from "../../components/Alert/Alert";

import { verifyAccount } from "./services";

import { ACCOUNT_VERIFICATION_SUCCESS_HEADER,
         ACCOUNT_VERIFICATION_SUCCESS_MESSAGE,
         ACCOUNT_VERIFICATION_FAIL_HEADER,
         ACCOUNT_VERIFICATION_FAIL_MESSAGE } from "./constants";

function Verify({verify_id}){
    let [showAlert, setShowAlert] = useState(false);
    let [success, setSuccess] = useState(false);
    let [header, setHeader ] = useState(null);
    let [message, setMessage] = useState(null);

    useEffect(()=>{
        verifyAccount(verify_id).then(result =>{
            setHeader(result ? ACCOUNT_VERIFICATION_SUCCESS_HEADER: ACCOUNT_VERIFICATION_FAIL_HEADER);
            setMessage(result ? ACCOUNT_VERIFICATION_SUCCESS_MESSAGE: ACCOUNT_VERIFICATION_FAIL_MESSAGE);
            setSuccess(result);
            setShowAlert(true);
        })
    }, [])

    let dismiss = () => setShowAlert(false);

    return (
        <>
            {showAlert && 
            <Alert type={success ? Alert.SUCCESS : Alert.FAIL} 
            header={header} message={message} dismiss={dismiss} />}
        </>
    )
}

Verify.propTypes = {
    verify_id: PropTypes.string
}

export default Verify;