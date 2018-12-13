import React, { Component } from 'react';
import AddBook from './AddBook'
import AllBooks from './AllBooks'
import Footer from './Footer'
import Header from './Header'
import Search from './Search'
import {UpdateBook} from './UpdateBook'
import {Login} from './Login'
import {Register} from './Register'
import './main.css'
import '../images/icons/favicon.ico'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../vendor/animate/animate.css'
import '../vendor/css-hamburgers/hamburgers.min.css'
import '../css/util.css'
import '../css/main.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'




// const hideHeaderStyle = {
//   display: 'none'
// }
//
// const showHeaderStyle = {
//   display: 'block'
// }

class BaseLayout extends Component {
   constructor(props){
     super(props)
     console.log(props)

   }


  render() {


   //let headerStyle = this.props.isAuthenticated ? showHeaderStyle : hideHeaderStyle

    return (

      <div className="mainContainer">
          <Header />
              {this.props.children}
          <Footer/>

      </div>

    )
  }

}


export default withRouter(BaseLayout)
