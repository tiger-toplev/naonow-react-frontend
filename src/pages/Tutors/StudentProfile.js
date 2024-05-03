import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";
import UploadImageModal from "../../components/UploadImageModal";
import "../../assets/styles/profile.scss";
import UploadIcon from "../../assets/images/upload.svg";
import StudentImg from "../../assets/images/students/student1.jpg";

const options = [
  { value: 'option1', label: 'Option1' },
  { value: 'option2', label: 'Option2' },
  { value: 'option3', label: 'Option3' },
  { value: 'option4', label: 'Option4' }
];

const customStyles = {
  option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#F2F2F2" : null,
      color: "#000000",
      padding: '8px 0 8px 16px',
      fontSize: 14,
      fontWeight: isSelected ? 600: 300      
  }),
  dropdownIndicator: (styles, state) => ({
      ...styles,
      transform: state.selectProps.menuIsOpen && "rotate(180deg)"
  })
};

const upcomingAppointments = [
  {id: 1, studentName: 'Student #1', lessonNumber: 'Lesson #2', lessonDate: '2/18/2021 10:30AM PT'},
  {id: 2, studentName: 'Student #6', lessonNumber: 'Lesson #1', lessonDate: '2/21/2021 11:15AM PT'}, 
];

const pastLessons = [
  {id: 1, studentName: 'Student #9', lessonNumber: 'Lesson #5', lessonDate: '2/16/2021 03:20PM PT'},
  {id: 2, studentName: 'Student #8', lessonNumber: 'Lesson #2', lessonDate: '2/15/2021 09:15AM PT'},
  {id: 3, studentName: 'Student #3', lessonNumber: 'Lesson #7', lessonDate: '2/13/2021 08:00AM PT'},
  {id: 4, studentName: 'Student #7', lessonNumber: 'Lesson #4 ', lessonDate: '2/10/2021 02:15PM PT'},
  {id: 5, studentName: 'Student #4', lessonNumber: 'Lesson #5 ', lessonDate: '2/22/2021 10:50AM PT'},
];

const StudentProfile = () => {
  const tableHeaders = ['Student Name', 'Lesson Number', 'Lesson Date'];
  const [isUserImage, setUserImage] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditAvatar, setEditAvatar] = useState(false);

  const showModal = () => {
    setShowUploadModal(true);
  };

  const hideModal = () => {
    setShowUploadModal(false);
  };

  const uploadImage = () => {
    setShowUploadModal(false);
    setUserImage(true);
  };

  const [selectedAppointmentSortOption, setSelectedAppointmentSortOption] = useState();

  const handleAppointSortOptionChange = (option) => {
    setSelectedAppointmentSortOption(option);    
  };

  const [selectedLessonSortOption, setSelectedLessonSortOption] = useState();

  const handleLessonSortOptionChange = (option) => {
    setSelectedLessonSortOption(option);
  }

  return (
    <Layout>
      <div className="student-profile">
        <h4 className="main-title">Student Profile</h4>
        <div className="divider"/>
        <div className="profile-view desktop-version">
          <div className="profile-image">            
            {
              isUserImage ?
                <div className="avatar-section" onMouseEnter={() => setEditAvatar(true)} onMouseLeave={() => setEditAvatar(false)}>
                  <img src={StudentImg} alt="" className="user-avatar"/>  
                  {
                    showEditAvatar ? 
                      <div className="edit-avatar" onClick={() => showModal()}>
                        <span>Edit Avatar</span>
                      </div>: ""
                  }
                </div>:
                <div className="">
                  <div className="default-avatar">
                    <div className="upload-image" onClick={() => showModal()}>
                      <img src={UploadIcon} alt=""/>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="profile-content">
            <div className="profile-info">
              <h3>John Doe <span>(M, 24)</span></h3>
              <p className="student-level">INTERMEDIATE STUDENT</p>
              <p className="since-date">since July 2018</p>
              <div className="main-info">
                <div className="telephone-email">
                  <p>+1 202-556-4950</p>
                  <p>johndoe@gmail.com</p>
                </div>
                <div className="vertical-divider" />
                <div className="address-info">
                  154 W Market St, Long Beach, NY, 11561
                </div>
              </div>              
            </div>
            <Link to="/messages">Send Message</Link>            
          </div>
        </div>
        <div className="profile-view mobile-version">
          <div className="profile-image">            
            {
              isUserImage ?
                <div className="avatar-section" onMouseEnter={() => setEditAvatar(true)} onMouseLeave={() => setEditAvatar(false)}>
                  <img src={StudentImg} alt="" className="user-avatar"/>  
                  {
                    showEditAvatar ? 
                      <div className="edit-avatar" onClick={() => showModal()}>
                        <span>Edit Avatar</span>
                      </div>: ""
                  }
                </div>:
                <div className="">
                  <div className="default-avatar">
                    <div className="upload-image" onClick={() => showModal()}>
                      <img src={UploadIcon} alt=""/>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="profile-content">
            <div className="profile-info">
              <h3>John Doe <span>(M, 24)</span></h3>
              <p className="student-level">INTERMEDIATE STUDENT</p>
              <p className="since-date">since July 2018</p>
              <div className="main-info">
                <div className="telephone-email">
                  <p>+1 202-556-4950</p>
                  <p>johndoe@gmail.com</p>
                </div>
                <div className="vertical-divider" />
                <div className="address-info">
                  154 W Market St, Long Beach, NY, 11561
                </div>
              </div>              
            </div>
            <Link to="/messages">Send Message</Link>            
          </div>
        </div>
        <div className="upcoming-appointments">
          <div className="page-header">
            <h4 className="main-title">Upcoming Appointments</h4>
            <Select
              value={selectedAppointmentSortOption}
              onChange={handleAppointSortOptionChange}
              options={options}
              styles={customStyles}
              placeholder="Sort By"
              classNamePrefix="custom-select"
              className="custom-select"
              name="sortBy"
              rules={{ required: 'Please select an option'}}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}      
            />  
          </div>          
          <div className="divider"/>
          <CustomTable data={upcomingAppointments} headers={tableHeaders}/>           
        </div>
        <div className="past-lessons">          
          <div className="page-header">
            <h4 className="main-title">Past Lessons</h4>
            <Select
              value={selectedLessonSortOption}
              onChange={handleLessonSortOptionChange}
              options={options}
              styles={customStyles}
              placeholder="Sort By"
              classNamePrefix="custom-select"
              className="custom-select"
              name="sortBy"
              rules={{ required: 'Please select an option'}}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}      
            />  
          </div>
          <div className="divider"/>
          <CustomTable data={pastLessons} headers={tableHeaders}/>          
        </div>
      </div>
      
      {
        showUploadModal ? <UploadImageModal hideModal={hideModal} uploadImage={uploadImage}/> : ""
      }      
    </Layout>
  )
}

export default StudentProfile;
