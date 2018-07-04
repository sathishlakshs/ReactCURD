

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import EmployeeCUbuttons from './EmployeeCUbuttons';

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

class EmployeeForm extends React.Component {

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
    Id:0,
    saveState:false,
    updateID:'',
    Database:[]
  };

  componentWillMount() {
    if(this.props.dataForEdit.editCount == 1 && this.state.updateID =='')
      this.editEvent(this.props.dataForEdit.empId);
  }

  handleChange = name => event => {
    let stateCopy = Object.assign({}, this.state.employee);
    stateCopy[name] = event.target.value;
    this.setState({employee:stateCopy});
  };

hover=(e,value)=>{
  this.setState({
    hover:value
  });
}


employeeDetailsValidation(){
  let {employee} = this.state, errorObj = {},receiveObj={};

  for(let key in employee){
    
    switch(key){ 
      case 'email':
        receiveObj = this.emailValidation(this.state.employee.email);
        if(!isEmpty(receiveObj)){
          errorObj[key] = receiveObj.msg;
          errorObj['is'+key] = receiveObj.isemail;
        }
        break;
      case 'mobile' :
        receiveObj = this.mobileNumValidation(this.state.employee.mobile);
        if(!isEmpty(receiveObj)){
          errorObj[key] = receiveObj.msg;
          errorObj['is'+key] = receiveObj.ismobile;
        }
        break;
      default:
        if(this.state.employee[key].length == 0){
            errorObj[key] = error[key];
            errorObj['is'+key] = true;
        }
          
    }
  }
  return errorObj;
}

emailValidation(currentValue){
  let returnMessage={};
  if(currentValue.length == 0){
    returnMessage['isemail']=true;
    returnMessage['msg']=error['email'];
  }
  else if(!this.state.employee.email.match(emailRGX)){
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
  else if(!this.state.employeemobile.match(mob)){
    returnMessage['ismobile']=true;
    returnMessage['msg']='mobile number Invalid';
  }
  return returnMessage;
}

addEvent=(e)=>{
  e.preventDefault();
  this.setState({isErrorMsg:true});
  let isNotDuplicate = true;
  if(isEmpty(this.employeeDetailsValidation())){
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
              name: this.state.employee.name,
              Id: lastItemId,
              role:this.state.employee.role,
              DOB:this.state.employee.DOB,
              email:this.state.employee.email,
              address:this.state.employee.address,
              age: this.state.employee.age,
              mobile:this.state.employee.mobile,
              nation: this.state.employee.nation,
          }
               
          withExistData.push(data);
          localStorage.setItem('Database', JSON.stringify(withExistData));
                  
          this.setState({
            Id:lastItemId,
            employee:{
              name: '',
              role:'',
              DOB:'',
              email:'',
              address:'',
              age: '',
              mobile:'',
              nation: ''},
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
        Id:'',
        employee:{
              name: '',
              role:'',
              DOB:'',
              email:'',
              address:'',
              age: '',
              mobile:'',
              nation: ''},
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
              name: this.state.employee.name,
              Id: this.state.Id,
              role:this.state.employee.role,
              DOB:this.state.employee.DOB,
              email:this.state.employee.email,
              address:this.state.employee.address,
              age: this.state.employee.age,
              mobile:this.state.employee.mobile,
              nation: this.state.employee.nation,
      };

      let updateDataIndex = dbData.findIndex(data=> data.Id == empId);
      dbData.splice(updateDataIndex,1,replaceData);
      localStorage.setItem('Database', JSON.stringify(dbData));
      
      this.setState({
            employee:{
              name: '',
              role:'',
              DOB:'',
              email:'',
              address:'',
              age: '',
              mobile:'',
              nation: ''},
            saveState:false,
            isErrorMsg:false,
            updateID:''
          });
     
      alert('Updated sucessfully');
}

editEvent(empId){
  let dbData = JSON.parse(localStorage.getItem('Database'));
  let editDataIndex = dbData.findIndex(data=> data.Id == empId);
  if(editDataIndex >= 0)
  {   
    this.setState({
            employee:{
              name: dbData[editDataIndex].name,
              role:dbData[editDataIndex].role,
              DOB:dbData[editDataIndex].DOB,
              email:dbData[editDataIndex].email,
              address:dbData[editDataIndex].address,
              age: dbData[editDataIndex].age,
              mobile:dbData[editDataIndex].mobile,
              nation: dbData[editDataIndex].nation,
            },
      Id: dbData[editDataIndex].Id,
      updateID:empId,
      saveState:true,
    });
  }
}

  render() {
    const { classes } = this.props;
    let errorMessage = this.state.isErrorMsg?this.employeeDetailsValidation():{};
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField required
          label="Name"
          className={classes.textField}
          value={this.state.employee.name}
          onChange={this.handleChange('name')}
          error={errorMessage.isname}
          helperText={errorMessage.name}
          margin="normal"
        />
        
        <TextField required
          select
          label="select role"
          className={classes.textField}
          value={this.state.employee.role}
          onChange={this.handleChange('role')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          error={errorMessage.isrole}
          helperText={errorMessage.role}
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
          value={this.state.employee.DOB}
          onChange={this.handleChange('DOB')}
          InputLabelProps={{
            shrink: true,
          }}
          error={errorMessage.isDOB}
          helperText={errorMessage.DOB}
          margin="normal"
          />

        <TextField required
          label="Email"
          placeholder="email@example.com"
          className={classes.textField}
          value={this.state.employee.email}
          onChange={this.handleChange('email')}
          error={errorMessage.isemail}
          helperText={errorMessage.email}
          margin="normal"
        />
                
        <TextField required
          label="Enter your address"
          placeholder="Address"
          multiline
          className={classes.textField}
          value={this.state.employee.address}
          onChange={this.handleChange('address')}
          error={errorMessage.isaddress}
          helperText={errorMessage.address}
          margin="normal"
        />
        
        <TextField required
          label="Age"
          value={this.state.employee.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          error={errorMessage.isage}
          helperText={errorMessage.age}
          margin="normal"
        />
        
        <TextField required
          label="Mobile"
          value={this.state.employee.mobile}
          onChange={this.handleChange('mobile')}
          type="number"
          className={classes.textField}
          error={errorMessage.ismobile}
          helperText={errorMessage.mobile}
          margin="normal"
        />
        
        <TextField required
          select
          label="select nation"
          className={classes.textField}
          value={this.state.employee.nation}
          onChange={this.handleChange('nation')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          error={errorMessage.isnation}
          helperText={errorMessage.nation}
          margin="normal"
        >
          {nations.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <EmployeeCUbuttons data={this.state} saveClick={this.addEvent} clearClick={this.ClearEvent} updateClick={this.ModifyEvent}/>
      </form>
    );
  }
}

EmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeForm);
