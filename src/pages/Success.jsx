import React from "react"
import "./Success.css"
import headerImage from "../img/header.jpg"
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
      <img src={headerImage} id="headerImage"></img>
      <div>
      <div>Terima Kasih Bapak/Ibu</div>
      <div id="success-nama">{this.state.nama.replaceAll("-"," ")} </div>
      <div>telah melakukan presensi</div>
      </div>
      </div>
    )
  }
}

export default Success
