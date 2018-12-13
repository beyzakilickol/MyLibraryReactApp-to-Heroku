import React, { Component } from 'react';
import { setAuthenticationToken } from '../utils'
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history'

class AllBooks extends Component {

       constructor(props){
         super(props)
         this.state={
           books: []
         }

       }

       addBookButton = () =>{
         this.props.history.replace('/add-book')

       }

       componentWillReceiveProps(props) {

         console.log(this.props.url)

          axios.get(props.url)
          .then(response => {

              this.setState({
                books: response.data
              })


          })

       }

       componentDidMount = ()=>{

         let token = localStorage.getItem('jsonwebtoken')
         setAuthenticationToken(token)
         axios.get(this.props.url).then((res)=> {

           this.setState({
              books: res.data
              })

         }).catch((error)=>{
           this.props.history.push('/login')
         })
         }

        deleteBook = (each) =>{
          fetch('http://localhost:3050/delete-book/'+ each.id ,{
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

    console.log("render of all books")

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


      <div>
      <div className="maindiv">
       {books} <br/>
      <button onClick={this.addBookButton} className="addButton btn btn-warning">Add Book</button>
      </div>
      </div>

    )
  }

}
// map global state to local props
const mapStateToProps = (state) => {
  return {

  url: state.url //this.props.isAuthenticated
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


export default connect(mapStateToProps,mapDispatchToProps)(AllBooks)
