import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


function EmployeeEDbuttons(props) {
  const { classes } = props;
  let empId = props.id;

  return (
    <div>
      <Button variant="fab" mini color="secondary" aria-label="edit" className={classes.button} onClick={(e)=>props.getIdEvent(e,empId,'EDIT')}>
        <EditIcon/>
      </Button>
      <Button variant="fab" mini aria-label="delete" className={classes.button} onClick={(e)=>props.deleteEvent(e,empId)}>
        <DeleteIcon />
      </Button>
    </div>
  );
}

EmployeeEDbuttons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeEDbuttons);
