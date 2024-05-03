import ActionTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
  student_info: {}
}

export default function users(state = initialState, action) {
  let { payload } = action;

  switch (action.type) {    
    case ActionTypes.GET_STUDENT_INFO.REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.GET_STUDENT_INFO.SUCCESS:
      return {
        ...state,
        student_info: payload.student,
        loading: false
      }
    case ActionTypes.GET_STUDENT_INFO.FAILURE:
      return {
        ...state,
        loading: false
      }
    case ActionTypes.UPDATE_STUDENT_PROFILE.REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.UPDATE_STUDENT_PROFILE.SUCCESS:
      return {
        ...state,
        student_info: payload.student,
        loading: false
      }
    case ActionTypes.UPDATE_STUDENT_PROFILE.FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}