import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, uploadAvatar } from "../../../actions/user";
import Layout from "../../../components/Layout";
import UploadImageModal from "../../../components/UploadImageModal";
import UploadIcon from "../../../assets/images/upload.svg";
import StudentImg from "../../../assets/images/students/student1.jpg";

const Profile = () => {
  const dispatch = useDispatch();
  const [isUserImage, setUserImage] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditAvatar, setEditAvatar] = useState(false);

  const user = useSelector(state => state.users.user);

  const showModal = () => {
    setShowUploadModal(true);
  };

  const hideModal = () => {
    setShowUploadModal(false);
  };

  const uploadImage = async (file) => {
    setShowUploadModal(false);
    setUserImage(true);

    let resp = await dispatch(uploadAvatar(file));

    if (resp.type === "UPLOAD_AVATAR_SUCCESS") {
      dispatch(getUserInfo());
    }

  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Layout>
      <div className="student-profile">
        <div className="profile-view desktop-version"> 
          <div className="profile-image">            
            {
              user?.avatar ?
                <div className="avatar-section" onMouseEnter={() => setEditAvatar(true)} onMouseLeave={() => setEditAvatar(false)}>
                  <img src={`https://dev.naonow.contracollective.com/users/get-avatar?file_name=` + user.avatar} alt="" className="user-avatar"/>  
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
              <h3>{user.first_name} {user.last_name} <span>(M, 24)</span></h3>
              {/* <p className="student-level">INTERMEDIATE STUDENT</p> */}
              {/* <p className="since-date">since July 2018</p> */}
              <div className="main-info">
                <div className="telephone-email">
                  <p>{user.phone_number}</p>
                  <p>{user.email}</p>
                </div>
                <div className="vertical-divider" />
                <div className="address-info">
                  154 W Market St, Long Beach, NY, 11561
                </div>
              </div>              
            </div>
            <Link to="/student/profile/update">Update</Link>        
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
              <h3>{user.first_name} {user.last_name} <span>(M, 24)</span></h3>
              {/* <p className="student-level">INTERMEDIATE STUDENT</p> */}
              {/* <p className="since-date">since July 2018</p> */}
              <div className="main-info">
                <div className="telephone-email">
                  <p>{user.phone_number}</p>
                  <p>{user.email}</p>
                </div>
                <div className="vertical-divider" />
                <div className="address-info">
                  154 W Market St, Long Beach, NY, 11561
                </div>
              </div>              
            </div>
            <Link to="/student/profile/update">Update</Link>
          </div>
        </div>
      </div>
      {
        showUploadModal ? <UploadImageModal hideModal={hideModal} uploadImage={uploadImage}/> : ""
      }
    </Layout>
  )
}

export default Profile;