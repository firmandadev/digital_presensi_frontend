import React from "react"
import "./KKPContents.css"
import Popup from "../../container/Popup"
const settings = require("../../settings.json")

class KKPContents       extends React.Component{
  constructor(props){
    super(props)
    this.idKegiatan = window.location.href.split('/').slice(-1)[0];
    this.state={
        upt:{},
        contents : [{
            bidang: undefined,
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
  render(){
    return(
      <div id="kkpcontents-container">
            <div class="card" id='kkpcontents-card'>
                <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">{this.state.upt.id_kegiatan}</li>
                        <li class="list-group-item">UPT PPD {this.state.upt.nama_upt}</li>
                        <li class="list-group-item">Periode: {this.state.upt.periodea} - {this.state.upt.periodeb}</li>
                        <li class="list-group-item">Tanggal Pengendalian: {this.state.upt.tanggala} - {this.state.upt.tanggalb}</li>
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
                        return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td>{data.catatan}</td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{data.bulan}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan}</td>
                                <td><i class=" button-custom fa-solid fa-trash" onClick={()=>this.deleteContent(data.id_content)}></i></td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
        <div class="card" id='kkpcontents-input-card'>
        <div class="card-body">
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
                <label htmlFor="kkpcontents-form-bulan" className="form-label">Bulan</label>
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
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.uploadKKPContents(this)}>Buat</button>
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={()=>this.test(this)}>Test</button>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default KKPContents
