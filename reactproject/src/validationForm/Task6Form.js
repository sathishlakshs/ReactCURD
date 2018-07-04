

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Task6Buttons from './Task6Buttons';
import Task6DBtable from './Task6DBtable';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const emailRGX =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mob = /^\d{10}$/;
const nations = [
  {
    value:'',
    label:'select',
  },
  {
    value: 'Indian',
    label: 'India',
  },
  {
    value: 'American',
    label: 'America',
  },
  {
    value: 'Chinese',
    label: 'China',
  },
  {
    value: 'Japanese',
    label: 'Japan',
  },
];

const roles = [
  {
    value:'',
    label:'select',
  },
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'Tester',
    label: 'Tester',
  },
  {
    value: 'Manager',
    label: 'Manager',
  },
  {
    value: 'Team Leader',
    label: 'Team Leader',
  },
];

const error = {
      name:'enter the name',
      role:'select the role',
      DOB:'select your DOB',
      email:'enter the mail',
      address:'enter the address',
      age: 'enter the age',
      mobile:'enter the mobile',
      nation: 'select the nation'
  };

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Task6Form extends React.Component {

  state = {
    employee:{
      name:'',
      role:'',
      DOB:'',
      email:'',
      address:'',
      age: '',
      mobile:'',
      nation: ''
    },
    hover:-1,
    isErrorMsg:false,
    name: '',
    Id:0,
    role:'',
    DOB:'',
    email:'',
    address:'',
    age: '',
    mobile:'',
    nation: '',
    saveState:false,
    updateID:'',
    Database:[]
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

hover=(e,value)=>{
  this.setState({
    hover:value
  });
}


EmployeeDetailsValidation(){
  let {employee} = this.state;
  let errorMsg = {},receiveObj={};


  for(let key in employee){
    
    switch(key){ 
      case 'email':
        receiveObj = this.emailValidation(this.state.email);
        if(!isEmpty(receiveObj)){
          errorMsg[key] = receiveObj.msg;
          errorMsg['is'+key] = receiveObj.isemail;
        }
        break;
      case 'mobile' :
        receiveObj = this.mobileNumValidation(this.state.mobile);
        if(!isEmpty(receiveObj)){
          errorMsg[key] = receiveObj.msg;
          errorMsg['is'+key] = receiveObj.ismobile;
        }
        break;
      default:
        if(this.state[key].length == 0){
            errorMsg[key] = error[key];
            errorMsg['is'+key] = true;
        }
          
    }
  }
  return errorMsg;
}

emailValidation(currentValue){
  let returnMessage={};
  if(currentValue.length == 0){
    returnMessage['isemail']=true;
    returnMessage['msg']=error['email'];
  }
  else if(!this.state.email.match(emailRGX)){
    returnMessage['isemail']=true;
    returnMessage['msg']='Email Invalid';
  }
  return returnMessage;
}

mobileNumValidation(currentValue){
  let returnMessage={};
  if(currentValue.length == 0){
    returnMessage['ismobile']=true;
    returnMessage['msg']=error['mobile'];
  }
  else if(!this.state.mobile.match(mob)){
    returnMessage['ismobile']=true;
    returnMessage['msg']='mobile number Invalid';
  }
  return returnMessage;
}

CURDclick=(e,type,empId)=>{
    e.preventDefault();
   let dbData = this.state.Database;
   this.setState({
    isErrorMsg:true            
   });
    if(type =='Update'){
      let replaceData = {
              name: this.state.name,
              Id: this.state.Id,
              role:this.state.role,
              email:this.state.email,
              address:this.state.address,
              age: this.state.age,
              mobile:this.state.mobile,
              nation: this.state.nation,
      };

      let updateDataIndex = dbData.findIndex(data=> data.Id == empId);
      this.state.Database.splice(updateDataIndex,1,replaceData);
      this.setState({
            saveState:false,
            updateID:''            
          })
      alert('Updated sucessfully');
    }else if(type == 'Add'){

       
      if(isEmpty(this.EmployeeDetailsValidation())){
        let count = this.state.Id += 1;
        let data = {
                name: this.state.name,
                Id: count,
                role:this.state.role,
                DOB:this.state.DOB,
                email:this.state.email,
                address:this.state.address,
                age: this.state.age,
                mobile:this.state.mobile,
                nation: this.state.nation,
            }
            this.state.Database.push(data);
            this.setState({
              Id:count,
              name: '',
              role:'',
              DOB:'',
              email:'',
              address:'',
              age: '',
              mobile:'',
              nation: '',
              saveState:false,
              isErrorMsg:false
            });
            alert('data sent sucessfully');
          
        }
        
    }else if(type == 'Clear'){
      this.setState({
        name: '',
        Id:'',
        role:'',
        DOB:'',
        email:'',
        address:'',
        age: '',
        mobile:'',
        nation: '',
        saveState:false,
        isErrorMsg:false
      });
    }else if(type == 'Edit'){
      
      let editDataIndex = dbData.findIndex(data=> data.Id == empId);
        this.setState({
          name: dbData[editDataIndex].name,
          Id: dbData[editDataIndex].Id,
          role: dbData[editDataIndex].role,
          DOB:dbData[editDataIndex].DOB,
          email: dbData[editDataIndex].email,
          address: dbData[editDataIndex].address,
          age: dbData[editDataIndex].age,
          mobile: dbData[editDataIndex].mobile,
          nation: dbData[editDataIndex].nation,
          updateID:empId,
          saveState:true,
        });
     
    }else if(type == 'Delete'){
      let deleteDataIndex = dbData.findIndex(data=> data.Id == empId);
      this.state.Database.splice(deleteDataIndex,1);
      this.setState({
            saveState:false,
            updateID:''            
      })
      alert(empId+' is deleted');
    }

  }


  render() {
    const { classes } = this.props;
      
    let warningMessage = this.state.isErrorMsg?this.EmployeeDetailsValidation():{};
    
     return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField required
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          error={warningMessage.isname}
          helperText={warningMessage.name}
          margin="normal"
        />
        
        <TextField required
          select
          label="select role"
          className={classes.textField}
          value={this.state.role}
          onChange={this.handleChange('role')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          error={warningMessage.isrole}
          helperText={warningMessage.role}
          margin="normal"
        >
          {roles.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>


        <TextField required 
          label='DOB' 
          type='date' 
          className={classes.textField}
          value={this.state.DOB}
          onChange={this.handleChange('DOB')}
          InputLabelProps={{
            shrink: true,
          }}
          error={warningMessage.isDOB}
          helperText={warningMessage.DOB}
          margin="normal"
          />

        <TextField required
          label="Email"
          placeholder="email@example.com"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          error={warningMessage.isemail}
          helperText={warningMessage.email}
          margin="normal"
        />
                
        <TextField required
          label="Enter your address"
          placeholder="Address"
          multiline
          className={classes.textField}
          value={this.state.address}
          onChange={this.handleChange('address')}
          error={warningMessage.isaddress}
          helperText={warningMessage.address}
          margin="normal"
        />
        
        <TextField required
          label="Age"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          error={warningMessage.isage}
          helperText={warningMessage.age}
          margin="normal"
        />
        
        <TextField required
          label="Mobile"
          value={this.state.mobile}
          onChange={this.handleChange('mobile')}
          type="number"
          className={classes.textField}
          error={warningMessage.ismobile}
          helperText={warningMessage.mobile}
          margin="normal"
        />
        
        <TextField required
          select
          label="select nation"
          className={classes.textField}
          value={this.state.nation}
          onChange={this.handleChange('nation')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          error={warningMessage.isnation}
          helperText={warningMessage.nation}
          margin="normal"
        >
          {nations.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Task6Buttons data={this.state} saveClick={this.CURDclick} clearClick={(e)=>this.CURDclick(e,'Clear','')}/>
        {this.state.Database.length > 0 && <Task6DBtable data={this.state.Database} editClick={this.CURDclick} deleteClick={this.CURDclick} hover={this.hover} hoverValue={this.state.hover}/>}
      </form>
    );
  }
}

Task6Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task6Form);
