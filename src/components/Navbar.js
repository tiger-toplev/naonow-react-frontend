import React, { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { getUserInfo } from '../actions/user';
import Logo from "../assets/images/logo.svg";
import SettingImg from "../assets/images/setting_icon.svg";
import LogoutImg from "../assets/images/logout_icon.svg";
import MobileMenuIcon from "../assets/images/mobile-menu.svg";

const Navbar = () => {
  const history = useHistory();  
  const dispatch = useDispatch();
  const isShowSidebar = useSelector(state => state.settings.isShowSidebar);
  const user = useSelector(state => state.users.user);
  const user_role = user.roles && user.roles[0].role_name;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
	
	const handleLogout = () => {
    dispatch(logout());
		history.push('/')
	}

  const showSidebar = () => {
    if(isShowSidebar) {
      dispatch({type: 'HIDE_SIDEBAR'});
    } else {
      dispatch({type: 'SHOW_SIDEBAR'});
    }
  }

  const goToProfile = () => {
    if (user_role === "tutor") {
      history.push('/tutor/profile');
    } else if (user_role === "student") {
      history.push('/student/profile');
    }
  }

  return (
    <div className="nav-bar">
      <div className="desktop-version">
        <div className="left-part">
          <div className="logo">
            <Link to={'/dashboard'}>
              <img src={Logo} alt=""/>
            </Link>          
          </div>
          <p className="page-title">{user_role} DASHBOARD</p>
        </div>
        <div className="right-part">
          <input type="text" placeholder="Search Here..."/>
          <img src={SettingImg} alt="" className="settings" onClick={goToProfile}/>
          <img src={LogoutImg} alt="" onClick={() => handleLogout()}/>
        </div>
      </div>
      <div className="mobile-version">
        <div className="logo">
          <Link to={'/dashboard'}>
            <img src={Logo} alt=""/>
          </Link>          
        </div>
        <div className="mobile-menu">
          <img src={MobileMenuIcon} alt="" onClick={() => showSidebar()}/>
        </div>
      </div>     
    </div>
  );
}

export default Navbar;
