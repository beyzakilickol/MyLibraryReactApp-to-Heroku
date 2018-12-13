import React, { Component } from 'react';
import {button, Navbutton} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom'

class Search extends Component {
     constructor(props){
       super(props)
       this.state={
         books: []
       }

     }
  componentWillReceiveProps = (props) => { //bu fonksiyon global store daki degisiklikte get fired olur. Yeni degisikligi yakalamak icin kullanilir.
    axios.get(`/api/getSearchBook/${props.searchInputValue}`)
    .then((response) => {
      this.setState({
         books: response.data
         })


    })
  }
  componentDidMount = () => {
    axios.get(`/api/getSearchBook/${this.props.searchInputValue}`)
    .then((response) => {
      this.setState({
         books: response.data
         })
    })
  }
  deleteBook = (each) =>{
    fetch('/api/delete-book/'+ each.id ,{
method: 'delete'
}).then((response) =>{
let arr = this.state.books
let newarr = arr.filter(function(book){
return each.id !== book.id
})
this.setState({
books:newarr
})
console.log('success')
//this.props.history.push('/')
})
}

edit = (bookId)=>{
console.log(bookId)
this.props.history.replace(`/update-book/${bookId}`)
}


     render() {
       let books = this.state.books.map((each)=>{
         return <div className="card">
          <img id="pictures" className="card-img-top" src={each.imageurl} alt="Card image cap" />
          <div className="card-body">
          <div className="cardTitle">
            <h3 className="card-text car-title">{each.booktitle}</h3>
            </div>
            <p className="card-text"><b>Author:</b> {each.author}</p>
            <p className="card-text"><b>Genre: </b>{each.category}</p>
            <p className="card-text"><b>Published on: </b>{each.publisheddate}</p>
            <div className="btn-div">
            <button className="btn btn-primary buttons" onClick={this.deleteBook.bind(this,each)}>Delete</button>
            <button onClick={() => this.edit(each.id)} className="btn btn-warning buttons">Edit</button>
            </div>
          </div>
        </div>
       })
       return (

         <div className="maindiv">
          {books}

         </div>
       )

     }


}


     // map global state to local props
     const mapStateToProps = (state) => {
       return {

         //isAuthenticated : state.isAuthenticated //this.props.isAuthenticated
         //ctr: state.counter // this.props.ctr
         searchInputValue : state.searchValue //you can use this value in anywhere in this component
         //by using this.props.searchInputValue
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


     export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search))
