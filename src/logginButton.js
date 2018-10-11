import React, { Component } from "react"

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

  this.setState({ submitted: true });
  const { username, password } = this.state;
  const { dispatch } = this.props;
  if (username && password) {
      dispatch(this.props.loggin(username, password));
  }
}


handleClick = () => {
  console.log(this.state.username)
  this.props.mappedLogginAction()
}

  render(){
    return(
      <div>
        
        <div className="col-md-6 col-md-offset-3">
                <div className="alert alert-info">
                    Username: test<br />
                    Password: test
                </div>
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
                      <button onClick={this.handleSubmit}>Logging</button>               
                        
                    </div>
                </form>
            </div>
      </div>
    )
  }
}

export default LogginButton
