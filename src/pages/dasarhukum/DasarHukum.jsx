import './DasarHukum.css';
import React from 'react'
import { getRandomID } from '../../modules/utils';
import Loading from '../../modules/Loading.js'
const settings = require("../../settings.json")

class DasarHukum extends React.Component {
  constructor(props){
    super(props)
    this.Loader = new Loading()
    this.state = {
      documents:[],
      documents_bycategories : [],
      selected_document : {
        doc_id : undefined,
        doc_alias : undefined,
        doc_type : undefined,
        doc_category : undefined,
        doc_num : undefined,
        doc_title : undefined,
        doc_date : undefined,
        doc_status : undefined,
        doc_link : undefined,
      },
      categories : [
        "Pajak Air Permukaan", "Pajak Kendaraan Bermotor","Ketatausahaan","Pajak Bahan Bakar Kendaraan Bermotor","Retribusi Jasa Usaha","Pelayanan dan Samsat"
      ]
    }
  }
  componentDidMount(){
    this.getAllDocuments()
    if(localStorage.getItem('access').includes('Dasarhukum')){
      document.getElementById('dasarhukum-input-container').style.display = "block"
    }
  }
  async getAllDocuments(){
    this.Loader.showLoading()
    let response = await fetch(settings.serverURI + "/api/dasarhukum/get/all");
    let documents = await response.json()
    console.log(documents)
    this.setState({
      documents : documents.datas
    })
    this.Loader.hideLoading()
  }
  openLegalByCategory(self,categories){
    let categorizedLegal = self.state.documents.filter(document => document.doc_category == categories)
    self.setState({
      documents_bycategories : categorizedLegal
    })
  }
  debugIsGood(content){
    document.getElementById('debugIsGood').innerHTML = content
  }
  async documentUpload(self){
    let documents = {
      doc_id : getRandomID(),
      doc_alias : document.getElementById("doc-alias").value,
      doc_type : document.getElementById("doc-type").value,
      doc_category : document.getElementById("doc-category").value,
      doc_num : document.getElementById("doc-num").value,
      doc_title : document.getElementById("doc-title").value,
      doc_date : document.getElementById("doc-date").value,
      doc_status : document.getElementById("doc-status").value,
      doc_link : document.getElementById("doc-link").value,
    }
    this.Loader.showLoading()
    const response = await fetch(settings.serverURI + "/api/dasarhukum/upload",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(documents)
    })
    const datas = await response.json()
    this.Loader.hideLoading()
    this.clearDocumentInput()
  }
  clearDocumentInput(){
    let inputComponents = document.getElementsByClassName('dasarhukum-input')
    inputComponents[0].value = ""
    inputComponents[1].value = ""
    inputComponents[2].value = ""
    inputComponents[3].value = ""
    inputComponents[4].value = ""
    inputComponents[5].value = ""
    inputComponents[6].value = ""
    inputComponents[7].value = ""
  }
  prepareDocumentUpdate(self){
    let inputComponents = document.getElementsByClassName('dasarhukum-input')
    let detailsComponents = document.getElementsByClassName('dasarhukum-detail')
    document.getElementById('dasarhukum-unggah-button').style.display = "none"
    document.getElementById('dasarhukum-ubah-button').style.display = "block"
    inputComponents[0].value = detailsComponents[1].innerHTML
    inputComponents[1].value = detailsComponents[2].innerHTML
    inputComponents[2].value = detailsComponents[3].innerHTML
    inputComponents[3].value = detailsComponents[4].innerHTML
    inputComponents[4].value = detailsComponents[5].innerHTML
    inputComponents[5].value = detailsComponents[6].innerHTML
    inputComponents[6].value = detailsComponents[7].innerHTML
    inputComponents[7].value = detailsComponents[9].innerHTML
    
  }
  async documentUpdate(self){
    let input_components = document.getElementsByClassName('dasarhukum-input')
    let detailsComponents = document.getElementsByClassName('dasarhukum-detail')
    let datas = {
      doc_id : detailsComponents[0].innerHTML,
      doc_alias : input_components[0].value,
      doc_type : input_components[1].value,
      doc_category : input_components[2].value,
      doc_num : input_components[3].value,
      doc_title : input_components[4].value,
      doc_date : input_components[5].value,
      doc_status : input_components[6].value,
      doc_link : input_components[7].value
    }
    self.Loader.showLoading()
    const response = await fetch(settings.serverURI + "/api/dasarhukum/update/" + datas.doc_id,{
      method:"PUT",
      headers:{'content-type':'application/json'},
      body: JSON.stringify(datas)
    })
    //const result = await response.json()
    self.Loader.hideLoading()
    //alert(result.message)
    self.clearDocumentInput()
    document.getElementById('dasarhukum-unggah-button').style.display = "block"
    document.getElementById('dasarhukum-ubah-button').style.display = "none"
 
  }
  openLegalDetails(self, id){
    let selectedLegal = self.state.documents_bycategories.filter(document => document.doc_id == id)
    let details = document.getElementsByClassName('dasarhukum-detail')
    details[0].innerHTML = selectedLegal[0].doc_id
    details[1].innerHTML = selectedLegal[0].doc_alias
    details[2].innerHTML = selectedLegal[0].doc_type
    details[3].innerHTML = selectedLegal[0].doc_category
    details[4].innerHTML = selectedLegal[0].doc_num
    details[5].innerHTML = selectedLegal[0].doc_title
    details[6].innerHTML = selectedLegal[0].doc_date
    details[7].innerHTML = selectedLegal[0].doc_status
    details[8].innerHTML = `<a href='${selectedLegal[0].doc_link}' target="_blank">Link</a>`
    details[9].innerHTML = selectedLegal[0].doc_link
  }
  render() {
    return (
    <div itemID="dasarhukum-container">
      <div id='debugIsGood'></div>
     <div class="card" >
        <div class="card-body" id='dasarhukum-card-container'>
            <div class="card" >
                <div class="card-body" id='dasarhukum-card-sidebar'>
          {this.state.categories.map((data, index) => {
            return (
              <div key={index} className='dasarhukum-categories-button' onClick={()=>this.openLegalByCategory(this,data)}>{data}</div>
            );
          })}
          </div></div>
           <div class="card" >
        <div class="card-body" id='dasarhukum-card-legal'>
          {this.state.documents_bycategories.map((document, index) => {
              return (
                <div key={index} className='dasarhukum-categories-button dasarhukum-detail-view' onClick={()=>this.openLegalDetails(this, document.doc_id)}>{document.doc_alias}<i className='view-legal'>{document.doc_type + " " + document.doc_num}</i></div>
              );
            })}
          </div></div>
          <div class="card" >
            <div class="card-body" id='dasarhukum-card-detail'>
   <i class="button-custom fa-solid fa-pencil" onClick={()=>this.prepareDocumentUpdate(this)}></i>
   <table class="table table-striped">
      <thead>
    <tr>
      <th scope="col">Keterangan</th>
      <th scope="col">Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID Dokumen</td>
      <td className='dasarhukum-detail'></td>
    </tr>
      <tr>
      <td>Alias</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Tipe Dokumen</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Kategori</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Nomor Dokumen</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Judul Dokumen</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Tanggal Penetapan</td>
      <td className='dasarhukum-detail'></td>
    </tr>
     <tr>
      <td>Status Dokumen</td>
      <td className='dasarhukum-detail'></td>
    </tr>
    <tr>
      <td>Link</td>
      <td className='dasarhukum-detail'><a>Link</a></td>
    </tr>
    <tr className='hide'>
      <td>Link</td>
      <td className='dasarhukum-detail'><a>Link</a></td>
    </tr>

  </tbody>
    </table>
    </div></div>
    <div class="card" id="dasarhukum-input-container" >
      <div class="card-body" id='dasarhukum-card-input'>
        <label for="doc-alias" class="form-label">Alias</label>
        <input type="text" class="form-control mb-2 dasarhukum-input" id="doc-alias"></input>
        <label for="doc-type" class="form-label">Tipe Dokumen</label>
        <input type="text" class="form-control mb-2 dasarhukum-input" id="doc-type"></input>
        <label for="doc-type" class="form-label">Kategori Dokumen</label>
        <select class="form-select mb-2 dasarhukum-input" aria-label="Default select example" id='doc-category'>
          <option selected>Kategori Dokumen</option>
          {this.state.categories.map((category)=>{
            return(
              <option value={category}>{category}</option>
            )
          })}
        </select>
        <label for="doc-num" class="form-label">Nomor Dokumen</label>
        <input type="text" class="form-control mb-2 dasarhukum-input" id="doc-num"></input>
        <label for="doc-title" class="form-label">Judul Dokumen</label>
        <input type="text" class="form-control mb-2 dasarhukum-input" id="doc-title"></input>
        <label for="doc-date" class="form-label">Tanggal Ditetapkan</label>
        <input type="date" class="form-control mb-2 dasarhukum-input" id="doc-date"></input>
        <label for="doc-category" class="form-label">Kategori Dokumen</label>
        <select class="form-select mb-2 dasarhukum-input" aria-label="Default select example" id='doc-status'>
          <option selected>Status Dokumen</option>
          <option value={true}>Berlaku</option>
          <option value={false}>Tidak Berlaku</option>
        </select>
        <label for="doc-link" class="form-label">Link</label>
        <input type="text" class="form-control mb-2 dasarhukum-input" id="doc-link"></input>
        <button type="button" class="btn btn-dark mt-2" id='dasarhukum-unggah-button' onClick={this.documentUpload}>Unggah Dokumen</button>
        <button type="button" class="btn btn-dark mt-2" id='dasarhukum-ubah-button' onClick={()=>this.documentUpdate(this)}>Ubah Dokumen</button>
</div>
      </div>
  </div>
 
  </div>
        </div>
); 

  }
}

export default DasarHukum;
