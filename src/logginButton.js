import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";

class LogginButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPhrase = this.getPhrase.bind(this);
    this.getPrivatePhrase = this.getPrivatePhrase.bind(this);
    this.logout = this.logout.bind(this);
  }


componentDidMount(){
   console.log(this.props);
}

logout(){
  this.props.logout()
}

getPhrase(){
    this.props.getPhrase()
}

getPrivatePhrase(){
  this.props.getPrivatePhrase();
}

handleChange(e){
  const { name, value } = e.target;
  this.setState({ [name]: value })
  return console.log(this.state.username)
}

handleSubmit(e){
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password } = this.state;
  if (username && password) {
     this.props.loggin(username, password);
  }
}

  render(){
    return(
      <div>
        
        <div className="col-md-6 col-md-offset-3">
                {!this.props.mappedAppState.loggedIn &&
                    <div>
                      <h2>Login</h2>
                      <form name="form" onSubmit={this.handleSubmit}>
                            <div>
                              <label htmlFor="username">Username</label>
                              <input type="text" className="form-control" name="username" onChange={this.handleChange} />
                              
                          </div>
                          <div>
                              <label htmlFor="password">Password</label>
                              <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                              
                          </div>
                          <div className="form-group">
                            <button className="buttons" onClick={this.handleSubmit}>Login</button>               
                              
                          </div>
                      </form>
                    </div>
                }
                {this.props.mappedAppState.loggedIn &&
                  <h2>Sesión iniciada</h2>
                }
                <div>
                      <button className="buttons" onClick={this.getPhrase}>Frase de Chuk Norris</button> 
                      <button className="buttons" onClick={this.getPrivatePhrase}>Frase protegida de Chuk Norris</button>
                </div>
                <div><button className="buttons" onClick={this.logout}>Logout</button></div>
                <div><p>{this.props.mappedAppState.phrase}</p></div>
                
            </div>
      </div>
    )
  }
}

LogginButton.propTypes = {
  loggin: PropTypes.func
}

export default LogginButton
