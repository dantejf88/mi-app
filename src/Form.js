import React, { Component } from 'react';
import { ValidationContext } from "./ValidationContext"

class Form extends Component {
  render() {
    return (
    <div >
      <ValidationContext.Consumer>
        {formField => (
          <form >
            <div >
              <label>
                Inserte un nombre que comience con A mayúscula:
                <input required type="text" name="name" id="name" onChange={(e) => formField.validateName(e) }/>
              </label>
            </div>
          </form>

        )}
      </ValidationContext.Consumer>

    </div>
  );
 }
}

export default Form;

