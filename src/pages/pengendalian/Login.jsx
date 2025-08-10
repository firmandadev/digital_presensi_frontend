import './Login.css';
import React, { useRef } from 'react'
import { login, logout, isLoggedIn } from '../../modules/utils';
const settings = require('../../settings.json')
class Login extends React.Component {
  constructor(props){
    super(props)
}
async startLogin(){
    document.getElementById("login-info").style.display = "block";
    document.getElementById("login-info").innerHTML = "Loading..."
    let username = document.getElementById('username-form').value
    let password = document.getElementById('pass-form').value
    let statusLogin = await login(username,password)
    console.log(statusLogin)
    if(statusLogin.success == true){
        document.getElementById("login-info").style.display = "none";
        localStorage.setItem('username',username)
        localStorage.setItem('authToken',statusLogin.loginInfo.token)
        localStorage.setItem('access',statusLogin.loginInfo.datas.access)
        alert(statusLogin.loginInfo.datas.access) 
        window.location = '/pengendalian/kkp'
    }else{
        document.getElementById("login-info").innerHTML = "Username/Password Salah"
    }
}
  componentDidMount(){
    document.getElementById('navbar').style.display = 'none'
  }
  render(){
    return(
	    <div id='login-container'>         
            <div class="card" id='login-container-card'>
              <div class="alert alert-info" role="alert" id='login-info'>
                Loading....
              </div>
            <div class="card-body">
                <h1 id='login-page-title'>Login Page</h1>
                <div class="mb-3 input-data">
                <label htmlFor="username-form" className="form-label">Username</label>
                <input type="text" class="form-control" id="username-form" placeholder="Username"/>
                </div>
             
                <div class="mb-3 input-data">
                <label htmlFor="pass-form" className="form-label">Password</label>
                <input type="password" class="form-control" id="pass-form" placeholder="Password"/>
         
                </div>
                  <button type="button" className="btn btn-dark" id='hapus-ttd' onClick={()=>this.startLogin()}>Login</button>
            </div>
            </div>
        </div>)
    }
  }

export default Login;
	    
