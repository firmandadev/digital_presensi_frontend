import React from "react"
import "./KKPContents.css"
import { login, logout, isLoggedIn } from '../../modules/utils';
import Popup from "../../container/Popup"
const settings = require("../../settings.json")

class KKPContents       extends React.Component{
  constructor(props){
    super(props)
    isLoggedIn()
    this.idKegiatan = window.location.href.split('/').slice(-1)[0];
    this.state={
        upt:{},
        contents : [{
            bidang: undefined,
            user : undefined,
            catatan: undefined,
            id_kegiatan: undefined,
            keterangan: undefined,
            bulan : undefined,
            noberkas : undefined,
            saran: undefined
        }],
        refresh: 1
    }
    
  }
  getRandomID(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)] + Math.floor(Math.random()*100000)
}
  async uploadKKPContents(self){
     let datas = {
            user : localStorage.getItem('username'),
            id_content : this.getRandomID(),
            id_kegiatan : this.state.upt.id_kegiatan,
            catatan : document.getElementById('kkpcontents-form-catatan').value,
            bidang : document.getElementById('kkpcontents-form-bidang').value,
            noberkas : document.getElementById('kkpcontents-form-noberkas').value,
            bulan : this.changeToMonthYear(document.getElementById('kkpcontents-form-bulan').value),
            saran : document.getElementById('kkpcontents-form-saran').value,
            keterangan : document.getElementById('kkpcontents-form-keterangan').value
    }
    document.getElementById("loading-gif").style.display = "block";
    const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/uploadKKP/"+this.idKegiatan,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    const json  = await response.json()

    document.getElementById("loading-gif").style.display = "none";
    document.getElementById("popup-container").style.display = "flex"
    document.getElementById('popup-box-text').innerHTML = json.message;
    document.getElementById('kkpcontents-form-catatan').value = ""
    document.getElementById('kkpcontents-form-bidang').value = ""
    document.getElementById('kkpcontents-form-noberkas').value = ""
    document.getElementById('kkpcontents-form-bulan').value = ""
    document.getElementById('kkpcontents-form-saran').value = ""
    document.getElementById('kkpcontents-form-keterangan').value = ""
    this.getKKPidentity()

  }
    changeToMonthYear(inputDate){
        const date = new Date(inputDate);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return(monthYear)

    }
  componentDidMount(){
    this.getKKPidentity()
  }
  async updateContent(self){
        document.getElementById("loading-gif").style.display = "block";
         let datas = {
            user : localStorage.getItem('username'),
            id_content :  document.getElementById('kkpcontents-form-id').value,
            id_kegiatan : this.state.upt.id_kegiatan,
            catatan : document.getElementById('kkpcontents-form-catatan').value,
            bidang : document.getElementById('kkpcontents-form-bidang').value,
            noberkas : document.getElementById('kkpcontents-form-noberkas').value,
            bulan : this.changeToMonthYear(document.getElementById('kkpcontents-form-bulan').value),
            saran : document.getElementById('kkpcontents-form-saran').value,
            keterangan : document.getElementById('kkpcontents-form-keterangan').value
        }
        const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/updateContent",{
        method:"PUT",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(datas)
        })
        const json  = await response.json()
        document.getElementById("loading-gif").style.display = "none";
        document.getElementById("popup-container").style.display = "flex"
        document.getElementById('popup-box-text').innerHTML = json.message;
        document.getElementById('kkpcontents-form-id').value = ""
        document.getElementById('kkpcontents-form-catatan').value = ""
        document.getElementById('kkpcontents-form-bidang').value = ""
        document.getElementById('kkpcontents-form-noberkas').value = ""
        document.getElementById('kkpcontents-form-bulan').value = ""
        document.getElementById('kkpcontents-form-saran').value = ""
        document.getElementById('kkpcontents-form-keterangan').value = ""
        this.getKKPidentity()
        document.getElementById('update-content-button').style.display = "none"
        document.getElementById('upload-content-button').style.display = "block"
    }
  async getKKPidentity(){
        document.getElementById("loading-gif").style.display = "block";
        let upt_datas = await fetch(settings.serverURI + "/api/pengendalian/kkp/getKKP/"+this.idKegiatan);
        let json = await upt_datas.json()
        this.setState({
            upt:json.upt,
            contents:json.contents
        })
        document.getElementById("loading-gif").style.display = "none";

  }
  test(){
        document.getElementById("popup-container").style.display = "flex"
  }
  async deleteContent(id_content){
    document.getElementById("loading-gif").style.display = "block";
    let response = await fetch(settings.serverURI + "/api/pengendalian/kkp/deleteKKP/"+ id_content,{
        method:"DELETE"
    })
    let json = await response.json()
    document.getElementById("loading-gif").style.display = "none";
    document.getElementById("popup-container").style.display = "flex"
    document.getElementById('popup-box-text').innerHTML = json.message;
    this.getKKPidentity()

  }
  printDoc(self){
     const tableContent = document.getElementById("kkpcontents-table").innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(`
    <html>
      <head>
        <title>KKP Contents Table</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
            @page {
    size: landscape;
  }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
            #title-print{
            text-align:center
            }
        </style>
      </head>
      <body>
        <div id='title-print'>
        <b>Kertas Kerja Pemeriksaan</b><br />
        <b>UPT PPD ${this.state.upt.nama_upt}</b><br />
        <b>Periode ${this.state.upt.tanggala} - ${this.state.upt.tanggalb}</b>
        </div><br />
        ${tableContent}
        <div id='title-print'><br /><br />
        <b>Mengetahui,</b><br />
        <b>Ketua Tim</b><br /><br /><br />
        <b>Pambudi Cahyanto, S.H., M.H.<br />
        <b>19771014 199903 1 001</b>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close(); // necessary for IE >= 10       // necessary for some browsers
  printWindow.print();
  printWindow.close();
  }
  previewDoc(self){
    document.location = '/pengendalian/kkp/prev/' + this.state.upt.id_kegiatan
  }
  setUpdateContent(data){
            document.getElementById('kkpcontents-form-id').value = data.id_content
            document.getElementById('kkpcontents-form-catatan').value = data.catatan
            document.getElementById('kkpcontents-form-bidang').value = data.bidang
            document.getElementById('kkpcontents-form-noberkas').value = data.noberkas
            document.getElementById('kkpcontents-form-bulan').value = data.bulan
            document.getElementById('kkpcontents-form-saran').value = data.saran
            document.getElementById('kkpcontents-form-keterangan').value = data.keterangan
            document.getElementById('update-content-button').style.display = "block"
            document.getElementById('upload-content-button').style.display = "none"
  }
  abortContent(){
    document.getElementById('kkpcontents-form-id').value = ""
            document.getElementById('kkpcontents-form-catatan').value = ""
            document.getElementById('kkpcontents-form-bidang').value = ""
            document.getElementById('kkpcontents-form-noberkas').value = ""
            document.getElementById('kkpcontents-form-bulan').value = ""
            document.getElementById('kkpcontents-form-saran').value = ""
            document.getElementById('kkpcontents-form-keterangan').value = ""
            document.getElementById('update-content-button').style.display = "none"
            document.getElementById('upload-content-button').style.display = "block"
  }
  render(){
    return(
      <div id="kkpcontents-container">
            <div class="card" id='kkpcontents-card'>
                <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item"><b>UPT PPD {this.state.upt.nama_upt}</b></li>
                        <li class="list-group-item">Periode: <i>{this.state.upt.periodea} - {this.state.upt.periodeb}</i></li>
                        <li class="list-group-item">Tanggal Pengendalian: <i>{this.state.upt.tanggala} - {this.state.upt.tanggalb}</i></li>
                    </ul>
                </div>
                </div>
            <div class="card" id='kkpcontents-table'>
                <div id="table-actions">
                    <i class="button-custom fa-solid fa-rotate-right" onClick={()=>this.getKKPidentity(this)}></i>
                    <i class="button-custom fa-solid fa-print" onClick={()=>this.printDoc(this)}></i>
                    <i class="button-custom fa-solid fa-eye" onClick={()=>this.previewDoc(this)}></i>
                </div>
                <table class="table">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">User</th>
                <th scope="col">Catatan</th>
                <th scope="col">Bidang</th>
                <th scope="col">No Berkas/BKU</th>
                <th scope="col">Bulan</th>
                <th scope="col">Saran</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Aksi</th>
                </tr> 
            </thead>
            <tbody>
                {
                    this.state.contents.map((data,num)=>{
                      if(localStorage.getItem('username') == data.user){
                        return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td>{data.user}</td>
                                <td>{data.catatan}</td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{data.bulan}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan}</td>
                                <td><i class="button-custom fa-solid fa-pen" onClick={()=>this.setUpdateContent(data)}></i><i class=" button-custom fa-solid fa-trash" onClick={()=>this.deleteContent(data.id_content)}></i></td>
                            </tr>
                        )}else{
                          return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td>{data.user}</td>
                                <td>{data.catatan}</td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{data.bulan}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan}</td>
                                <td><i>Bukan User</i></td>
                            </tr>)
                        }
                    })
                }
            </tbody>
            </table>
        </div>
        <div class="card" id='kkpcontents-input-card'>
        <div class="card-body">
          <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-id" className="form-label">ID</label>
                <textarea type="text" class="form-control" id="kkpcontents-form-id" placeholder="ID" readOnly/>
            </div>
            <div className="mb-3 input-data">
                <label htmlFor="kkp-form-upt" className="form-label">Bidang</label>
                <select className="custom-select" id='kkpcontents-form-bidang'>
                    <option value="keuangan">Keuangan</option>
                    <option value="samsat">Samsat</option>
                    <option value="perlengkapan">Perlengkapan</option>
                    <option value="penagihan">Penagihan</option>
                    <option value="pendataan">Pendataan</option>
                    <option value="pekerjaan fisik">Pekerjaan Fisik</option>
                     <option value="kepegawaian">Kepegawaian</option>
                </select>
            </div>
             <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-catatan" className="form-label">Catatan</label>
                <textarea type="text" class="form-control" id="kkpcontents-form-catatan" placeholder="Catatan"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-noberkas" className="form-label">No Berkas</label>
                <input type="text" class="form-control" id="kkpcontents-form-noberkas" placeholder="No Berkas"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-bulan" className="form-label">Bulan (Wajib diisi lagi waktu update)</label>
                <input type="date" class="form-control" id="kkpcontents-form-bulan" placeholder="Bulan"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-saran" className="form-label">Saran</label>
                <textarea type="text" class="form-control" id="kkpcontents-form-saran" placeholder="Saran"/>
            </div>
            <div class="mb-3 input-data">
                <label htmlFor="kkpcontents-form-keterangan" className="form-label">Keterangan</label>
                <input type="text" class="form-control" id="kkpcontents-form-keterangan" placeholder="Keterangan"/>
            </div>
            <div id="button-container">
               <button type="button" className="btn btn-primary" id='upload-content-button' onClick={()=>this.uploadKKPContents(this)}>Buat</button>
              <button type="button" className="btn btn-primary" id='update-content-button' onClick={()=>this.updateContent(this)}>Update</button>
              <button type="button" className="btn btn-primary" id='abort-content-button' onClick={()=>this.abortContent(this)}>Batal</button>
            </div>
           
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default KKPContents
