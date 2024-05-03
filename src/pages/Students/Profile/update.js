import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import PhoneInput from 'react-phone-input-2';
import { NotificationManager } from 'react-notifications';
import { updateStudent, getStudent } from "../../../actions/students";
import Layout from "../../../components/Layout";
import { getUserInfo, updateUserInfo } from "../../../actions/user";
import Select from 'react-select';
import { genders, timezones, languageLevels } from "../../../constants/global";

const customStyles = {
  option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#FAFAFA" : null,
      color: "#1A1A1A",
      padding: '10px 0 10px 20px',
      fontSize: 20,
      fontWeight: isSelected ? 600: 400,
      fontFamily: 'Avenir Next'      
  }),
  dropdownIndicator: (styles, state) => ({
      ...styles,
      transform: state.selectProps.menuIsOpen && "rotate(180deg)"
  })
};

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const loading = useSelector(state => state.students.loading);
  const user = useSelector(state => state.users.user);
  const student_info = useSelector(state => state.students.student_info);

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    gender: user.gender,
    time_zone: user.time_zone,    
    ko_name: student_info?.ko_name,
    level: student_info?.level,
    lang_level: student_info?.lang_level,
    interests: student_info?.interests,
    course_type: student_info?.course_type,
    birthday: student_info?.birthday?.split("T")[0]
  });

  const [formDataError, setFormDataError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    gender: '',
    time_zone: '',
    ko_name: '',
    level: '',
    lang_level: '',
    interests: '',
    course_type: '',
    birthday: ''
  });

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getStudent(user?.student_profile?.id));
  }, [dispatch]);

  const validateInput = (value, stateName) => {
    if (!value) {
        setFormDataError((formDataError) => ({...formDataError, [stateName]: 'This field should not be empty.'}))
        return false;
    } else {
      setFormDataError((formDataError) => ({...formDataError, [stateName]: ''}));
      return true;
    }
  }

  const onChange = (value, stateName) => {
		validateInput(value, stateName);
		setFormData({...formData, [stateName]: value});
	}

  const [selectedGenderOption, setSelectedGenderOption] = useState(genders.find(item => item.value === user?.gender));
  const [selectedTimezoneOption, setSelectedTimezoneOption] = useState(timezones.find(item => item.value === user?.time_zone));
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState(languageLevels.find(item => item.value === student_info?.lang_level));

  const handleChange = (option, stateName) => {
    const name = stateName.name;
    if (name === 'gender') {
      setSelectedGenderOption(option);
    } else if (name === 'time_zone') {
      setSelectedTimezoneOption(option);
    } else if (name === 'lang_level') {
      setSelectedLanguageLevel(option);
    }

    setFormDataError((formDataError) => ({...formDataError, [name]: ''}));
    setFormData({ ...formData, [name]: option.value });
  }

  const handleUpdateProfile = async () => {
    const result = Object.keys(formData).map((key) => {
      return validateInput(formData[key], key)
    })

    const isInvalid = result.filter((r) => !r).length > 0;

    if (isInvalid) {		
      return
    }

    let respUser = await dispatch(updateUserInfo(
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.time_zone,
      formData.phone_number,
      formData.gender,
    ));

    let respStudent = await dispatch(updateStudent(      
      formData.ko_name, 
      formData.level,
      formData.lang_level,
      formData.interests,
      formData.course_type,
      formData.birthday
    ));

    if (respStudent.type === "UPDATE_STUDENT_PROFILE_SUCCESS") {
      NotificationManager.success('Update Profile Successed', 'Success');
      history.push('/student/profile');
    } 
    
    if (respStudent.type === "UPDATE_STUDENT_PROFILE_FAILURE") {
      NotificationManager.error('Update Profile Failed', 'Failure');
    } 
  };
  
  return (
    <Layout>
      <div className="profile-default">        
        <div className="page-header">
          <h4 className="main-title">Student Profile</h4>
        </div>
        <div className="form-section">
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="first_name">First Name</label>
                <input 
                  type="text" 
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}							
                  onChange={(e) => onChange(e.target.value, 'first_name')}
                />
              </div>
              {formDataError.first_name && <p className="error-msg">{formDataError.first_name}</p>}
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="last_name">Last Name</label>
                <input 
                  type="text" 
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}							
                  onChange={(e) => onChange(e.target.value, 'last_name')}
                />
              </div>
              {formDataError.last_name && <p className="error-msg">{formDataError.last_name}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}							
                  onChange={(e) => onChange(e.target.value, 'email')}
                />
              </div>
              {formDataError.email && <p className="error-msg">{formDataError.email}</p>}
            </div>
            <div className="form-item">						
              <div className="form-item-inner">							
                <label htmlFor="email">Phone Number</label>
                <PhoneInput
                  specialLabel="Phone Number"
                  country={'us'}
                  onlyCountries={['us', 'kr']}
                  // masks={{us: '(...) ...-....', kr: '(...) ...-....'}}
                  value={formData.phone_number}
                  onChange={(phone) => onChange(`+${phone}`, 'phone_number')}
                  inputProps={{
                    name: 'phone_number',
                    required: true                  
                  }}
                />
              </div>
              {formDataError.phone_number && <p className="error-msg">{formDataError.phone_number}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="gender">Gender</label>                
                <Select
                  value={selectedGenderOption}
                  onChange={handleChange}
                  options={genders}
                  styles={customStyles}
                  placeholder="Please select your gender"
                  classNamePrefix="form-select"
                  className="form-select"
                  name="gender"
                  rules={{ required: 'Please select an option'}}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}      
                />
              </div>
              {formDataError.gender && <p className="error-msg">{formDataError.gender}</p>}
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="time_zone">Timezone</label>
                <Select
                  value={selectedTimezoneOption}
                  onChange={handleChange}
                  options={timezones}
                  styles={customStyles}
                  placeholder="Please select your timezone"
                  classNamePrefix="form-select"
                  className="form-select"
                  name="time_zone"
                  isSearchable
                  rules={{ required: 'Please select an option'}}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}      
                />
              </div>
              {formDataError.time_zone && <p className="error-msg">{formDataError.time_zone}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="ko_name">Korean Name</label>
                <input 
                  type="text" 
                  id="ko_name"
                  name="ko_name"
                  value={formData.ko_name}							
                  onChange={(e) => onChange(e.target.value, 'ko_name')}
                />
              </div>
              {formDataError.ko_name && <p className="error-msg">{formDataError.ko_name}</p>}
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="level">Level</label>
                <input 
                  type="number" 
                  id="level"
                  name="level"
                  value={formData.level}							
                  onChange={(e) => onChange(e.target.value, 'level')}
                />
              </div>
              {formDataError.level && <p className="error-msg">{formDataError.level}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="lang_level">Language Level</label>                
                <Select
                  value={selectedLanguageLevel}
                  onChange={handleChange}
                  options={languageLevels}
                  styles={customStyles}
                  placeholder="Please select your language level"
                  classNamePrefix="form-select"
                  className="form-select"
                  name="lang_level"
                  isSearchable
                  rules={{ required: 'Please select an option'}}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}      
                />
              </div>
              {formDataError.lang_level && <p className="error-msg">{formDataError.lang_level}</p>}
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="interests">Interests</label>
                <input 
                  type="text" 
                  id="interests"
                  name="interests"
                  value={formData.interests}							
                  onChange={(e) => onChange(e.target.value, 'interests')}
                />
              </div>
              {formDataError.interests && <p className="error-msg">{formDataError.interests}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="course_type">Course Type</label>
                <input 
                  type="text" 
                  id="course_type"
                  name="course_type"
                  value={formData.course_type}							
                  onChange={(e) => onChange(e.target.value, 'course_type')}
                />
              </div>
              {formDataError.course_type && <p className="error-msg">{formDataError.course_type}</p>}
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="birthday">Birthday</label>
                <input 
                  type="date" 
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}							
                  onChange={(e) => onChange(e.target.value, 'birthday')}
                />
              </div>
              {formDataError.birthday && <p className="error-msg">{formDataError.birthday}</p>}
            </div>
          </div>          
          <div className="submit-action">
            <button className="auth-button" onClick={() => handleUpdateProfile()}>              
              {
                loading ? <ClipLoader loading={loading} size={20} color="white"/> : 'Update'
              }              
            </button>
					</div>
        </div>
      </div>
    </Layout>    
  )
}

export default UpdateProfile;