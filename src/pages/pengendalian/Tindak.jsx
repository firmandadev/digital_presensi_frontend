import './Tindak.css';
import Loading from '../../modules/Loading.js'
import { login, logout, isLoggedIn, changeDateFormat } from '../../modules/utils';
import React, { useRef } from 'react'
const settings = require('../../settings.json')

class Tindak extends React.Component {
  constructor(props){
    super(props)
    this.idKegiatan = window.location.href.split('/').slice(-1)[0];
    this.Loader = new Loading()
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
}
    componentDidMount(){
        this.getKKPDatas()
        document.getElementById('navbar').style.display = 'none'
    }
    async getKKPDatas(before,after){
        this.Loader.showLoading()
        let upt_datas = await fetch(settings.serverURI + "/api/pengendalian/kkp/getKKP");
        let json = await upt_datas.json()
        this.setState({
            datas:json
        })
        console.log(json)
        this.Loader.hideLoading()
    }
    openLink(a,b,c){
        console.log(a)
        console.log(b)
        if(a == document.getElementById(b).value ){
            window.location = '/upt/' + c
        }else{
            alert("Kunci Salah")
        }
    }
  render(){
    return(
	    <div>
            <div class="card" id='tindak-container'>
                <div class="card-body">
                    <div class="card" id='tindak-content'>
                        <div class="card-body">
                             <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">UPT</th>
                                    <th scope="col">Periode</th>
                                    <th scope="col">Key</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Status</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {this.state.datas.map((data,num)=>{
                                        let link = `/upt/${data.id_kegiatan}`
                                        let key_data_link = 'key-data-'+num
                                        return(
                                         <tr>
                                            <td scope="row">{data.id_kegiatan}</td>
                                            <td>{data.nama_upt}</td>
                                            <td>{changeDateFormat(data.periodea)} - {changeDateFormat(data.periodeb)}</td>
                                            <td><input type="password" class="form-control key-data" id={key_data_link} placeholder="Password"/></td>
                                            <td>
                                             <button type="button" className="btn btn-primary" id='upload-content-button'  onClick={()=>this.openLink(data.key, key_data_link, data.id_kegiatan)}>Buat</button>
                                            </td>
                                            <td>Buka</td>
                                        </tr>)
                                    })}
                                </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
  }

export default Tindak;
	    