import PropTypes from 'prop-types';
import { useEffect} from "react";
import { useAlert} from '../../components/Alert';
import { useAPI } from '../../hooks';
import { handleResponse } from "./utils";

import * as cts from "./constants";

function VerifyAccount({verify_id}){
    let {showSuccessAlert,showFailAlert} = useAlert();
    let api = useAPI();

    useEffect(()=>{
        (async ()=>{
            let result = await api.get(`account/verify/${verify_id}`, handleResponse);   
            if(result){
                showSuccessAlert(cts.ACCOUNT_VERIFICATION_SUCCESS_HEADER,
                    cts.ACCOUNT_VERIFICATION_SUCCESS_MESSAGE);
            }else{
                showFailAlert(cts.ACCOUNT_VERIFICATION_FAIL_HEADER,
                    cts.ACCOUNT_VERIFICATION_FAIL_MESSAGE);
            }
        })();
    }, [api,verify_id, showSuccessAlert, showFailAlert])


    return (<></>);
}

VerifyAccount.propTypes = {
    verify_id: PropTypes.string
}

export default VerifyAccount;