import Loading from '../container/Loading.jsx'
import './Laporan.css';
import SignatureCanvas from 'react-signature-canvas'
import Pagination from "../container/Pagination.jsx"
import React, { useRef } from 'react'
import { login, logout, isLoggedIn, convertMonthToIndonesia, changeDateFormat,getRandomID } from '../modules/utils';
const settings = require('../settings.json')

class Laporan extends React.Component {
  constructor(props){
    super(props)
    isLoggedIn()
    this.state = {
      datas : [{
        nama : "undefined",
        unit_kerja : "undefined",
        jabatan : "undefined",
        signature : "undefined",
        upload_time: "undefined",
        id_acara : "undefined"
      }],
      currentIndex:1,
      amount:10,
      kegiatan:[{
	id_kegiatan:undefined,
	nama_kegiatan:undefined
      }]
    }
  }
  componentDidMount(){
    this.getKegiatan()
    //this.getDatas()
  }

  async getDatas(){
    document.getElementById("loading-gif").style.display="block"
    let datas = await fetch(settings.serverURI + "/api/getAllDatas",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({datas:json_datas})

    document.getElementById("loading-gif").style.display="none"
  }

  async getDataPresensi(self){

    document.getElementById("loading-gif").style.display="block"
    let selected = document.getElementById("laporan-form").value
    let datas = await fetch(settings.serverURI + "/api/getDatas/"+selected,{
      method:"GET"
    })
    let json_datas = await datas.json()
    self.setState({datas:json_datas})

    document.getElementById("loading-gif").style.display="none"
  }
  async getKegiatan(){
    document.getElementById("loading-gif").style.display="block"
    let datas = await fetch(settings.serverURI + "/api/getAllKegiatan",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({kegiatan:json_datas})

    document.getElementById("loading-gif").style.display="none"
  }
  render() {
    return(
      <div id='table-container'>
      <div id='laporan-form-container'>
      <select class="form-select" id="laporan-form" aria-label="Default select example">
      <option selected>Kegiatan</option>
      {
	this.state.kegiatan.map((data,index)=>{
	  return(
	    <option value={data.id_kegiatan}>{data.nama_kegiatan}</option>
	  )
	})

      }
      </select>
      <button type="button" class="btn btn-dark" onClick={()=>this.getDataPresensi(this)}>Cari</button>
      </div>
        <div class="card" id="laporan-card">
  <div class="card-body">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Acara</th>
          <th scope="col">Nama</th>
          <th scope="col">Unit Kerja</th>
          <th scope="col">Jabatan</th>
          <th scope="col">Waktu</th>
          <th scope="col">Tanda Tangan</th>
	  <th></th>
        </tr>
      </thead>
      <tbody itemID='table-content'>
        {
          this.state.datas.map((data,index)=>{
		let currentIndex = this.state.currentIndex
		let amount = this.state.amount
		let startIndex = (currentIndex*amount)-amount
		let endIndex = (currentIndex*amount)-1
                let link = '/presensi/' + data.id_kegiatan
		if(index>=startIndex && index <=endIndex){

            return(
              <tr>
                <th scope="row">{index+1}</th>
                <td>{data.id_acara}</td>
                <td>{data.nama}</td>
                <td>{data.unit_kerja}</td>
                <td>{data.jabatan}</td>
                <td>{data.upload_time}</td>
                <td><img className='laporan-ttd' src={data.signature}></img></td>
		<td></td>
              </tr>
            )}
        })
    }
      </tbody>
    </table>
       </div>       </div> <Pagination datas={this.state.datas} pageNumber={Math.ceil(this.state.datas.length/this.state.amount)} amount={this.state.amount} parent={this}/>



    </div>)
  }
}

export default Laporan;
