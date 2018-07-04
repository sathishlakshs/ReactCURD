

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Task7Buttons from './Task7Buttons';
import Task7DBtable from './Task7DBtable';

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

class Task7Form extends React.Component {

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

  componentWillMount() {
    if(this.props.dataForEdit.editCount == 1 && this.state.updateID =='')
      this.EditEvent(this.props.dataForEdit.empId);
  }

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
  let {employee} = this.state, errorMsg = {},receiveObj={};

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

AddEvent=(e)=>{
  e.preventDefault();
  this.setState({isErrorMsg:true});
  let isNotDuplicate = true;
  if(isEmpty(this.EmployeeDetailsValidation())){
    let lastItemId = 0, withExistData= JSON.parse(localStorage.getItem('Database'));
    let email = this.state.email, mobile = this.state.mobile;
    if(withExistData != null && withExistData.length > 0){
        lastItemId = withExistData.slice(-1)[0].Id;
        withExistData.filter(function iterator(item){
          if(item.email == email || item.mobile == mobile)
            isNotDuplicate = false;
          });
    }else
      withExistData = [];
    
    if(isNotDuplicate){
      lastItemId++;
      let data = {
              name: this.state.name,
              Id: lastItemId,
              role:this.state.role,
              DOB:this.state.DOB,
              email:this.state.email,
              address:this.state.address,
              age: this.state.age,
              mobile:this.state.mobile,
              nation: this.state.nation,
          }
               
          withExistData.push(data);
          localStorage.setItem('Database', JSON.stringify(withExistData));
          
          this.setState({
            Id:lastItemId,
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
      }else
        alert('already exsist');
  }
}

ClearEvent=(e)=>{
  e.preventDefault();
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
        isErrorMsg:false,
        updateID:''
      });
}


ModifyEvent=(e,empId)=>{
  e.preventDefault();
  this.setState({isErrorMsg:true});
  let dbData = JSON.parse(localStorage.getItem('Database'));
  let replaceData = {
              name: this.state.name,
              Id: this.state.Id,
              role:this.state.role,
              DOB:this.state.DOB,
              email:this.state.email,
              address:this.state.address,
              age: this.state.age,
              mobile:this.state.mobile,
              nation: this.state.nation,
      };

      let updateDataIndex = dbData.findIndex(data=> data.Id == empId);
      dbData.splice(updateDataIndex,1,replaceData);
      localStorage.setItem('Database', JSON.stringify(dbData));
      
      this.setState({
            name: '',
            role:'',
            DOB:'',
            email:'',
            address:'',
            age: '',
            mobile:'',
            nation: '',
            saveState:false,
            isErrorMsg:false,
            updateID:''
          });
     
      alert('Updated sucessfully');
}

EditEvent(empId){
  let dbData = JSON.parse(localStorage.getItem('Database'));
  let editDataIndex = dbData.findIndex(data=> data.Id == empId);
  if(editDataIndex >= 0)
  {   
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
        <Task7Buttons data={this.state} saveClick={this.AddEvent} clearClick={this.ClearEvent} updateClick={this.ModifyEvent}/>
      </form>
    );
  }
}

Task7Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task7Form);
