import UserApi from '../api/UserApi';
import ActionTypes from '../constants/actionTypes';

export function getUserInfo() {
  return dispatch => {
    dispatch(request());
    return UserApi
        .getUserInfo()
        .then(resp => {
            return dispatch(success(resp.data));
        })
        .catch(error => {
          return dispatch(failure(error.response.data))
        });
  };

  function request() { return { type: ActionTypes.GET_USER.REQUEST } }
  function success(data) { return { type: ActionTypes.GET_USER.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.GET_USER.FAILURE, payload: error} }
}

export function updateUserInfo(first_name, last_name, email, time_zone, phone_number, gender) {
  return dispatch => {
    dispatch(request());
    return UserApi
        .updateUserInfo(first_name, last_name, email, time_zone, phone_number, gender)
        .then(resp => {
            return dispatch(success(resp.data));
        })
        .catch(error => {
          return dispatch(failure(error))
        });
  };

  function request() { return { type: ActionTypes.UPDATE_USER.REQUEST } }
  function success(data) { return { type: ActionTypes.UPDATE_USER.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.UPDATE_USER.FAILURE, payload: error} }
}


export function uploadAvatar(file) {
  return dispatch => {
    dispatch(request());
    return UserApi
        .uploadAvatar(file)
        .then(resp => {          
            return dispatch(success(resp.data));
        })
        .catch(error => {
          return dispatch(failure(error.response.data))
        });
  };

  function request() { return { type: ActionTypes.UPLOAD_AVATAR.REQUEST } }
  function success(data) { return { type: ActionTypes.UPLOAD_AVATAR.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.UPLOAD_AVATAR.FAILURE, payload: error} }
}

export function getAvatar(file_name) {
  return dispatch => {
    dispatch(request());
    return UserApi
        .getAvatar(file_name)        
        .then(resp => resp.blob())
        .then(blobFile => {
          return dispatch(success(new File([blobFile])));
        })
        .catch(error => {
          return dispatch(failure(error))
        });
  };

  function request() { return { type: ActionTypes.GET_AVATAR.REQUEST } }
  function success(data) { return { type: ActionTypes.GET_AVATAR.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.GET_AVATAR.FAILURE, payload: error} }
}