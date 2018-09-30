import React, { Component } from 'react';
import './App.css';

class App extends Component {


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
      </div>
    );
  }
}

export default App;
