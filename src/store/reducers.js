import { userConstants } from '../actions/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, phrase: "" } : {loggedIn: false, phrase: "", userCreated: false};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {phrase: "Usuario o password inexistente"};
    case userConstants.LOGOUT_SUCCESS:
      return {loggedIn: false,
              user: {},
              userCreated: false};
    case userConstants.PHRASE_SUCCESS:
      return {...state,
              phrase: action.phrase};
    case userConstants.PHRASE_PRIVATE_SUCCESS:
      return {...state,
              phrase: action.phrase};               
    case userConstants.FAILURE_PHRASE:
      return {phrase: action.err.msg};   
      case userConstants.CREATE_SUCCESS:
      return {
        userCreated: true
      };
    default:
      return state
  }
}
