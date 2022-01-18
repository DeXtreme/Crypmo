import PropTypes from 'prop-types';
import { useEffect,useState } from "react";
import Alert from "../../components/Alert";

import { verifyAccount } from "./services";

import * as cts from "./constants";

function VerifyAccount({verify_id}){
    let [showAlert, setShowAlert] = useState(false);
    let [success, setSuccess] = useState(false);
    let [header, setHeader ] = useState(null);
    let [message, setMessage] = useState(null);

    useEffect(()=>{
        verifyAccount(verify_id).then(result =>{
            setHeader(result ? cts.ACCOUNT_VERIFICATION_SUCCESS_HEADER :
                cts.ACCOUNT_VERIFICATION_FAIL_HEADER);
            setMessage(result ? cts.ACCOUNT_VERIFICATION_SUCCESS_MESSAGE :
                 cts.ACCOUNT_VERIFICATION_FAIL_MESSAGE);

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

VerifyAccount.propTypes = {
    verify_id: PropTypes.string
}

export default VerifyAccount;