import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";

class PhraseButton extends Component {
  constructor(props){
    super(props)
    this.getPhrase = this.getPhrase.bind(this);
    this.getPrivatePhrase = this.getPrivatePhrase.bind(this);
  }

getPhrase(){
    this.props.getPhrase()
}

getPrivatePhrase(){
  this.props.getPrivatePhrase();
}

  render(){
    return(
      <div className="DivPhrase">
          <div className="GetPhraseButton">
                      <button className="buttons" onClick={this.getPhrase}>Frase de Chuk Norris</button> 
                      <button className="buttons" onClick={this.getPrivatePhrase}>Frase protegida de Chuk Norris</button>                            
          </div>
          <div className="Phrase"><p>{this.props.mappedAppState.phrase}</p></div>
      </div>
    )
  }
}

PhraseButton.propTypes = {
  getPhrase: PropTypes.func,
  getPrivatePhrase: PropTypes.func,
  mappedAppState: PropTypes.shape({
    loggedIn: PropTypes.bool,
    phrase: PropTypes.string
  })
}

export default PhraseButton
