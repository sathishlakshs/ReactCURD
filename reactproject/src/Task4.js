import React, { Component } from 'react';
import list from './curdTable';


export default class Task4 extends Component{
	
	constructor(props){
		super(props);
		this.state ={
			form :{
				empNo:'',
				name:'',
				role:''
			},
			listData:[],
			count:0
		}

		this.handleChange = this.handleChange.bind(this);
		this.addClick = this.addClick.bind(this);
		this.updateClick = this.updateClick.bind(this);
	}


	handleChange(e){
		this.state.form[e.target.name] = e.target.value;
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	
	addClick(e){
		e.preventDefault();
		this.state.count++;
		let data={
			empNo: this.state.count,
			name:this.state.form.name,
			role:this.state.form.role
		};
		(data.name != '' && data.role !== '')?this.state.listData.push(data):alert('fill the data') ;
		
		this.setState({
			empNo:"",
			name:"",
			role:"",
			isEdit:false
		});
	}

	editClick = (e, empNo) =>{
		e.preventDefault();
		
			this.state.listData.map(
				(data)=> data.empNo == empNo && this.setState({
							name : data.name,
							role : data.role,
							isEdit:true,
							editValue: empNo
						})
				);

	}

	updateClick(e){
		e.preventDefault();
		this.setState({
			isEdit:false
		});
		let replaceData={
			empNo: this.state.editValue,
			name:this.state.name,
			role:this.state.role
		}
		console.log(replaceData);
		this.state.listData.map(
				(data,index)=> data.empNo == this.state.editValue && 
								(replaceData.name != '' && replaceData.role != '')?this.state.listData.splice(index,1,replaceData):alert('fill the data')
				);
	}


	deleteClick=(e, empNo) =>{
		e.preventDefault();
		this.setState({
			isEdit:false
		});
		this.state.listData.map(
				(data,index)=> data.empNo == empNo && 
								this.state.listData.splice(index,1)
				);
		console.log(this.state.listData);
	}

	render(){
			let save = this.state.isEdit ? <button onClick={this.updateClick} >update</button> : <button onClick={this.addClick} >Add</button> ;
			
		return(<div>
				<form>
					<label>Name:
						<input type='text' name='name' value={this.state.name} onChange= {this.handleChange}/>
					</label>
					<label>role:
						<input type='text' name='role' value={this.state.role} onChange={this.handleChange}/>
					</label>
					{save}
				</form>
				{this.state.listData.map((d, index) => <div>{d.empNo},{d.name} , {d.role} <button onClick={(e)=> this.editClick(e, d.empNo)}>Edit</button> <button onClick={(e)=> this.deleteClick(e, d.empNo)}>Delete</button></div>
					
				)}

			</div>);
	}
}