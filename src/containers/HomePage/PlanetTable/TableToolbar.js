import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SearchIcon from 'material-ui-icons/Search';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

function TableToolbar (props) {
  const {classes, handleFilterChange} = props;

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          Planets Guide
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        <Input
          disableUnderline
          placeholder="Search by Name"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>}
          onChange={(e) => handleFilterChange(e)}/>
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(toolbarStyles)(TableToolbar)