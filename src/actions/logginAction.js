import { userConstants } from './constants';


export const loggin = (username, password) => ({
  type: userConstants.LOGIN_REQUEST,
  payload: {
    url: "/sessions/create",
    info: {username, password},
    success: userConstants.LOGIN_SUCCESS}
})

export const getPrivatePhrase = () => ({
  type: userConstants.GET_PRIVATE_PHRASE,
  payload: {
    url: "/api/protected/random-quote",
    success: userConstants.PHRASE_PRIVATE_SUCCESS}
})

export const getPhrase = () => ({
  type: userConstants.GET_PHRASE,
  payload: {
    url: "/api/random-quote",
    success: userConstants.PHRASE_SUCCESS}
})

export const logout = () => ({
  type: userConstants.LOGOUT,
  payload: {
    success: userConstants.LOGOUT_SUCCESS
  }
})

