import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";

class CreateUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      extra: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


componentDidMount(){
   console.log(this.props);
}

handleChange(e){
  const { name, value } = e.target;
  this.setState({ [name]: value })
  return console.log(this.state.username)
}

handleSubmit(e){
  e.preventDefault();
  const { username, password, extra } = this.state;
  if (username && password && extra) {
     this.props.createUserAction(username, password, extra);
  }
}

  render(){
    return(   
        <div className="col-md-6 col-md-offset-3">
                {!this.props.mappedAppState.userCreated &&
                    <div>
                      <h2>Crear Usuario</h2>
                      <form name="form" onSubmit={this.handleSubmit}>
                            <div>
                              <label htmlFor="username ">Username </label>
                              <input type="text" className="form-control" name="username" onChange={this.handleChange} />
                              
                          </div>
                          <div>
                              <label htmlFor="password ">Password </label>
                              <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                              
                          </div>
                          <div>
                              <label >Color favorito </label>
                              <input type="text" className="form-control" name="extra" onChange={this.handleChange}/>
                          </div>
                          <div className="form-group">
                            <button className="buttons" onClick={this.handleSubmit}>Crear Usuario</button>               
                              
                          </div>
                      </form>
                    </div>
                }
                {this.props.mappedAppState.userCreated &&
                  <p>Usuario creado, intenta loguearte para verificarlo</p>
                }
            </div>
    )
  }
}

CreateUser.propTypes = {
  createUserAction: PropTypes.func,
    mappedAppState: PropTypes.shape({
      userCreated: PropTypes.bool,
    })
}

export default CreateUser
