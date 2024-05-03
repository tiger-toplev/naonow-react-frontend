import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider, useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import configureStore from "./store";

import 'react-notifications/lib/notifications.css';
import "./assets/styles/global.scss";

// Authentication Path
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ForgotPasswordText from "./pages/Auth/ForgotPasswordText";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import EmailVerifyText from "./pages/Auth/EmailVerifyText";

// Common Dashboard
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";

// Tutor Path
import TutorAppointments from "./pages/Tutors/Appointments";
import TutorCalendar from "./pages/Tutors/Calendar";
import TutorPastLessons from "./pages/Tutors/PastLessons";
import TutorStudentList from "./pages/Tutors/StudentList";
import TutorStudentProfile from "./pages/Tutors/StudentProfile";
import TutorProfile from "./pages/Tutors/Profile";
import TutorProfileUpdate from "./pages/Tutors/Profile/update";

// Student Path
import StudentsLessons from "./pages/Students/Lessons";
import StudentCalendar from "./pages/Students/Calendar";
import StudentPastLessons from "./pages/Students/PastLessons";
import StudentProfile from "./pages/Students/Profile";
import StudentProfileUpdate from "./pages/Students/Profile/update";


const store = configureStore({});

function PrivateRoute({ component: Component, ...rest }) {  
  const authed = useSelector(state => state.auth.authenticated);

  return(
    <Route
      {...rest}
      render={props => (
        authed
          ? <Component {...props} />
          : <Redirect to="/" />
      )}
    />
  );
}

function PublicRoute({ component: Component, ...rest}) {
  const authed = useSelector(state => state.auth.authenticated);

  return(
    <Route
      {...rest}
      render={props => (
        authed
          ? <Redirect to={`/dashboard`} />
          : <Component {...props} />
      )}
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NotificationContainer />
        <div className="App">
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PublicRoute path="/forgot-password-guide" component={ForgotPasswordText} />
          <PublicRoute path="/reset-password" component={ResetPassword} />        
          <PublicRoute path="/verify-email" component={VerifyEmail} />
          <PublicRoute path="/email-verify-guide" component={EmailVerifyText} />

          <PrivateRoute path="/dashboard" component={Dashboard} />      
          
          <PrivateRoute path="/student/manage-lessons" component={StudentsLessons} />
          <PrivateRoute path="/student/lesson-calendar" component={StudentCalendar} />
          <PrivateRoute path="/student/past-lessons" component={StudentPastLessons} />
          <PrivateRoute exact path="/student/profile" component={StudentProfile} />
          <PrivateRoute path="/student/profile/update" component={StudentProfileUpdate} />
          
          <PrivateRoute path="/tutor/manage-appointments" component={TutorAppointments} />        
          <PrivateRoute path="/tutor/appointments-calendar" component={TutorCalendar} />
          <PrivateRoute path="/tutor/past-lessons" component={TutorPastLessons} />
          <PrivateRoute exact path="/tutor/students" component={TutorStudentList} />
          <PrivateRoute path="/tutor/students/:id" component={TutorStudentProfile} />
          <PrivateRoute exact path="/tutor/profile" component={TutorProfile} />
          <PrivateRoute path="/tutor/profile/update" component={TutorProfileUpdate} />
          
          <PrivateRoute path="/messages" component={Messages} />
        </div>
      </Router>
    </Provider>    
  );
}

export default App;
