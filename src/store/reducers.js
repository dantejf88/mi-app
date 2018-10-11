import { userConstants } from '../actions/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

// const INITIAL_STATE = {
//   buttonState: false
// }

// export const reducers = (currentState = INITIAL_STATE, action) => {
// switch (action.type) {
// case "PRESS_BUTTON":
//     return {
//       ...currentState,
//       buttonState: !currentState.buttonState
//     }

// default:
//  return currentState;
// }
// }