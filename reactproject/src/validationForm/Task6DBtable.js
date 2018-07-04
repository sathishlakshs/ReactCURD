import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Task6UDbutton from './Task6UDbutton';
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


function Task6DBtable(props) {
  const { classes } = props;
  let dbData = props.data;
  let editClick = props.editClick;
  let deleteClick = props.deleteClick;
  return (
    <Paper className={classes.root}>
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
                 <CustomTableCell >{(props.hoverValue == index )? <Task6UDbutton id={n.Id} editClick={editClick} deleteClick={deleteClick}/>:''}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

Task6DBtable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task6DBtable);
