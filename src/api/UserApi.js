import axios from 'axios';
import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  
  getUserInfo() {
    return axios.get(
      this.REACT_APP_SERVER_URL + "/users/get",
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}` 
        }
      }
    );
  }

  updateUserInfo(first_name, last_name, email, time_zone, phone_number, gender) {
    return axios.put(
      this.REACT_APP_SERVER_URL + "/users/update",
      {first_name, last_name, email, time_zone, phone_number, gender},
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}` 
        }
      }
    );
  }

  uploadAvatar(file) {
    let data = new FormData();
    data.append('file', file);

    return axios.post(
      this.REACT_APP_SERVER_URL + "/users/upload-avatar",
      data,
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      }
    );
  }

  getAvatar(file_name) {
    return axios.get(
      this.REACT_APP_SERVER_URL + "/users/get-avatar/?file_name=" + file_name,
      {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'responseType': 'blob'
        }
      }
    );
  }
}

export default new UserApi();