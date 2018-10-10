

const INITIAL_STATE = {
      buttonState: false
}

export const reducers = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRESS_BUTTON":
        return {
          ...currentState,
          buttonState: !currentState.buttonState
        }

    default:
     return currentState;
   }
}
