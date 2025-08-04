import React from "react"
import "./kkp.css"
import Loading from '../../modules/Loading.js'
import { login, logout, isLoggedIn, changeDateFormat, getRandomID } from '../../modules/utils';
import Popup from "../../container/Popup"
const settings = require("../../settings.json")

class Kkp extends React.Component{
  constructor(props){
    super(props)
    isLoggedIn()
    this.LoadingGif = new Loading()
    this.state={
        upt:[],
        datas:[{
            id_kegiatan : undefined,
            nama_upt : undefined,
            tanggala : undefined,
            tanggalb : undefined,
            periodea : "0000-00-00",
            periodeb : "0000-00-00",
            linknhp : "",
            linklhp : "",
            linksurat : "",
            linkblangko : "",
            key : ""
        }]
    }
    this.getUPTDatas()
  }
  changeToMonthYear(inputDate){
    const date = new Date(inputDate);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    return(monthYear)

  }

    async updateKKP(self){
      this.LoadingGif.showLoading()
      let datas = {
        key : document.getElementById('kkp-form-key').value,
        id_kegiatan : document.getElementById('kkp-form-id').value,
        nama_upt : document.getElementById('kkp-form-upt').value,
        tanggala : document.getElementById('kkp-form-tanggala').value,
        tanggalb : document.getElementById('kkp-form-tanggalb').value,
        periodea : document.getElementById('kkp-form-periodea').value,
        periodeb : document.getElementById('kkp-form-periodeb').value,
        linknhp : document.getElementById('kkp-form-nhp').value,
        linklhp : document.getElementById('kkp-form-lhp').value,
        linksurat : document.getElementById('kkp-form-surat').value,
        linkblangko : document.getElementById('kkp-form-blangko').value,
      }
      const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/updateKKP/"+datas.id_kegiatan,{
        method:"PUT",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(datas)
      })
      const json  = await response.json()
      this.LoadingGif.hideLoading()
      this.LoadingGif.showPopUp("Berhasil Update")
    }
  async uploadKKP(self){
    this.LoadingGif.showLoading()
    let datas = {
      id_kegiatan : getRandomID(),
      nama_upt : document.getElementById('kkp-form-upt').value,
      tanggala : document.getElementById('kkp-form-tanggala').value,
      tanggalb : document.getElementById('kkp-form-tanggalb').value,
      periodea : document.getElementById('kkp-form-periodea').value,
      periodeb : document.getElementById('kkp-form-periodeb').value,
      linknhp : document.getElementById('kkp-form-nhp').value,
      linklhp : document.getElementById('kkp-form-lhp').value,
      linksurat : document.getElementById('kkp-form-surat').value,
      linkblangko : document.getElementById('kkp-form-blangko').value,
      key : getRandomID(12)
    }
    console.log(datas)
    const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/uploadKKP",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    this.LoadingGif.hideLoading()
   
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
    this.LoadingGif.showLoading()
      let upt_datas = await fetch(settings.serverURI + "/api/pengendalian/kkp/getKKP");
      let json = await upt_datas.json()
        this.setState({
            datas:json
        })
        document.getElementById("loading-gif").style.display = "none";
        console.log(json)
    this.LoadingGif.hideLoading()
  }
  componentDidMount(){
    this.getKKPDatas()
  }
  setUpdate(data){
    document.getElementById('kkp-form-key').value = data.key
    document.getElementById('kkp-form-id').value = data.id_kegiatan
    document.getElementById('kkp-form-upt').value = data.nama_upt
    document.getElementById('kkp-form-tanggala').value = data.tanggala
    document.getElementById('kkp-form-tanggalb').value = data.tanggalb
    document.getElementById('kkp-form-periodea').value = data.periodea
    document.getElementById('kkp-form-periodeb').value = data.periodeb
    document.getElementById('kkp-form-nhp').value = data.linknhp
    document.getElementById('kkp-form-lhp').value = data.linklhp
    document.getElementById('kkp-form-surat').value = data.linksurat
    document.getElementById('kkp-form-blangko').value = data.linkblangko
  }

  render(){
    return(
      <div id="kkp-container">
            <div class="card" id='kkp-card'>
            <div class="card" id='kkp-table'>
                <table class="table">
            <thead>
                <tr>
                <th scope="col">Key</th>
                <th scope="col">ID</th>
                <th scope="col">Nama UPT</th>
                <th scope="col">Periode Awal</th>
                <th scope="col">Periode Akhir</th>
                <th scope="col">KKP</th>
                <th scope="col">NHP</th>
                <th scope="col">LHP</th>
                <th scope="col">Surat</th>
                <th scope="col">Blangko</th>
                <th scope="col">Aksi</th>
                </tr> 
            </thead>
            <tbody>
                {
                this.state.datas.map((data)=>{
                    let link = `/pengendalian/kkp/${data.id_kegiatan}`
                    return(
                        <tr>
                          <td>{data.key}</td>
                        <td scope="row">{data.id_kegiatan}</td>
                        <td>{data.nama_upt}</td>
                        <td>{changeDateFormat(data.periodea)}</td>
                        <td>{changeDateFormat(data.periodeb)}</td>
                        <td><a href={link}>Link</a></td>
                        <td><a href={data.linknhp}>Link</a></td>
                        <td><a href={data.linklhp}>Link</a></td>
                        <td><a href={data.linksurat}>Link</a></td>
                        <td><a href={data.linkblangko}>Link</a></td>
                        <td><i class="button-custom fa-solid fa-pen" onClick={()=>this.setUpdate(data)}></i><i class=" button-custom fa-solid fa-trash"/></td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
        
        <div class="card" id='kkp-input-card'>
        <div class="card-body">
                   <div class="mb-3 input-data">
                  <input readOnly type="text" class="form-control" id="kkp-form-key" placeholder="Tanggal Awal"/>
                <input readOnly type="text" class="form-control" id="kkp-form-id" placeholder="Tanggal Awal"/>
            </div>
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
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-nhp" className="form-label">Link NHP</label>
                <input type="text" class="form-control" id="kkp-form-nhp" placeholder="Link NHP"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-lhp" className="form-label">Link LHP</label>
                <input type="text" class="form-control" id="kkp-form-lhp" placeholder="Link LHP"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-surat" className="form-label">Link Surat</label>
                <input type="text" class="form-control" id="kkp-form-surat" placeholder="Link Surat"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkp-form-blangko" className="form-label">Link Blangko</label>
                <input type="text" class="form-control" id="kkp-form-blangko" placeholder="Link Blangko"/>
            </div>
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.uploadKKP(this)}>Buat</button>
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.updateKKP(this)}>Update</button>
        </div>
        </div>
        </div>
          
      </div>
    )
  }
}

export default Kkp
