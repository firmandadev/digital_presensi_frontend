
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'
import { logout, isLoggedIn } from '../modules/utils'

class Navbar extends React.Component {
  constructor(props){                                               super(props)                                      
  }                                                         render() {
    return(
	<nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Dalbin</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/laporan">Laporan</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pengendalian/kkp">KKP</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dasarhukum">Dasar Hukum</a>
        </li>
        <li class="nav-item button-custom">
          <b class="nav-link" href="/dasarhukum"><i class="fa-solid fa-user"></i> {localStorage.getItem('username')}</b>
        </li>
        
        <li class="nav-item button-custom" onClick={()=>logout()} >
          <b class="nav-link"><i class="fa-solid fa-right-from-bracket"></i> Logout</b>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}
}

export default Navbar
