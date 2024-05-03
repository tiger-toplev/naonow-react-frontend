import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import AuthLayout from "../../components/AuthLayout";
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const errorMsg = useSelector(state => state.auth.error);

	const validateEmail = (email) => {
		if (!email) {
			setError('This field should not be empty.');
			return false;
		} else {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const emailValid = re.test(email);
			if (!emailValid) {
				setError('Invalid e-mail address');
				return false;
			} else {
				setError('');
				return true;
			}
		}
	}

	const onChange = (e) => {
		validateEmail(e.target.value);
		setEmail(e.target.value);
	}

	const hanldeForgotPassword = async () => {
		validateEmail(email);

		let resp = await dispatch(forgotPassword(email));

		if(resp.type === "AUTH_FORGOT_PASSWORD_SUCCESS") {
			NotificationManager.success('Forgot Password Success', 'Success');
			history.push('/forgot-password-guide');
		}

		if(resp.type === "AUTH_FORGOT_PASSWORD_FAILURE") {
			if(errorMsg) {
				NotificationManager.error('Forgot Password Failure', errorMsg);
			} 
		}
	}

	return (
		<AuthLayout>
			<div className="auth-forgot-password">
				<h4>FORGOT PASSWORD</h4>
				<div className="form-section">
					<div className="form-item">
						<div className="form-item-inner">
							<label htmlFor="email">Email</label>
							<input 
								type="email" 
								id="email"
								name="email"
								value={email}							
								onChange={(e) => onChange(e)}
							/>
						</div>
						{error && <p className="error-msg">{error}</p>}
						{errorMsg && <p className="system-error-msg">{errorMsg}</p>}
					</div>					
          <div className="submit-action">
            <button className="auth-button" onClick={hanldeForgotPassword}>Reset Password</button>
          </div>					
          <p>Already have an account? <a href="/">Log in</a></p>
				</div>				
			</div>
		</AuthLayout>		
	)
}

export default ForgotPassword;

