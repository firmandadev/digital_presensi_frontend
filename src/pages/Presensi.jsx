import logo from '../logo.svg';
import './Presensi.css';
import SignatureCanvas from 'react-signature-canvas'
import Popup from '../container/Popup.jsx'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Loading from "../container/Loading.jsx"
const settings = require('../settings.json')

function Presensi() {
  const sigCanvas = useRef(null)
  let idKegiatan = window.location.href.split('/').slice(-1)[0]
  const [content, setContent] = useState(null)
  useEffect(()=>{
    document.getElementById("loading-gif").style.display="block"
    document.getElementById("navbar").style.display="none";	
    fetch(settings.serverURI + "/api/getKegiatan/"+idKegiatan)
    .then(res=>res.json()).then(res=>{setContent(res); document.getElementById('judul-presensi').innerHTML = res.nama_kegiatan;
    document.getElementById("loading-gif").style.display="none";	
    }).catch(err=>console.log(err));
  },[])
  
 function base64ToBlob(base64, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
} 
  function clearSignature(){
    sigCanvas.current.clear()
  }
  async function Kirim(){
    document.getElementById("loading-gif").style.display="block"
    let sentDatas = {
      nama : document.getElementById('Form_Nama').value,
      unit_kerja : document.getElementById('Form_UPT').value,
      jabatan : document.getElementById('Form_Jabatan').value,
      signature : sigCanvas.current.toDataURL(),
      upload_time: new Date().toLocaleString(),
      id_acara : window.location.href.split('/').slice(-1)[0]
    }
    const response = await fetch(settings.serverURI + "/api/postData",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(sentDatas)
    })
    let json_data = await response.json()
    document.getElementById("loading-gif").style.display="none"
    document.getElementById('popup-box-text').innerHTML= json_data.message

    const secretKey="memes"

    window.location.href = "/presensi/success/" + sentDatas.nama.replaceAll(" ","-")

  }
  return (
    <div id='presensi-container'>
    <Popup  />
    <div class="card App">
      <div id='judul-presensi'>
        {/* Halo {content.nama_kegiatan} */}
      </div>
      <div class="mb-3 input-data">
        <label for="Form_Nama" class="form-label">Nama</label>
        <input type="text" class="form-control" id="Form_Nama" placeholder="Nama"/>
      </div>
      <div class="mb-3 input-data">
        <label for="Form_UPT" class="form-label">UPT</label>
        <input type="text" class="form-control" id="Form_UPT" placeholder="UPT PPD"/>
      </div>
      <div class="mb-3 input-data">
        <label for="Form_Jabatan" class="form-label">Jabatan</label>
        <select class="custom-select" id='Form_Jabatan'>
          <option selected className='custom-option'>Jabatan</option>
          <option value="kaupt">Kepala UPT</option>
          <option value="katu">Kepala Sub Bagian Tata Usaha</option>
          <option value="katap">Kepala Seksi Pendataan dan Penetapan</option>
          <option value="kagih">Kepala Seksi Penagihan dan Pembayaran</option>
          <option value="pdpp">PDPP</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <div class="mb-3 input-data">
        <label for="Form_Jabatan" class="form-label">Tanda Tangan</label>
        <div>
        <SignatureCanvas ref={sigCanvas} penColor='black' id='canvas-ttd' backgroundColor = 'rgba(239, 239, 240,0)'  canvasProps={{width: 300, height: 200, className: 'sigCanvas',style: { border: "1px solid rgb(200, 200, 200)", borderRadius:20, touchAction:"none" }}} />
        </div>
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-primary" id='hapus-ttd' onClick={clearSignature}>Hapus</button>
        <button type="button" class="btn btn-primary" onClick={Kirim}>Kirim</button>
      </div>
    </div>

    </div>
  );
}

export default Presensi;
