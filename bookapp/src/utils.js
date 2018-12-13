import axios from 'axios'


export function setAuthenticationToken(token) {

  if(token) {

    console.log("Inside setAuthenticationToken "+token)
    // set the token in request headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  console.log(axios.defaults.headers.common.Authorization);
  // } else {
  //   // remove the token from request headers
  //   delete axios.defaults.headers.common['Authorization']
  }

}
