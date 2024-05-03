import axios from 'axios';
import BaseApi from './BaseApi';

class StudentApi extends BaseApi {

  getStudent(student_id) {
    return axios.get(
      this.REACT_APP_SERVER_URL + "/students/" + student_id,
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}` 
        }
      }
    );
  }

  updateStudent(ko_name, level, lang_level, interests, course_type, birthday) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "/students/update",
      {ko_name, level, lang_level, interests, course_type, birthday},
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}` 
        }
      }
    );
  }
}

export default new StudentApi();