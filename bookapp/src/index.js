import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Router, Switch, Route} from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import AddBook from './components/AddBook'
import AllBooks from './components/AllBooks'
import Footer from './components/Footer'
import Header from './components/Header'
import {UpdateBook} from './components/UpdateBook'
import Login from './components/Login'
import {Register} from './components/Register'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import history from './history';
import Search from './components/Search'

let store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(

  <Provider store = {store}>
  <Router history={history}>
  <BaseLayout >

    <Switch>
      <Route exact path="/" component={AllBooks} />
      <Route path="/search" component={Search}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/add-book" component={AddBook} />
      <Route path="/update-book/:bookId" component={UpdateBook} />
    </Switch>

  </BaseLayout>
  </Router>
  </Provider>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
