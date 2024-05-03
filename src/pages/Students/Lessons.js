import React, { useState } from "react";
import Select from "react-select";
import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";

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

const myLessons = [
  {id: 1, studentName: 'Student #1', lessonNumber: 'Lesson #2', lessonDate: '2/18/2021 10:30AM PT'},
  {id: 2, studentName: 'Student #6', lessonNumber: 'Lesson #1', lessonDate: '2/21/2021 11:15AM PT'},
  {id: 3, studentName: 'Student #4', lessonNumber: 'Lesson #5', lessonDate: '2/22/2021 10:50AM PT'},
  {id: 4, studentName: 'Student #9', lessonNumber: 'Lesson #3', lessonDate: '2/24/2021 02:30PM PT'},
  {id: 5, studentName: 'Student #10', lessonNumber: 'Lesson #5', lessonDate: '2/31/2021 03:20PM PT'},
  {id: 6, studentName: 'Student #8', lessonNumber: 'Lesson #2', lessonDate: '3/02/2021 09:15AM PT'},
  {id: 7, studentName: 'Student #3', lessonNumber: 'Lesson #7', lessonDate: '3/05/2021 08:00AM PT'},
  {id: 8, studentName: 'Student #7', lessonNumber: 'Lesson #4 ', lessonDate: '3/11/2021 02:15PM PT'},
  {id: 9, studentName: 'Student #11', lessonNumber: 'Lesson #6', lessonDate: '2/31/2021 03:20PM PT'},
  {id: 10, studentName: 'Student #9', lessonNumber: 'Lesson #1', lessonDate: '3/02/2021 09:15AM PT'},
  {id: 11, studentName: 'Student #2', lessonNumber: 'Lesson #3', lessonDate: '3/05/2021 08:00AM PT'}
]; 

const Lessons = () => {
  const tableHeaders = ['Student Name', 'Lesson Number', 'Lesson Date'];
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (option) => {
    setSelectedOption(option);    
  };
  return (
    <Layout>
      <div className="past-lessons">
        <div className="page-header">
          <h4 className="main-title">My Lessons</h4>
          <Select
            value={selectedOption}
            onChange={handleChange}
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
        <CustomTable data={myLessons} headers={tableHeaders}/>
      </div>
    </Layout>    
  )
}

export default Lessons;
