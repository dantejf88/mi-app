import React, { Component } from 'react';
import { ValidationContext } from "./ValidationContext"

class Warning extends Component {
  render() {
    return (
    <div >
      <ValidationContext.Consumer>
        {formField => (
            <p>{formField.validField}</p>
        )}
      </ValidationContext.Consumer>
    </div>
  );
 }
}

export default Warning
