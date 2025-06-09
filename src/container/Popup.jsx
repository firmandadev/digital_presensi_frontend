
import './Popup.css';
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'

class Popup extends React.Component {
  constructor(props){
    super(props)
  }
closePopup(){
	document.getElementById("popup-container").style.display= "none"
}
  render() {
    return(
	 <div id="popup-container">
	    <div class="card" id="popup-box">
	    <div id='card-title'>Pemberitahuan</div>
 		 <div class="card-body" id='popup-box-message'>
	    <div id="popup-box-text">
	    {this.props.text}</div>
	    <button type="button" onClick={this.closePopup} class="btn btn-warning" id="close-button">Tutup</button>
 		 </div>
	</div>	
   	 </div>)
  }
}

export default Popup;
