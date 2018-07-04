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

function Task6UDbutton(props) {
  const { classes } = props;
  let empId = props.id;
  return (
    <div>
      <Button variant="fab" mini color="secondary" aria-label="edit" className={classes.button} onClick={(e)=>props.editClick(e,'Edit',empId)}>
        <EditIcon/>
      </Button>
      <Button variant="fab" mini aria-label="delete" className={classes.button} onClick={(e)=>props.deleteClick(e,'Delete',empId)}>
        <DeleteIcon />
      </Button>
    </div>
  );
}

Task6UDbutton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task6UDbutton);
