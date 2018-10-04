import React, { Component } from 'react';
import { ValidationContext } from "./ValidationContext"

class Form extends Component {
  render() {
    return (
    <div >
      <ValidationContext.Consumer>
        {formField => (
          <form >
            <h2>Formulario</h2>
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





// <div>
//   <label >Select one option</label>
//   <select>
//     <option selected value="option1">Option1</option>
//     <option value="option2">Option2</option>
//     <option value="option3">Option3</option>
//     <option value="option4">Option4</option>
//   </select>
// </div>
// <div>
//   <label>Men</label>
//     <input type="checkbox" name="Men"/>
//   <label>Women</label>
//     <input type="checkbox" name="Women" checked="true"/>
// </div>
