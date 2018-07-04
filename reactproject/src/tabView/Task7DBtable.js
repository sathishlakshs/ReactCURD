import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Task7UDbutton from './Task7UDbutton';
import '../Task.css';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function Task7DBtable(props) {
  const { classes } = props;
  let data=JSON.parse(localStorage.getItem('Database'));
  let dbData = (data != [] && data != null)?data:[] ;
  let table = (<Paper className={classes.root}>
  <Table className={classes.table}>
  <TableHead>
          <TableRow>
            <CustomTableCell>NAME</CustomTableCell>
            <CustomTableCell>ID</CustomTableCell>
            <CustomTableCell>ROLE</CustomTableCell>
            <CustomTableCell>DOB</CustomTableCell>
            <CustomTableCell>EMAIL</CustomTableCell>
            <CustomTableCell>ADDRESS</CustomTableCell>
            <CustomTableCell numeric>AGE</CustomTableCell>
            <CustomTableCell numeric>MOBILE</CustomTableCell>
            <CustomTableCell>NATIONALITY</CustomTableCell>
            <CustomTableCell>{(props.hoverValue > -1 )? 'Action':''}</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dbData.map((n,index) => {
            return (
              <TableRow className={classes.row} key={n.Id} onMouseEnter={(e)=>props.hover(e,index)}
            onMouseLeave={(e)=>props.hover(e,-1)}>
                <CustomTableCell component="th" scope="row">
                  {n.name}
                </CustomTableCell>
                <CustomTableCell >{n.Id}</CustomTableCell>
                <CustomTableCell >{n.role}</CustomTableCell>
                <CustomTableCell>{n.DOB}</CustomTableCell>
                <CustomTableCell >{n.email}</CustomTableCell>
                <CustomTableCell >{n.address}</CustomTableCell>
                <CustomTableCell numeric>{n.age}</CustomTableCell>
                <CustomTableCell numeric>{n.mobile}</CustomTableCell>
                <CustomTableCell >{n.nation}</CustomTableCell>
                <CustomTableCell >{(props.hoverValue == index )?<Task7UDbutton id={n.Id} getIdEvent={props.getIdEvent} deleteEvent={props.deleteEvent} />:''}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
       </Paper>);
  let dataNotFound ='No data found'; 
  let dbDataValidation = (dbData == null || dbData.length == 0)?<div className='center'><img src={require('../images/nodatafound.jpeg')} alert='not render'/></div>:table;
  
  return (
      <div>
        {dbDataValidation}
      </div>
  );
}

Task7DBtable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task7DBtable);
