import './Preview.css';
import React, { useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import { convertMonthToIndonesia } from '../../modules/utils';
const settings = require('../../settings.json')



class Preview extends React.Component {
  constructor(props){
    super(props)
    this.idKegiatan = window.location.href.split('/').slice(-1)[0];
    this.state ={
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
}}
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
printTable = () => {
  const tableContent = document.getElementById("kkpcontents-table").innerHTML;

  if (!tableContent) {
    alert("Table content not found.");
    return;
  }

  const printWindow = window.open('', '', 'width=1000,height=700');

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          @page {
            size: A4 landscape;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            font-size:12px
            text-align: justify;
            border-collapse: collapse;
          }
          h2 {
            text-align: center;
            font-size: 14px;
          }
            
        tr{
            text-align: justify;
            font-size:12px
            border-collapse: collapse;
        }
            .catatan-contents{
            white-space: pre-line;
            word-wrap: break-word;
            border-collapse: collapse;
          }
            #kkpcontents-table2{
             border-collapse: collapse;
            }
             @media print {
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  thead {
    display: table-header-group;
  }

  tfoot {
    display: table-footer-group;
  }
            
        </style>
      </head>
      <body>
        <h2>Kertas Kerja Pemeriksaan<br/>
        UPT PPD ${this.state.upt.nama_upt}<br/>
        Periode ${convertMonthToIndonesia(this.state.upt.periodea)} - ${convertMonthToIndonesia(this.state.upt.periodeb)}</h2>
        <div className='catatan-contents'>${tableContent}</div>
        <br/><br/>
        <div style="text-align:center">
          <h2>Mengetahui,</h2>
          <h2>Ketua Tim</h2><br/><br/><br/>
          <h2>Pambudi Cahyanto, S.H., M.H.<br/>
          19771014 199903 1 001</h2>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
backToKKP(self){
    document.location = '/pengendalian/kkp/' + this.idKegiatan
}

  render(){
    return(
	    <div>
            <div id='preview-header'>
                <h2>Kertas Kerja Pemeriksaan<br/>
                UPT PPD {this.state.upt.nama_upt}<br/>
                Periode {convertMonthToIndonesia(this.state.upt.periodea)} - {convertMonthToIndonesia(this.state.upt.periodeb)}
                </h2>
            </div>
            
<div class="card" id='kkpcontents-table'>
    
                <div id="table-actions">
                    <i class="button-custom fa-solid fa-print" onClick={()=>this.printTable()}></i>
                    <i class="button-custom fa-solid fa-xmark" onClick={()=>this.backToKKP(this)}></i>
                </div>
                <table class="table" id='kkpcontents-table2' >
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Catatan</th>
                <th scope="col">Bidang</th>
                <th scope="col">No Berkas/BKU</th>
                <th scope="col">Bulan</th>
                <th scope="col">Saran</th>
                <th scope="col">Keterangan</th>
                </tr> 
            </thead>
            <tbody>
                {
                    this.state.contents.map((data,num)=>{
                        return(
                            <tr>
                                <td scope="row">{num+1}</td>
                                <td><p className="catatan-contents">{data.catatan}</p></td>
                                <td>{data.bidang}</td>
                                <td>{data.noberkas}</td>
                                <td>{convertMonthToIndonesia(data.bulan)}</td>
                                <td>{data.saran}</td>
                                <td>{data.keterangan}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
        </div>)
    }
  }

export default Preview;
	    