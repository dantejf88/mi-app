import { userConstants } from '../actions/constants';
import {userService} from "../services/userService"

export const middleware = ({ dispatch }) => next => action => { console.log(action.payload)
     if (action.type !== userConstants.LOGIN_REQUEST && 
         action.type !== userConstants.GET_PHRASE &&
         action.type !== userConstants.GET_PRIVATE_PHRASE && 
         action.type !== userConstants.LOGOUT) {
     return next(action);
     }

     if(action.type === userConstants.LOGIN_REQUEST){
     userService.login(action.payload)
        .then(
            user => { 
                dispatch({type: action.payload.success, user});
            },
            error => {
                dispatch({type: userConstants.LOGIN_FAILURE, error});

            }            
        );
     }       
     if(action.type === userConstants.GET_PHRASE){
         console.log(action.type)
         userService.fetchPhrase(action.payload)
            .then(phrase =>{
                dispatch({type: action.payload.success, phrase})
            })
     };
     if(action.type === userConstants.GET_PRIVATE_PHRASE){
        console.log(action.type)
        userService.fetchPrivatePhrase(action.payload)
           .then(phrase =>{
               dispatch({type: action.payload.success, phrase})
           })
           .catch(err => {dispatch({type: action.payload.failure, err})})
     };

     if(action.type === userConstants.LOGOUT){
         userService.logout()
            dispatch({type: userConstants.LOGOUT_SUCCESS})
     }   
};

   