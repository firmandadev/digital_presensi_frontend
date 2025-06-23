import React from "react"
import "./Success.css"
import CryptoJS from "crypto-js"
const settings = require("../settings.json")

class Success extends React.Component{
  constructor(props){
    super(props)
    this.state={
      nama: window.location.href.split("/")[5]
    }
  }
    componemDidMount(){

    let uri = window.location.href.split("/")[5]
    this.setState({
      nama : uri
    })
    }


  
  render(){

    return(
      <div id="success-container">
      Terima Kasih Bapak/Ibu 
      <div id="success-nama">{this.state.nama.replaceAll("-"," ")} </div>
      telah melakukan presensi
      </div>
    )
  }
}

export default Success
