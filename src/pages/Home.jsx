import './Home.css';
import Popup from '../container/Popup.jsx'
import Loading from "../container/Loading.jsx"
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'
import Pagination from '../container/Pagination.jsx'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
const settings = require('../settings.json')
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state ={
        kegiatan : [{
            id_kegiatan : undefined,
            nama_kegiatan : undefined,
            waktu_akhir : undefined,
            waktu_awal : undefined
        }],
	currentIndex:1,
	amount:5,
	popup_message :"Lorem ipsum dolor si amet"
    }
    this.PaginationRef = React.createRef()
}
componentDidMount(){
  this.getDatas()
  document.getElementById("loading-gif").style.display="block"
}
async uploadKegiatanBaru(self){
  document.getElementById("loading-gif").style.display="block"
  let datas = {
    id_kegiatan : self.getRandomID(),
    nama_kegiatan : document.getElementById('Form_Kegiatan').value,
    waktu_akhir : '00',
    waktu_awal : '00',
    tanggal_kegiatan : document.getElementById('Form_Tanggal').value
  }
  const response = await fetch(settings.serverURI + "/api/postKegiatan",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
  const json  = await response.json()
  document.getElementById("popup-container").style.display = "flex"
  this.setState({popup_message:json.message})
  document.getElementById("loading-gif").style.display="none"
}
getRandomID(){
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random()*10000)
}
async getDatas(){
  let datas = await fetch(settings.serverURI + "/api/getAllKegiatan",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({kegiatan:json_datas})
    document.getElementById("loading-gif").style.display="none"
  }
  render(){
    return(
	    <div>
	    <Popup text={this.state.popup_message} />
      <div id='home-container'>
     <div class="card" id='card-home'>
        <div class="card-body" id="home-table">
	      <table class="table" id="table-kegiatan">
		<thead>
		<tr>
		  <th scope="col">#</th>
		  <th scope="col">Nama Kegiatan</th>
		  <th scope="col">Link</th>
		</tr>
	      </thead>
	      <tbody>

     {this.state.kegiatan.map((data,nume)=>{
		let currentIndex = this.state.currentIndex
		let amount = this.state.amount
		let startIndex = (currentIndex*amount)-amount
		let endIndex = (currentIndex*amount)-1
                let link = '/presensi/' + data.id_kegiatan
		if(nume>=startIndex && nume <=endIndex){
                return(
		<tr>
		  <th scope="row">{nume+1}</th>
		  <td>{data.nama_kegiatan}</td>
		  <td><a href={link}>
		  <button type="button" id="btnLink" class="btn btn-secondary">Link</button>
		  </a></td>
		</tr>
                )}
            })}
		</tbody>
	    </table>
	    <div id="paginationCont">
	    <Pagination datas={this.state.kegiatan} pageNumber={Math.ceil(this.state.kegiatan.length/this.state.amount)} amount={5} parent={this}/>
	    </div>
        </div>
        </div>
         <div class="card" id='card-home'>
        <div class="card-body">
            Buat Baru
            <div class="mb-3 mt-3 input-data">
              <input type="text" class="form-control" id="Form_Kegiatan" placeholder="Nama Kegiatan"/>
            </div>
            <div class="mb-3 input-data">
              <input type="date" class="form-control" id="Form_Tanggal" placeholder="Tanggal Kegiatan"/>
            </div>
             <button type="button" class="btn btn-primary" onClick={()=>this.uploadKegiatanBaru(this)}>Buat</button>
        </div>
        </div>
    </div></div>)
    }
}

export default Home;
