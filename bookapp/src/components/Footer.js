import React, { Component } from 'react';
import { connect } from 'react-redux'

class Footer extends Component {

  render() {
    if(this.props.isAuthenticated == true){
    return (

                  <div className="containerfooter">
                      <p className="copyright text-white">Copyright© 2018</p>
                  </div>

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

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Footer)
