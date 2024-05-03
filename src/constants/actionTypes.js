import { defineAction } from 'redux-define';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUTH_LOGIN : defineAction('AUTH_LOGIN', ['REQUEST', 'SUCCESS', 'FAILURE']),
  AUTH_SIGNUP: defineAction('AUTH_SIGNUP', ['REQUEST', 'SUCCESS', 'FAILURE']),
  AUTH_LOGOUT : defineAction('AUTH_LOGOUT', ['REQUEST', 'SUCCESS', 'FAILURE']),
  AUTH_EMAIL_VERIFY : defineAction('AUTH_EMAIL_VERIFY', ['REQUEST', 'SUCCESS', 'FAILURE']),
  AUTH_FORGOT_PASSWORD : defineAction('AUTH_FORGOT_PASSWORD', ['REQUEST', 'SUCCESS', 'FAILURE']),
  AUTH_RESET_PASSWORD : defineAction('AUTH_RESET_PASSWORD', ['REQUEST', 'SUCCESS', 'FAILURE']),

  // User
  GET_USER : defineAction('GET_USER', ['REQUEST', 'SUCCESS', 'FAILURE']),
  UPLOAD_AVATAR: defineAction('UPLOAD_AVATAR', ['REQUEST', 'SUCCESS', 'FAILURE']),
  GET_AVATAR: defineAction('GET_AVATAR', ['REQUEST', 'SUCCESS', 'FAILURE']),
  UPDATE_USER: defineAction('UPDATE_USER', ['REQUEST', 'SUCCESS', 'FAILURE']),

  // Studens
  GET_STUDENT_INFO: defineAction('GET_STUDENT_INFO', ['REQUEST', 'SUCCESS', 'FAILURE']),
  UPDATE_STUDENT_PROFILE: defineAction('UPDATE_STUDENT_PROFILE', ['REQUEST', 'SUCCESS', 'FAILURE']),
}