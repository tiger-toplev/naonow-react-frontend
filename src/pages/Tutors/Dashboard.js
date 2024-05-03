
import { Link } from 'react-router-dom';
import CustomTable from "../../components/CustomTable";
import SummaryCard from "../../components/SummaryCard";

import CalendarIcon from "../../assets/images/calendar.svg";
import CheckIcon from "../../assets/images/check.svg";
import ManIcon from "../../assets/images/man.svg";

const upcomingAppointments = [
  {id: 1, studentName: 'Student #1', lessonNumber: 'Lesson #2', lessonDate: '2/18/2021 10:30AM PT'},
  {id: 2, studentName: 'Student #6', lessonNumber: 'Lesson #1', lessonDate: '2/21/2021 11:15AM PT'},
  {id: 3, studentName: 'Student #4', lessonNumber: 'Lesson #5 ', lessonDate: '2/22/2021 10:50AM PT'},
  {id: 4, studentName: 'Student #9', lessonNumber: 'Lesson #3 ', lessonDate: '2/24/2021 02:30PM PT'},
];

const pastLessons = [
  {id: 1, studentName: 'Student #9', lessonNumber: 'Lesson #5', lessonDate: '2/16/2021 03:20PM PT'},
  {id: 2, studentName: 'Student #8', lessonNumber: 'Lesson #2', lessonDate: '2/15/2021 09:15AM PT'},
  {id: 3, studentName: 'Student #3', lessonNumber: 'Lesson #7', lessonDate: '2/13/2021 08:00AM PT'},
  {id: 4, studentName: 'Student #7', lessonNumber: 'Lesson #4 ', lessonDate: '2/10/2021 02:15PM PT'}
];

const TutorDashboard = () => {
  const tableHeaders = ['Student Name', 'Lesson Number', 'Lesson Date'];
  
  return (
    <div className="main-dashboard">
      <h4 className="main-title">Main Dashboard</h4>
      <div className="divider"/>
      <div className="summary-information">          
        <SummaryCard text="Upcoming Appointments" icon={CalendarIcon} number={16} />
        <SummaryCard text="Completed Lessons" icon={CheckIcon} number={12} />
        <SummaryCard text="Students Managed" icon={ManIcon} number={7} />                  
      </div>
      <div className="upcoming-appointments">
        <h4 className="main-title">Upcoming Appointments</h4>
        <div className="divider"/>
        <CustomTable data={upcomingAppointments} headers={tableHeaders}/>
        <div className="see-all-link">
          <Link to="/manage-appointments">See All</Link>
        </div>  
      </div>
      <div className="past-lessons">
        <h4 className="main-title">Past Lessons</h4>
        <div className="divider"/>
        <CustomTable data={pastLessons} headers={tableHeaders}/>
        <div className="see-all-link">
          <Link to="/past-lessons">See All</Link>
        </div> 
      </div>
    </div>
  )
}

export default TutorDashboard;