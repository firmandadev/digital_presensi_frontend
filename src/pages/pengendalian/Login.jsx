import './Login.css';
import React, { useRef } from 'react'
import { login, logout, isLoggedIn } from '../../modules/utils';
const settings = require('../../settings.json')
class Login extends React.Component {
  constructor(props){
    super(props)
}
async startLogin(){
    document.getElementById("loading-gif").style.display = "block";
    let username = document.getElementById('username-form').value
    let password = document.getElementById('pass-form').value
    let statusLogin = await login(username,password)
    console.log(statusLogin)
    if(statusLogin.success == true){
        document.getElementById("loading-gif").style.display = "none";
        localStorage.setItem('username',username)
        localStorage.setItem('authToken',statusLogin.loginInfo.token)
        window.location = '/pengendalian/kkp'
    }else{
        alert("Gagal Login")
    }
}
  render(){
    return(
	    <div id='login-container'>         
            <div class="card" id='login-container-card'>
            <div class="card-body">
             
                <div class="mb-3 input-data">
                <label htmlFor="username-form" className="form-label">Username</label>
                <input type="text" class="form-control" id="username-form" placeholder="Username"/>
                </div>
             
                <div class="mb-3 input-data">
                <label htmlFor="pass-form" className="form-label">Password</label>
                <input type="password" class="form-control" id="pass-form" placeholder="Password"/>
         
                </div>
                  <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.startLogin()}>Login</button>
            </div>
            </div>
        </div>)
    }
  }

export default Login;
	    