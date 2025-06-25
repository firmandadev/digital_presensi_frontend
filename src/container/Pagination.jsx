import React, { Component } from 'react';
import "./Pagination.css"

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // state here
    };
  }

  showDatas() {
    let endIndex = 5
    let startIndex = 1
    let elements = []
    for(let i = startIndex;i<=endIndex;i++){
      elements.push(`
		<tr>
		  <th scope="row">{nume+1}</th>
		  <td>{data.nama_kegiatan}</td>
		  <td><a href={link}>
		  <button type="button" id="btnLink" class="btn btn-secondary">Link</button>
		  </a></td>
		</tr>
      `)
    }
    return elements
  }
  componentDidMount(){
    document.getElementById("pagePrev").style.display = "none"
    let pageNumbers = document.getElementsByClassName("pageNumber")[0].classList.add("active")
  }
  movePage(a){
    if(a==0 || a>this.props.pageNumber){
      return
    }
    if(a==1){
      document.getElementById("pagePrev").style.display = "none"
      document.getElementById("pageNext").style.display = "block"
    }else if(a==this.props.pageNumber){
      document.getElementById("pageNext").style.display = "none"

      document.getElementById("pagePrev").style.display = "block"
    }
    else{
      document.getElementById("pageNext").style.display = "block"
      document.getElementById("pagePrev").style.display = "block"
    }
    
    this.props.parent.setState({
      currentIndex : a
    })
    let pageNumbers = document.getElementsByClassName("pageNumber")
    for(let i = 0;i<pageNumbers.length;i++){
      pageNumbers[i].classList.remove("active")
    }
    pageNumbers[a-1].classList.add("active")

  }

  render() {
    return (
      <nav aria-label="Page navigation example">
	<ul class="pagination d-flex justify-content-center list-unstyled">
	
	  <li class="page-item" id="pagePrev" onClick={(a)=>this.movePage(this.props.parent.state.currentIndex-1)}><a class="page-link" href="#">&lt;</a></li>
      {
	this.props.datas.map((data,n)=>{
	  let amount = Math.ceil(this.props.datas.length/this.props.amount)
	  if(n<amount){
	    return(
	    <li class="page-item pageNumber" onClick={(a)=>this.movePage(n+1)}><a class="page-link" href="#">{n+1}</a></li>
	    )
	  }
	  })
      }
	  <li class="page-item" id="pageNext" onClick={(a)=>this.movePage(this.props.parent.state.currentIndex+1)}><a class="page-link" href="#">&gt;</a></li>
	</ul>
      </nav>
    );
  }
}

export default Pagination;
