import PropTypes from 'prop-types';
import { useEffect} from "react";
import { useSuccessAlert, useFailAlert } from '../../components/Alert';

import { verifyAccount } from "./services";

import * as cts from "./constants";

function VerifyAccount({verify_id}){
    let showSuccess = useSuccessAlert();
    let showFail = useFailAlert();

    useEffect(()=>{
        verifyAccount(verify_id).then(result =>{
            if(result){
                showSuccess(cts.ACCOUNT_VERIFICATION_SUCCESS_HEADER,
                    cts.ACCOUNT_VERIFICATION_SUCCESS_MESSAGE);
            }else{
                showFail(cts.ACCOUNT_VERIFICATION_FAIL_HEADER,
                    cts.ACCOUNT_VERIFICATION_FAIL_MESSAGE);
            }
        })
    }, [verify_id, showSuccess, showFail])


    return (
        <>
            {/*showAlert && 
            <Alert type={success ? Alert.SUCCESS : Alert.FAIL} 
            header={header} message={message} dismiss={dismiss} />*/}
        </>
    )
}

VerifyAccount.propTypes = {
    verify_id: PropTypes.string
}

export default VerifyAccount;