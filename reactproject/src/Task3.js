import React, { Component } from 'react'

const listData=[];
export default class Task3 extends Component{

	constructor(props){
		super(props);
		this.state = {
			form:{
	            name: ' ',
	            address: ' '
			},
			listData: []
        };

	}

OnChange= (e) =>{
	
	this.state.form[e.target.name]= e.target.value;
	this.setState({
		[e.target.name]: e.target.value
	});
	console.log(this.state.form);
}

addListClick= (e) =>{
		 e.preventDefault();
		 let Data = {
		 	name : this.state.form.name,
		 	address : this.state.form.address
		  };
		this.state.listData.push(Data);
		this.setState({
			name:"",
			address:""
		});
		
	}
	
	divCreate(){
		console.log(this.state.listData);
		return(<div>
					{this.state.listData.map((d) => <div>{d.name} , {d.address}</div>)}
			</div>);
	}

	

	render(){
		
		return(<div>
			<form>
				<label>
					Name:
					 <input name='name' value={this.state.name} onChange={(e) => this.OnChange(e)}/>
				</label>
				<label>
					address:
					<input name='address' value={this.state.address} onChange={(e) => this.OnChange(e)}/>
				</label>
				<button onClick={(e) => this.addListClick(e)}>Add</button> 
				<button onClick= {(e) => this.clear(e)}>clear</button>
			</form>
			{this.divCreate()}
			</div>
			
			);
	}	
}