import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { ValidationContext } from "./ValidationContext"
import Form from "./Form"
import  Warning  from "./Warning"
import "./App.css";

function Loading() {
  return <h3>Loading...</h3>;
}

const Genosha = Loadable({
  loader: () => import("./Genosha"),
  loading: Loading
});

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        nameField: "",
        validField: "",
        title: false
      }
  }

  validateName = this.validateName.bind(this);
  validateName(e){
    this.setState({
      title: true
    })
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
        {this.state.title &&
        <Genosha/>
        }
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
