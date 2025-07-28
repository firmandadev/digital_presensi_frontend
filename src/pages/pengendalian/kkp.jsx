import React from "react"
import "./kkp.css"
import Popup from "../../container/Popup"
const settings = require("../../settings.json")

class Kkp extends React.Component{
  constructor(props){
    super(props)
    this.state={
        upt:[],
        datas:[{
            id_kegiatan : undefined,
            nama_upt : undefined,
            tanggala : undefined,
            tanggalb : undefined,
            periodea : undefined,
            periodeb : undefined,
        }]
    }
    this.getUPTDatas()
  }
  getRandomID(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random()*10000)
}
  async uploadKKP(self){
        let datas = {
            id_kegiatan : self.getRandomID().toUpperCase(),
            nama_upt : document.getElementById('kkp-form-upt').value,
            tanggala : document.getElementById('kkp-form-tanggala').value,
            tanggalb : document.getElementById('kkp-form-tanggalb').value,
            periodea : document.getElementById('kkp-form-periodea').value,
            periodeb : document.getElementById('kkp-form-periodeb').value,
    }
    const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/uploadKKP",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    const json  = await response.json()
  }
   async getUPTDatas(){
        let upt_datas = await fetch("https://firmandadev.github.io/datas_apis/datas.json");
        let json = await upt_datas.json()
        this.setState({
            upt : json.upt,
            jabatan : json.jabatan
        })
  }
  async getKKPDatas(){
        let upt_datas = await fetch(settings.serverURI + "/api/pengendalian/kkp/getKKP");
        let json = await upt_datas.json()
        this.setState({
            datas:json
        })
  }
  componentDidMount(){
    this.getKKPDatas()
  }

  render(){
    return(
      <div id="kkp-container">
            <div class="card" id='kkp-card'>
            <div class="card" id='kkp-table'>
                <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Nama UPT</th>
                <th scope="col">Periode Awal</th>
                <th scope="col">Periode Akhir</th>
                <th scope="col">KKP</th>
                <th scope="col">Aksi</th>
                </tr> 
            </thead>
            <tbody>
                {
                this.state.datas.map((data)=>{
                    let link = `/pengendalian/kkp/${data.id_kegiatan}`
                    return(
                        <tr>
                        <td scope="row">{data.id_kegiatan}</td>
                        <td>{data.nama_upt}</td>
                        <td>{data.periodea}</td>
                        <td>{data.periodeb}</td>
                        <td><a href={link}>Link</a></td>
                        <td>Hapus</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
        <div class="card" id='kkp-input-card'>
        <div class="card-body">
            <div className="mb-3 input-data">
                <label htmlFor="kkp-form-upt" className="form-label">Unit Kerja</label>
                <select className="custom-select" id='kkp-form-upt'>
                <option selected className='custom-option'>Unit Kerja</option>
                { 
                this.state.upt.map((data,num)=>{
                if(num<=4){
                    return(
                    <option value={data}>Bidang {data}</option>

                    )
                }
                return(
                    <option value={data}>UPT PPD {data}</option>
                )
                })
                }
                </select>
            </div>
             <div class="mb-3 input-data">
                <label htmlFor="kkp-form-tanggala" className="form-label">Tanggal Pengendalian Awal</label>
                <input type="date" class="form-control" id="kkp-form-tanggala" placeholder="Tanggal Awal"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-tanggalb" className="form-label">Tanggal Pengendalian Akhir</label>
                <input type="date" class="form-control" id="kkp-form-tanggalb" placeholder="Tanggal Akhir"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-periodea" className="form-label">Periode Awal</label>
                <input type="date" class="form-control" id="kkp-form-periodea" placeholder="Periode Awal"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkpform-periodeb" className="form-label">Periode Akhir</label>
                <input type="date" class="form-control" id="kkp-form-periodeb" placeholder="Periode Akhir"/>
            </div>
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.uploadKKP(this)}>Buat</button>
        </div>
        </div>
        </div>
          
      </div>
    )
  }
}

export default Kkp
