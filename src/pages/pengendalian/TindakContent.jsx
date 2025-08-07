import React from "react"
import "./TindakContent.css"
import Loading from '../../modules/Loading.js'
import { login, logout, isLoggedIn, convertMonthToIndonesia, changeDateFormat,getRandomID } from '../../modules/utils';
import Popup from "../../container/Popup"
const settings = require("../../settings.json")

class TindakContent       extends React.Component{
  constructor(props){
    super(props)
    this.Loader = new Loading()
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
            saran: undefined,
            approved : false
        }],
        refresh: 1,
        lewat_batas : false
    }
    
  }
  async uploadKKPContents(self){
     let datas = {
            user : localStorage.getItem('username'),
            id_content : getRandomID(8),
            id_kegiatan : this.state.upt.id_kegiatan,
            catatan : document.getElementById('kkpcontents-form-catatan').value,
            bidang : document.getElementById('kkpcontents-form-bidang').value,
            noberkas : document.getElementById('kkpcontents-form-noberkas').value,
            bulan : this.changeToMonthYear(document.getElementById('kkpcontents-form-bulan').value),
            saran : document.getElementById('kkpcontents-form-saran').value,
            keterangan : document.getElementById('kkpcontents-form-keterangan').value
    }
    this.Loader.showLoading()
    const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/uploadKKP/"+this.idKegiatan,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    const json  = await response.json()
    this.Loader.hideLoading()
    this.Loader.showPopUp(json.message)
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
    document.getElementById('navbar').style.display = 'none'

    // if(this.setTanggalAkhir(this.state.upt.tanggalb) ==)
  }
  async updateContent(self){
    this.Loader.showLoading()     
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
    this.Loader.hideLoading()
    this.Loader.showPopUp(json.message)
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
    this.Loader.showLoading()
    let upt_datas = await fetch(settings.serverURI + "/api/pengendalian/kkp/getKKP/"+this.idKegiatan);
    let json = await upt_datas.json()
    this.setState({
      upt:json.upt,
      contents:json.contents
    })
    this.Loader.hideLoading()
    let date = new Date().toString().split(" ")
    // console.log(date)
    let current_date = date[1] + "-" + date[2] + "-" + date[3]
    let batas_akhir = this.setTanggalAkhir(json.upt.tanggalb)
    console.log(new Date(current_date))
    console.log(batas_akhir)
    if(new Date(current_date) > new Date(batas_akhir)){
      this.setState({
        lewat_batas : true
      })
    }
  }
  test(){
    document.getElementById("popup-container").style.display = "flex"
  }
  async deleteContent(id_content){
    this.Loader.showLoading()
    let response = await fetch(settings.serverURI + "/api/pengendalian/kkp/deleteKKP/"+ id_content,{
        method:"DELETE"
    })
    let json = await response.json()
    this.Loader.hideLoading()
    this.Loader.showPopUp(json.message)
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
    window.location = '#kkpcontents-input-card'
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
  async uploadLink(id_kegiatan,id_content,link_tj,keterangan_tj){
    document.getElementById('link-upload-container').style.display = 'block'
    document.getElementById('linkupload-id-kegiatan').innerHTML = id_kegiatan
    document.getElementById('linkupload-id-content').innerHTML = id_content
    document.getElementById('keterangan-tj').value = keterangan_tj
    document.getElementById('link-tj').value = link_tj
   
  }
  setTanggalAkhir(ak){
    const date = new Date(ak);
    date.setDate(date.getDate()+10);
    let daysMonthYear = date.toString().split(" ")

    return daysMonthYear[1] + "-" + daysMonthYear[2] + "-" + daysMonthYear[3]
    // return tenDaysLater
  }
  formatDate(date){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  render(){
    return(
      <div id="tindak-container">
        <div class="alert alert-dark" role="alert">
                Dimohon untuk menyelesaikan sebelum tenggat waktu yang ditentukan
                </div>
            <div class="card" id='kkpcontents-card'>
                <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item"><b>UPT PPD {this.state.upt.nama_upt}</b></li>
                        <li class="list-group-item">Periode: <i>{this.state.upt.periodea} - {this.state.upt.periodeb}</i></li>
                        <li class="list-group-item">Tanggal Pengendalian: <i>{this.state.upt.tanggala} - {this.state.upt.tanggalb}</i></li>
                        <li class="list-group-item">Batas Waktu : {this.setTanggalAkhir(this.state.upt.tanggalb)}</li>
                    </ul>
                </div>
                </div>
            <div class="card" id='kkpcontents-table'>
                <div id="table-actions">
                    <i class="button-custom fa-solid fa-file"></i><p className="penjelasan">Link</p>
                    <i class="button-custom fa-solid fa-square-check"></i><p className="penjelasan">Disetujui oleh Ketua Tim</p>
                    <i class="button-custom fa-solid fa-minus"></i><p className="penjelasan">Belum direview</p>
                </div>
                <table class="table">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Acc</th>
                <th scope="col">Catatan</th>
                <th scope="col">Bidang</th>
                <th scope="col">No Berkas/BKU</th>
                <th scope="col">Bulan</th>
                <th scope="col">Saran</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Link</th>
                <th scope="col">Aksi</th>
                </tr> 
            </thead>
            <tbody>
                {
                    this.state.contents.map((data,num)=>{
                        let approvedClass = 'fa-solid fa-minus'
                        if(data.approved == true){
                          approvedClass ="button-custom fa-solid fa-square-check"
                        }
                        console.log(this.state.lewat_batas)
                        if(this.state.lewat_batas==true){
                            return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td><i class={approvedClass}></i></td>
                                <td><p className="catatan-contents">{data.catatan}</p></td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{changeDateFormat(data.bulan)}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan_tj}</td>
                                <td><a href={data.link_tj} target="_blank">{data.link_tj}</a></td>
                                <td>Waktu Habis</td>
                            </tr>
                        )


                        }
                        return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td><i class={approvedClass}></i></td>
                                <td><p className="catatan-contents">{data.catatan}</p></td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{changeDateFormat(data.bulan)}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan_tj}</td>
                                <td><a href={data.link_tj} target="_blank">{data.link_tj}</a></td>
                                <td><i class="button-custom fa-solid fa-cloud-arrow-up" onClick={()=>this.uploadLink(data.id_kegiatan,data.id_content,data.link_tj,data.keterangan_tj)}></i><i class="button-custom fa-solid fa-rotate-right" onClick={()=>this.getKKPidentity(this)}></i></td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
        
        </div>
      </div>
    )
  }
}

export default TindakContent
