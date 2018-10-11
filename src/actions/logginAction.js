import { userConstants } from './constants';


export const loggin = (username, password) => ({
  type: userConstants.LOGIN_REQUEST,
  payload: {
    url: "/login",
    info: {username, password},
    succes: userConstants.LOGIN_SUCCESS}
})

