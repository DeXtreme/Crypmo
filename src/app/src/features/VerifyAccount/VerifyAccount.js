import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useAlert} from '../../components/Alert';
import { useAPI } from '../../hooks';
import { handleResponse } from "./utils";

import Loading from '../../components/loading/Loading';
import * as cts from "./constants";

function VerifyAccount({verify_id}){
    let {showSuccessAlert,showFailAlert} = useAlert();
    let [loading, setLoading] = useState(true);
    let api = useAPI();

    useEffect(()=>{
        let mounted = true;
        (async ()=>{
            let result = await api.get(`account/verify/${verify_id}/`, handleResponse);   
            if(result){
                showSuccessAlert(cts.SUCCESS_HEADER,
                    cts.SUCCESS_MESSAGE);
            }else{
                showFailAlert(cts.FAIL_HEADER,
                    cts.FAIL_MESSAGE);
            }
            
            mounted && setLoading(false);
        })();

        return ()=> mounted = false;
    }, [api,verify_id, showSuccessAlert, showFailAlert])


    return (
        <>
            {loading && 
            <div className='bg-primary w-full h-full fixed left-0 
            top-0 flex items-center justify-center z-10'>
                <Loading />
            </div>}
        </>);
}

VerifyAccount.propTypes = {
    verify_id: PropTypes.string
}

export default VerifyAccount;