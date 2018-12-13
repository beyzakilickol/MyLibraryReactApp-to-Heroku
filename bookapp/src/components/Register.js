import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'


export class Register extends Component {
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
  sendUserToServer= ()=>{
    let userInfo = this.state.user
   axios.post('/api/register',{
     email : userInfo.email,
     password: userInfo.password
   }).then((response)=>{
     if(response.data.success == true){
       this.setState({
         message: ''
       })
       this.props.history.push('/login')
     } else{
       this.setState({
         message : response.data
       })
     }
     console.log(response.data)

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
                Get Started
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
                  Register
                </button>
                <h3 className="message">{this.state.message}</h3>
              </div>
              <div className="text-center p-t-136">
                <Link to="/login" className="txt2" href="#">
                  Already have an account
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
