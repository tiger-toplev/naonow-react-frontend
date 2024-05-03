import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { resetPassword } from '../../actions/auth';
import AuthLayout from "../../components/AuthLayout";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [token, setToken] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('token'));
  }, [token]);

  const loading = useSelector(state => state.auth.loading);
  const errorMsg = useSelector(state => state.auth.error);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => {
    if(!e.target.value) {
      setError('This field should not be empty.');
    } else {
      setError('');
    }
    setPassword(e.target.value);
  }

  const handleResetPassword = async () => {
    if (!password) {
      setError('This field should not be empty.');
      return false;
    }

    let resp = await dispatch(resetPassword(password, token));

    if(resp.type === "AUTH_RESET_PASSWORD_SUCCESS") {
			NotificationManager.success('Reset Password Success', 'Success');
			history.push('/');
		}

		if(resp.type === "AUTH_RESET_PASSWORD_FAILURE") {
			if(errorMsg) {
				NotificationManager.error('Reset Password Failure', errorMsg);
        history.push('/forgot-password');
			} 
		}
  }

  return (
    <AuthLayout>
      <div className="auth-forgot-password">
        <h4>RESET PASSWORD</h4>
        <div className="form-section">
          <div className="form-item">
            <div className="form-item-inner">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={password}							
                onChange={(e) => onChange(e)}
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
						{errorMsg && <p className="system-error-msg">{errorMsg}</p>}            
          </div>
        </div>
        <div className="submit-action">
          <button className="auth-button" onClick={handleResetPassword}>
            {
              loading ? <ClipLoader loading={loading} size={20} color="white"/> : 'Reset Password'
            }
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword;