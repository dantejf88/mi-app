
export const middleware = ({ dispatch }) => next => action => {
     if (action.type !== 'API') {
     return next(action);
     }
    
     // Handle API code
     };

    //  if (action.type !== 'API') {
    //  return next(action);
    //  }
    
    //  const { payload } = action;
    
    //  fetch(BASE_URL + action.url)
    //  .then(response => response.json())
    //  .then(response => dispatch({ type: payload.success, response }))
    //  };
     