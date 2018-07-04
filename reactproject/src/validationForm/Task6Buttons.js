import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


function Task6Buttons(props) {
  const { classes } = props;
  let SUbutton = (props.data.saveState)?<Button variant="contained" color="primary" className={classes.button} onClick={(e)=>props.saveClick(e,'Update',props.data.updateID)}>
        <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
        Update
      </Button>:<Button variant="contained" color="primary" className={classes.button} onClick={(e)=>props.saveClick(e,'Add','')}>
        <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    

  return (
     <div>
      {SUbutton}
      <Button variant="contained" color="secondary" className={classes.button} onClick={props.clearClick}>
        <Clear className={classNames(classes.leftIcon, classes.iconSmall)} />
        Clear
      </Button>
    </div>
  );
}

Task6Buttons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task6Buttons);
