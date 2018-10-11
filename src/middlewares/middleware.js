import { userConstants } from '../actions/constants';
import {userService} from "../services/userService"

export const middleware = ({ dispatch }) => next => action => { console.log(action.payload)
     if (action.type !== userConstants.LOGIN_REQUEST) {
     return next(action);
     }

     userService.login(action.payload.info)
        .then(
            user => { 
                dispatch({type: userConstants.LOGIN_SUCCESS, user});
            },
            error => {
                dispatch({type: userConstants.LOGIN_FAILURE, error});

            },   
        );
};

   