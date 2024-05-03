import StudentApi from '../api/StudentApi';
import ActionTypes from '../constants/actionTypes';

export function getStudent(student_id) {
  return dispatch => {
    dispatch(request());
    return StudentApi
        .getStudent(student_id)
        .then(resp => {
              return dispatch(success(resp.data))
            })
        .catch(error => {
          return dispatch(failure(error.response.data))
        });
  };

  function request() { return { type: ActionTypes.GET_STUDENT_INFO.REQUEST } }
  function success(data) { return { type: ActionTypes.GET_STUDENT_INFO.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.GET_STUDENT_INFO.FAILURE, payload: error} }
}

export function updateStudent(ko_name, level, lang_level, interests, course_type, birthday) {
  return dispatch => {
    dispatch(request());
    return StudentApi
        .updateStudent(ko_name, level, lang_level, interests, course_type, birthday)
        .then(resp => {
              return dispatch(success(resp.data))
            })
        .catch(error => {
          return dispatch(failure(error.response.data))
        });
  };

  function request() { return { type: ActionTypes.UPDATE_STUDENT_PROFILE.REQUEST } }
  function success(data) { return { type: ActionTypes.UPDATE_STUDENT_PROFILE.SUCCESS, payload: data} }
  function failure(error) { return { type: ActionTypes.UPDATE_STUDENT_PROFILE.FAILURE, payload: error} }
}

