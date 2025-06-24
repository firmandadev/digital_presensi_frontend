import React from "react"
import "./Success.css"
import headerImage from "../img/header.jpg"
const settings = require("../settings.json")

class Success extends React.Component{
  constructor(props){
    super(props)
    this.state={
      nama: window.location.href.split("/")[5],
      candaan : undefined
    }
  }
  async getCandaan(){
    let data = await fetch("https://candaan-api.vercel.app/api/text/random")
    let candaans = await data.json()
    this.setState({
      candaan:candaans.data
    })

  }
    componentDidMount(){
      this.getCandaan()
    document.getElementById("navbar").style.display = "none";
    let uri = window.location.href.split("/")[5]
    this.setState({
      nama : uri
    })
    }


  
  render(){
    let nama = this.state.nama.replaceAll("-"," ")

    return(
      <div id="success-container">
      <div class="card" id="success-card">
	<div class="card-body">
	    <div id="success-text">
	    <div>Terima Kasih Bapak/Ibu/Saudara</div>
	    <div id="success-nama">{nama} </div>
	    <div>telah melakukan presensi, Selamat Datang!</div>
	    <div>______________________________________</div>
	    <div id="candaan">
	    <div>______________________________________</div>
		{this.state.candaan}
	    </div>
	  </div>

	  </div>
	</div>
            </div>
    )
  }
}

export default Success
