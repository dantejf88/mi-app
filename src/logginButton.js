import React, { Component } from "react"

class LogginButton extends Component {

componentDidMount(){
   console.log(this.props);
}

handleClick = () => {
  console.log("hola")
  this.props.mappedLogginAction()
}

  render(){
    return(
      <div>
        <button onClick={this.handleClick}>Logging</button>
      </div>
    )
  }
}

export default LogginButton
