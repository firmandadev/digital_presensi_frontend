
import './Home.css';
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state ={
        kegiatan : [{
            id_kegiatan : undefined,
            nama_kegiatan : undefined,
            waktu_akhir : undefined,
            waktu_awal : undefined
        }]
    }
    this.getDatas()
}
async uploadKegiatanBaru(self){
  let datas = {
    id_kegiatan : self.getRandomID(),
    nama_kegiatan : document.getElementById('Form_Kegiatan').value,
    waktu_akhir : '00',
    waktu_awal : '00',
    tanggal_kegiatan : document.getElementById('Form_Tanggal').value
  }
  const response = await fetch("http://localhost:7000/api/postKegiatan",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
  console.log(await response.json())
}
getRandomID(){
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random()*10000)
}
async getDatas(){
    let datas = await fetch("http://localhost:7000/api/getAllKegiatan",{
      method:"GET"
    })
    let json_datas = await datas.json()
    this.setState({kegiatan:json_datas})
  }
  render(){
    return(
      <div id='home-container'>
     <div class="card" id='card-home'>
        <div class="card-body">
            {this.state.kegiatan.map(data=>{
                let link = '/presensi/' + data.id_kegiatan
                return(
                    <div key={data.id_kegiatan}>
                    <a href={link} key={data.id_kegiatan}>{data.nama_kegiatan}</a><br></br>
                    </div>
                )
            })}
            
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
    </div>)
    }
}

export default Home;
