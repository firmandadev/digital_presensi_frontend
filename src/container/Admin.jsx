
import './Admin.css';
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'

class Admin extends React.Component {
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
      }]
    }
    this.getDatas()
  }
  async getDatas(){
    let datas = await fetch("http://localhost:7000/api/getAllDatas",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({datas:json_datas})
  }
  render() {
    return(
      <div id='table-container'>
        <div class="card">
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
                <td><img className='Admin-ttd' src={data.signature}></img></td>
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

export default Admin;
