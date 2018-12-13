import React, { Component } from 'react';
import {button, Navbutton} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom'

class Header extends Component {
     constructor(props){
       super(props)
       this.state = {
         searchBoxValue : ""
       }
     }

     logout = () => {
       localStorage.clear()

      this.props.notAuthenticate()
history.push('/login')

     }
     selectedGenre = (e) =>{
       console.log(e.target.value)
       this.props.genre(e.target.value)
       this.props.history.replace('/')
     }

     getSearchValue = (e) =>{
       this.setState({
         searchBoxValue : e.target.value
       })


     }
     sendValueToStore = ()=>{
        this.props.searchInput(this.state.searchBoxValue)

     }

render() {
  if(this.props.isAuthenticated == true){
    return (

      <nav className="navbar navbar-light bg-dark justify-content-between text-white">
        <button onClick={this.selectedGenre} value="allbooks" className="navbar-brand text-white">My Library</button>
        <button onClick={this.selectedGenre} value="Romance" className="navbar-brand category text-white">Romance</button>
        <button onClick={this.selectedGenre} value="Fiction" className="navbar-brand category text-white">Fiction</button>
        <button onClick={this.selectedGenre} value="Technical" className="navbar-brand category text-white">Technical</button>
        <button onClick={this.selectedGenre} value="Biography" className="navbar-brand category text-white">Biography</button>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search by title" aria-label="Search" onChange={this.getSearchValue}/>
          <Link to="/search"><button onClick={this.sendValueToStore} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>

        </form>
        <button onClick={this.logout} className="btn btn-warning">Logout</button>
      </nav>

    )
  } else {
    return (
      <div>
      </div>
    )
  }

}
}
// map global state to local props
const mapStateToProps = (state) => {
  return {

    isAuthenticated : state.isAuthenticated //this.props.isAuthenticated
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
   genre: (value) => dispatch({type: "GENRE", genre: value }),
   searchInput : (value) => dispatch({type:"SEARCHVALUE",searchBoxValue:value})
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))
