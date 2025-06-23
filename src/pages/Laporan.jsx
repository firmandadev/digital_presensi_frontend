import Loading from '../container/Loading.jsx'
import './Laporan.css';
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'
const settings = require('../settings.json')

class Laporan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      datas : [{
        nama : "undefined",
        unit_kerja : "undefined",
        jabatan : "undefined",
        signature : "undefined",
        upload_time: "undefined",
        id_acara : "undefined"
      }],
      kegiatan:[{
	id_kegiatan:undefined,
	nama_kegiatan:undefined
      }]
    }
  }
  componentDidMount(){
    this.getKegiatan()
    this.getDatas()
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
    let selected = document.getElementById("laporan-form").value
    let datas = await fetch(settings.serverURI + "/api/getDatas/"+selected,{
      method:"GET"
    })
    let json_datas = await datas.json()
    self.setState({datas:json_datas})
  }
  async getKegiatan(){
    let datas = await fetch(settings.serverURI + "/api/getAllKegiatan",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({kegiatan:json_datas})
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
            )
        })
    }
      </tbody>
    </table>
     </div>
    </div>
    </div>)
  }
}

export default Laporan;
