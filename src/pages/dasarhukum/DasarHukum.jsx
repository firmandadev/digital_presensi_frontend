import './DasarHukum.css';
import React from 'react'

class DasarHukum extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      datas:[{
        category:"Pajak Daerah",
        regulation:[{
          group:"Pelayanan",
          order : 1,
          title:"Juknis Pelayanan",
          link:"http://"
        }]
      }]
    }
  }
  render() {
 return (
  <div itemID="dasarhukum-container">
    {this.state.datas.map((data, index) => (
      <div className="accordion" id={`accordionExample-${index}`} key={data.id}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse-${index}`}>
              {data.category}
            </button>
          </h2>
          <div id={`collapse-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent={`#accordionExample-${index}`}>
          <div className="accordion-body">
          Mantap
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
); 

  }
}

export default DasarHukum;
