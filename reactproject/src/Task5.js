import React, { Component } from 'react';
//import HoverComponent from './mouseAction/HoverComponent';
import list from './curdTable';

const hoverStyle = {
  color: '#F44336'
};

export default class Task4 extends Component{
	
	constructor(props){
		super(props);
		this.state ={
			hover:-1,
			form :{
				empNo:'',
				name:'',
				role:''
			},
			listData:[],
			count:0
		}

		this.handleChange = this.handleChange.bind(this);
		
	}


	handleChange(e){
		this.state.form[e.target.name] = e.target.value;
		this.setState({
			[e.target.name]:e.target.value
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



	AUclick=(e,type)=>{
		e.preventDefault();
		if(type =='Update'){
			let replaceData={
				empNo: this.state.editValue,
				name:this.state.name,
				role:this.state.role
			}
			
			

			if(replaceData.name != '' && replaceData.role != ''){
				let currentDataIndex = this.state.listData.findIndex(data => data.empNo == this.state.editValue
				);
				this.state.listData.splice(currentDataIndex,1,replaceData);
			}else{
				alert('fill the data');
			}
			
		}else if(type == 'Add'){
			this.state.count++;
		let data={
			empNo: this.state.count,
			name:this.state.form.name,
			role:this.state.form.role,
			hover:false
		};
		(data.name != '' && data.role !== '')?this.state.listData.push(data):alert('fill the data') ;
		
		}

		this.setState({
			empNo:"",
			name:"",
			role:"",
			isEdit:false
		});
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
			let save = this.state.isEdit ? <button onClick={(e)=>this.AUclick(e,'Update')} >update</button> : <button onClick={(e)=>this.AUclick(e,'Add')} >Add</button> ;
					
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
				{this.state.listData.map((d, index) => <div>{d.empNo},{d.name} , {d.role} <span onMouseEnter={()=>this.setState({hover: index})}
            onMouseLeave={()=>this.setState({ hover : -1})}
          style={hoverStyle}>{this.state.hover == index? <span><button onClick={(e)=> this.editClick(e, d.empNo)}>Edit</button> <button onClick={(e)=> this.deleteClick(e, d.empNo)}>Delete</button></span>: 'hover here'}</span></div>
					
				)}

			</div>);
	}
}