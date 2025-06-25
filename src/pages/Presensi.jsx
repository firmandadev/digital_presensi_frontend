import React, { Component, createRef } from 'react';
import './Presensi.css';
import logo from '../logo.svg';
import { encrypt, decrypt } from "../modules/utils.js"
import SignatureCanvas from 'react-signature-canvas';
import Popup from '../container/Popup.jsx';
import Loading from "../container/Loading.jsx";

const settings = require('../settings.json');

class Presensi extends Component {
  constructor(props) {
    super(props);
    this.sigCanvas = createRef();
    this.idKegiatan = window.location.href.split('/').slice(-1)[0];
    this.state = {
      content: null,
      upt : [undefined],
      jabatan : [[undefined,undefined]]

    };
    this.getDatas()
  }

  componentDidMount() {
    document.getElementById("loading-gif").style.display = "block";
    document.getElementById("navbar").style.display = "none";

    fetch(settings.serverURI + "/api/getKegiatan/" + this.idKegiatan)
      .then(res => res.json())
      .then(res => {
        this.setState({ content: res });
        document.getElementById("judul-presensi").innerHTML = res.nama_kegiatan;
        document.getElementById("loading-gif").style.display = "none";
      })
      .catch(err => console.log(err));
   
  }
  async getDatas(){
     let upt_datas = await fetch("https://firmandadev.github.io/datas_apis/datas.json");
    let json = await upt_datas.json()
    this.setState({
      upt : json.upt,
      jabatan : json.jabatan
    })
  }

  base64ToBlob(base64, contentType = '', sliceSize = 512) {
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

    return new Blob(byteArrays, { type: contentType });
  }

  clearSignature = () => {
    this.sigCanvas.current.clear();
  };

  Kirim = async () => {
    document.getElementById("loading-gif").style.display = "block";
    const sentDatas = {
      nama: document.getElementById('Form_Nama').value,
      unit_kerja: document.getElementById('Form_UPT').value,
      jabatan: document.getElementById('Form_Jabatan').value,
      signature: this.sigCanvas.current.toDataURL(),
      upload_time: new Date().toLocaleString(),
      no_hp :document.getElementById('Form_HP').value,
      id_acara: this.idKegiatan
    };

    try {
      const response = await fetch(settings.serverURI + "/api/postData", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(sentDatas)
      });

      const json_data = await response.json();
      document.getElementById("loading-gif").style.display = "none";
      document.getElementById('popup-box-text').innerHTML = json_data.message;
      let encrypted = await encrypt(document.getElementById('Form_Nama').value)
      window.location.href = "/presensi/success/" + encrypted;
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div id='presensi-container'>
        <Popup />
        <div className="card App">
          <div id='judul-presensi'></div>

          <div className="mb-3 input-data">
            <label htmlFor="Form_Nama" className="form-label">Nama</label>
            <input type="text" className="form-control" id="Form_Nama" placeholder="Nama" />
          </div>

	   <div className="mb-3 input-data">
            <label htmlFor="Form_UPT" className="form-label">Unit Kerja</label>
            <select className="custom-select" id='Form_UPT'>
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

          <div className="mb-3 input-data">
            <label htmlFor="Form_Jabatan" className="form-label">Jabatan</label>
            <select className="custom-select" id='Form_Jabatan'>
              <option selected className='custom-option'>Jabatan</option>
	      { 
		this.state.jabatan.map((data,num)=>{
		  return(
		    <option value={data[0]}>{data[1]}</option>
		  )
		})
	      }
            </select>
          </div>
	  <div className="mb-3 input-data">
            <label htmlFor="Form_HP" className="form-label">Nomor WA</label>
            <input type="text" className="form-control" id="Form_HP" placeholder="08xxx" />
          </div>


          <div className="mb-3 input-data">
            <label className="form-label">Tanda Tangan</label>
            <SignatureCanvas
              ref={this.sigCanvas}
              penColor='black'
              id='canvas-ttd'
              backgroundColor='rgba(239, 239, 240,0)'
              canvasProps={{
                width: 300,
                height: 200,
                className: 'sigCanvas',
                style: { border: "1px solid rgb(200, 200, 200)", borderRadius: 20, touchAction: "none" }
              }}
            />
          </div>

          <div className="mb-3">
            <button type="button" className="btn btn-primary" id='hapus-ttd' onClick={this.clearSignature}>Hapus</button>
            <button type="button" className="btn btn-primary" onClick={this.Kirim}>Kirim</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Presensi;
