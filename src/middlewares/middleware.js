import { userConstants } from '../actions/constants';
import {userService} from "../services/userService"

export const middleware = ({ dispatch }) => next => action => { console.log(action.payload)
     if (action.type !== userConstants.LOGIN_REQUEST) {
     return next(action);
     }

     userService.login(action.payload)
        .then(
            user => { 
                dispatch({type: action.payload.succes, user});
            },
            error => {
                dispatch({type: userConstants.LOGIN_FAILURE, error});

            }   
        );
};

   