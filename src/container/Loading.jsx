import React from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import "./Loading.css"

class Loading extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id="loading-gif">
      <div id="loading-object">
      <DotLottieReact src="https://lottie.host/1a198ef4-b98e-4c1e-afe4-3de23de47aa5/LTtu6d9KOL.lottie" loop autoplay/>
      </div>
      </div>
    )
  }
}

export default Loading;
