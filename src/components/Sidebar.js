import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import Icon1 from "../assets/images/sidebar/icon1.svg";
import Icon2 from "../assets/images/sidebar/icon2.svg";
import Icon3 from "../assets/images/sidebar/icon3.svg";
import Icon4 from "../assets/images/sidebar/icon4.svg";
import Icon5 from "../assets/images/sidebar/icon5.svg";
import ActiveIcon1 from "../assets/images/sidebar/active1.svg";
import ActiveIcon2 from "../assets/images/sidebar/active2.svg";
import ActiveIcon3 from "../assets/images/sidebar/active3.svg";
import ActiveIcon4 from "../assets/images/sidebar/active4.svg";
import ActiveIcon5 from "../assets/images/sidebar/active5.svg";
import CloseIcon from "../assets/images/close.svg";
import LogoutImg from "../assets/images/logout_icon.svg";

const tutorNavLinks = [
  {label: 'Manage Appointments ', link: '/tutor/manage-appointments', icon: Icon1, activeIcon: ActiveIcon1},
  {label: 'Appointment Calendar', link: '/tutor/appointments-calendar', icon: Icon2, activeIcon: ActiveIcon2},
  {label: 'Past Lessons', link: '/tutor/past-lessons', icon: Icon3, activeIcon: ActiveIcon3},
  {label: 'Student List', link: '/tutor/students', icon: Icon4, activeIcon: ActiveIcon4},
  {label: 'Messages', link: '/messages', icon: Icon5, activeIcon: ActiveIcon5},
];

const studentNavLinks = [
  {label: 'Manage Lessons ', link: '/student/manage-lessons', icon: Icon1, activeIcon: ActiveIcon1},
  {label: 'Lesson Calendar', link: '/student/lesson-calendar', icon: Icon2, activeIcon: ActiveIcon2},
  {label: 'Past Lessons', link: '/student/past-lessons', icon: Icon3, activeIcon: ActiveIcon3},
  {label: 'Messages', link: '/messages', icon: Icon5, activeIcon: ActiveIcon5},
]

const Sidebar = () => {
  let location = useLocation();
  const history = useHistory(); 
  const dispatch = useDispatch();
  const isShowSidebar = useSelector(state => state.settings.isShowSidebar);
  const user = useSelector(state => state.users.user);
  const user_role = user.roles && user.roles[0].role_name;

  tutorNavLinks.map(item => {
    item.is_selected = location.pathname.includes(item.link);
    return item;
  });

  studentNavLinks.map(item => {
    item.is_selected = location.pathname.includes(item.link);
    return item;
  });

  const [navLinks, setNavLinks] = useState();

  useEffect(() => {
    if (user_role === "tutor") {
      setNavLinks(tutorNavLinks);
    } else if (user_role === "student") {
      setNavLinks(studentNavLinks);
    }
  }, [user_role]);

  const handleLogout = () => {
    dispatch(logout());
		history.push('/')
	}

  const hideSidebar = () => {
    dispatch({type: 'HIDE_SIDEBAR'})
  }

  return (
    <>
      <div className="side-bar desktop-version">
        <h4 className="main-title">Navigation</h4>          
        <div className="divider"/>
        <div className="link-list">
          {
            navLinks && navLinks.map((item, index) => (
              <li className={`nav-item ${item.is_selected ? "active" : ""}`} key={index}>
                <Link to={item.link}>
                  <div className="icon">
                    <img src={item.activeIcon} alt="" className={item.is_selected ? "block" : "none"}/>                
                    <img src={item.icon} alt="" className={!item.is_selected ? "block" : "none"}/>                
                  </div>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))
          }
        </div>
      </div>
      {
        isShowSidebar ? 
          <div className="side-bar mobile-version">   
            <h4 className="main-title">Navigation</h4>
            <img src={CloseIcon} alt="" className="close-icon" onClick={() => hideSidebar()}/>
            <div className="divider"/>
            <div className="link-list">
              {
                navLinks &&  navLinks.map((item, index) => (
                  <li className={`nav-item ${item.is_selected ? "active" : ""}`} key={index}>
                    <Link to={item.link} onClick={() => hideSidebar()}>
                      <div className="icon">
                        <img src={item.activeIcon} alt="" className={item.is_selected ? "block" : "none"}/>                
                        <img src={item.icon} alt="" className={!item.is_selected ? "block" : "none"}/>                
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))
              }
              <li className="nav-item log-out" onClick={() => handleLogout()}>
                <div className="icon">
                  <img src={LogoutImg} alt=""/>
                </div>
                <span>Log out</span>
              </li>
            </div>      
          </div> : ""
      }      
    </>    
  )
}

export default Sidebar;
