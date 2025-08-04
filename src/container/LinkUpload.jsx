import React from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Loading from "../modules/Loading"

import "./LinkUpload.css"
const settings = require("../settings.json")

class LinkUpload extends React.Component{
  constructor(props){
    super(props)
    this.Loader = new Loading()
  }
  async updateContent(self){
     this.Loader.showLoading()
    document.getElementById('link-upload-container').style.display = 'none'
    let datas = {
        link_tj : document.getElementById('link-tj').value,
        keterangan_tj : document.getElementById('keterangan-tj').value,
        id_content : document.getElementById('linkupload-id-content').innerHTML,
        id_kegiatan : document.getElementById('linkupload-id-kegiatan').innerHTML,
    }
    const response = await fetch(settings.serverURI + "/api/pengendalian/kkp/updateContent",{
      method:"PUT",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    const json  = await response.json()
    this.Loader.hideLoading()
    this.Loader.showPopUp(json.message)
    }
    tutup(){
      document.getElementById('link-upload-container').style.display ='none'
    }
  render(){
    return(
      <div id="link-upload-container">
      <div id="link-upload-object">
        <div class="card">
        <div class="card-body">
            <div class="card">
                <div class="card-body">
                    <b id="linkupload-id-content">Makan</b>
                    <b id="linkupload-id-kegiatan">Makan</b>
                </div>
            </div>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Link</label>
            <p>{}</p>
            <input type="email" class="form-control" id="link-tj" placeholder="http://"></input>
            </div>
      
            <div class="mb-3 input-data">
                <label htmlFor="keterangan-tj" className="form-label">Keterangan</label>
                <input type="text" class="form-control" id="keterangan-tj" placeholder="Keterangan"/>
            </div>
                  <button type="button" class="btn btn-warning ade" onClick={()=>this.updateContent()}>Upload</button>
                  <button type="button" class="btn btn-warning ade" onClick={()=>this.tutup()}>Tutup</button>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default LinkUpload;
