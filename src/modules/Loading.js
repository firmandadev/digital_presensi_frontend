

class Loading{
  constructor(name){
    this.name = name
  }
  showLoading(){
    document.getElementById("loading-gif").style.display = "block";
  }
  hideLoading(){
    document.getElementById("loading-gif").style.display = "none";
  }
  showPopUp(message){
    document.getElementById("popup-container").style.display = "flex"
    document.getElementById('popup-box-text').innerHTML = message;
  }
}

export default Loading
