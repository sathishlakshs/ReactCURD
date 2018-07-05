import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Timer from './Timer';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});



class ParentComponent extends React.Component {
  state = {
    value: 0,
    empId:'',
    action:'',
    delete:false,
    hover:-1,
    editCount:0,
    timerCount:0
  };

  handleChange = (event, value) => {
    this.setState({ 
      value:value,
      empId:'',
      action:'',
      editCount:0,
      timerCount:0
     });
     this.loadingInterval();
  };



  getIdEvent=(e,empId,action)=>{
    e.preventDefault();
    this.setState({
      value:0,
      empId:empId,
      action:action,
      editCount:1
    });
}

hover=(e,value)=>{
  this.setState({
    hover:value
  });
}
componentDidMount(){
  this.loadingInterval();
}

loadingInterval(){
  this.setState({timerCount:0})
  this.timer = setInterval(this.loadingTimer.bind(this), 1000)  
}

loadingTimer(){
  this.setState({timerCount:(this.state.timerCount + 1)});
  console.log(this.state.timerCount);
  if(this.state.timerCount >= 2){
    clearInterval(this.timer);
  }
}


removeEvent=(e,empId)=>{
  e.preventDefault();
  let dbData=JSON.parse(localStorage.getItem('Database'));
  let deleteDataIndex = dbData.findIndex(data=> data.Id == empId);
  dbData.splice(deleteDataIndex,1);
  localStorage.setItem('Database',JSON.stringify(dbData));
  this.setState({delete:true});
  alert(empId+' is deleted');
}


render() {
    const { classes } = this.props;
    const { value } = this.state;
    let tabs = <div className='loadCenter'><div><img src={require('../images/loading.gif')} alert='not render' width='100' height='100'/></div><div>loading...</div></div>;
    if(this.state.timerCount >= 2){
      tabs = <div>
        {value === 0 && <EmployeeForm dataForEdit = {this.state}/>}
        {value === 1 && <EmployeeList hover={this.hover} hoverValue={this.state.hover} getIdEvent={this.getIdEvent} deleteEvent={this.removeEvent}/>}
      </div>;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="New Register" />
            <Tab label="Database" href="#database" />
          </Tabs>
        </AppBar>
        {tabs}
      </div>
    );
  }
}

ParentComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParentComponent);
