import React, { Component } from 'react';
import { ValidationContext } from "./ValidationContext"
import Form from "./Form"
import  Warning  from "./Warning"
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        nameField: "",
        validField: ""
      }
  }

  validateName = this.validateName.bind(this);
  validateName(e){
    import('./logFile')
      .then(({ logFile }) => {
          return logFile()
      })
      .catch(err => {
      throw new Error('GET request failed', err);
      });
    var name = e.target.value
    var inputVal = document.getElementById("name")
    this.setState({
      nameField: name,
    })
    if (name.match(/^A/)) {
      this.setState({
        validField: "Nombre válido"
      })
      inputVal.style.backgroundColor = "#66ff33"
    }
    else if (name.length > 0 && !name.match(/^A/)) {
        this.setState({
          validField: "Nombre no válido. Debe empezar con A mayúscula"
        })
        inputVal.style.backgroundColor = "red"
    }
    else if (name.length === 0) {
      this.setState({
        validField: ""
      })
      inputVal.style.backgroundColor = null
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Biggest">
          <div className="Middlest">
            <div className="Smallest"></div>
          </div>
        </div>
        <h1 className="Title">GENOSHA</h1>
        <div className="Variable"> <p>{process.env.REACT_APP_ENV}</p> </div>
        <ValidationContext.Provider value={{
            nameField: this.state.nameField,
            validField: this.state.validField,
            validateName: this.validateName
          }}>
            <Form />
            <Warning />
        </ValidationContext.Provider>
      </div>
    );
  }
}

export default App;
