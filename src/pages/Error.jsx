
import './Laporan.css';
import SignatureCanvas from 'react-signature-canvas'
import React, { useRef } from 'react'

class Error extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.getDatas()
  }
  render() {
    return(
      <div>
        Error Buoy!
       </div>)
  }
}

export default Error;
