import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import Layout from "../../../components/Layout";
import { genders, timezones } from "../../../constants/global";

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

const Update = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    gender: '',
    time_zone: '',
    major: '',
    language: '',
    university: '',
    availability: '',
    visible: ''
  });

  const [formDataError, setFormDataError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    gender: '',
    time_zone: '',
    major: '',
    language: '',
    university: '',
    availability: '',
    visible: ''
  });

  const [visible, setVisible] = useState(false);

  const handleCheck = () => {
    setVisible(!visible);
  }

  const [selectedGenderOption, setSelectedGenderOption] = useState();
  const [selectedTimezoneOption, setSelectedTimezoneOption] = useState();

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

  const handleChange = (option, stateName) => {
    const name = stateName.name;
    if (name === 'gender') {
      setSelectedGenderOption(option);
    } else if (name === 'time_zone') {
      setSelectedTimezoneOption(option);
    }

    setFormDataError((formDataError) => ({...formDataError, [name]: ''}));
    setFormData({ ...formData, [name]: option.value });
  }

  const handleUpdateProfile = () => {
    
  }

  return (
    <Layout>
      <div className="profile-default">
        <div className="page-header">
          <h4 className="main-title">Tutor Profile</h4>
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
                <label htmlFor="major">Major</label>
                <input 
                  type="text" 
                  id="major"
                  name="major"                  
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="language">Language</label>
                <input 
                  type="text" 
                  id="language"
                  name="language"                  
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-item">
              <div className="form-item-inner">
                <label htmlFor="university">University</label>
                <input 
                  type="text" 
                  id="university"
                  name="university"                  
                />
              </div>
            </div>
          </div>
                    
          <div className="CustomCheckBox">
            <input
              type="checkbox"
              checked={visible}
              id="differentBillingAddress"
              name="differentBillingAddress"
              onChange={handleCheck}
            />
            <label htmlFor="differentBillingAddress">
              Visible To Students
            </label>
          </div>

          <div className="submit-action">
            <button className="auth-button" onClick={() => handleUpdateProfile()}>              
              Update             
            </button>
					</div>
        </div>
      </div>
    </Layout>    
  )
}

export default Update;