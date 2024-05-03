import React, { useEffect } from "react";
import { getUserInfo } from '../actions/user';
import Layout from "../components/Layout";
import '../assets/styles/dashboard.scss';
import { useDispatch, useSelector } from "react-redux";
import TutorDashboard from "../pages/Tutors/Dashboard";
import StudentsDashboard from "../pages/Students/Dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const user_role = user.roles && user.roles[0].role_name;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  
  return (
    <Layout>
      {user_role === "tutor" && <TutorDashboard />}
      {user_role === "student" && <StudentsDashboard />}
    </Layout>    
  )
}

export default Dashboard;
