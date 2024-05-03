import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { emailVerify } from '../../actions/auth';
import AuthLayout from "../../components/AuthLayout";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [verified, setVerified] = useState(false);
  
  useEffect(() => {
    async function tokenVerify(token){
      
      let resp = await dispatch(emailVerify(token));
      
      if (resp.type === "AUTH_EMAIL_VERIFY_FAILURE") {
        setVerified(false);
        NotificationManager.error('Email Verification Failed', 'Failure');
        history.push('/signup');
      }

      if (resp.type === "AUTH_EMAIL_VERIFY_SUCCESS") {
        setVerified(true);
        NotificationManager.success('Email Verification Successed', 'Success');
        history.push('/');
      }
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    tokenVerify(token);
  
  }, [dispatch, history]);

  return (
    <AuthLayout>
      {!verified && <h4>Verifying Your Email...</h4>}
    </AuthLayout>
  )
}

export default VerifyEmail;