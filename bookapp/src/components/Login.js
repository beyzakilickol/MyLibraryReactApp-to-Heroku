import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import { setAuthenticationToken } from '../utils'
import { connect } from 'react-redux'



class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{},
      message:''
    }
  }
  getInputValue = (e)=>{
    this.setState({

      user: {
        ...this.state.user,
        [e.target.name] : e.target.value
      }
    })
  }
  componentDidMount=()=>{
     this.props.notAuthenticate()
  }
  sendUserToServer= ()=>{
    let userInfo = this.state.user
   axios.post('http://localhost:3050/login',{
     email : userInfo.email,
     password: userInfo.password
   }).then((response)=>{

     if(response.data == 'The email you entered is invalid!'){

       this.setState({
         message: response.data
       })

     } else if(response.data == 'The password you entered is incorrect!'){

       this.setState({
         message : response.data
       })
     }  else {
       this.props.authenticate()
       localStorage.setItem('jsonwebtoken',response.data.token)
     // put the token in the request header
    setAuthenticationToken(response.data.token)

      this.props.history.push('/')

     }


   }).catch((error)=>{

     console.log(error)
   })
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
        <div className="greetingContainer">
        <h1>
        WELCOME TO MY LIBRARY
        </h1>
        <h4>Where your horizon broadens</h4>
        </div>
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="http://www.animatedimages.org/data/media/53/animated-book-image-0032.gif" alt="IMG"/>
            </div>

            <div className="login100-form validate-form">
              <span className="login100-form-title">
                Member Login
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input onChange={this.getInputValue} className="input100" type="text" name="email" placeholder="Email"/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input onChange={this.getInputValue} className="input100" type="password" name="password" placeholder="Password"/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button onClick={this.sendUserToServer} className="login100-form-btn">
                  Login
                </button>
                <h3 className="message">{this.state.message}</h3>
              </div>


              <div className="text-center p-t-136">
                <Link to="/register" className="txt2" href="#">
                  Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

}
// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
  }
}

// make the dispatches available on local props
// dispatch is used to communicate with the reducer
// so the reducer can change the global state
const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
    notAuthenticate: () => dispatch({type: "NOTAUTHENTICATED"}),
    authenticate: () => dispatch({type: "AUTHENTICATED"})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
