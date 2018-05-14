import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import {
  fetchSWApi,
  fetchResidentsApi
} from '../../../helper/SwApi'
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import debounce from 'lodash/debounce';
import Paper from 'material-ui/Paper';
import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead'
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';

function Transition (props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: '96%',
    margin: '0 auto',
    marginTop: '20px'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  dialogContent: {
    [theme.breakpoints.up('sm')]: {
      width: '600px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
    },
  }
});

class EnhancedTable extends React.Component {

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: {},
    residents: [],
    rowData: [],
    data: [],
    open: false,
    page: 0,
    rowsPerPage: 10,
  };

  componentDidMount () {
    fetchSWApi().then(r => {
      this.setState({
        data: r,
        rowData: r
      })
    })
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const data = this.state.data.sort((a, b) => {
          let itemA = a[orderBy];
          let itemB = b[orderBy];
        if (orderBy === 'population') {
          if(order === 'desc') {
            return (Number(itemB)? Number(itemB): -1) < (Number(itemA)? Number(itemA): -1) ? -1 : 1
          } else {
            return (Number(itemB)? Number(itemB): -1) > (Number(itemA)? Number(itemA): -1) ? -1 : 1
          }
        } else {
          if(order === 'desc') {
            return (itemB < itemA ? -1 : 1)
          } else {
            return (itemB > itemA ? -1 : 1)
          }
        }})
    this.setState({data, order, orderBy});
  };

  handleClick = (event, n) => {
    this.handleClickOpen()
    fetchResidentsApi(n.residents).then(r => {
      this.setState({residents: r.map(r => r.name)})
    })
    this.setState({selected: n});
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

  renderPlanetResidents = (urls) => {
    return this.state.residents.map((n,i) => {
      return <p key={i}>{n}</p>
    })
  }

  handleFilterChange = (e) => {
    let inputValue = e.target.value.toLowerCase()
    const updateList = debounce(() => {
      let results = this.state.rowData.filter(d => {
        return d.name.toLowerCase().includes(inputValue)
      })
      this.setState({data: results})
    }, 250)
    !inputValue ? this.setState({data: this.state.rowData}) : updateList()
  }


  render () {
    const {classes} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    //TODO: separate into another component
    return (
      <Paper className={classes.root}>
        <Dialog
          maxWidth='md'
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <div style={{padding: '23px 0 0 23px'}}>
            <h2>{selected.name}</h2>
          </div>
          <DialogContent className={classes.dialogContent} >
            <div>
              <Grid container spacing={24}>
                <Grid item sm={6} xs={12}>
                  <strong>Planet Info</strong>
                  <p>Climate: <i>{selected.climate}</i></p>
                  <p>Diameter: <i>{selected.diameter}</i></p>
                  <p>gravity: <i>{selected.gravity}</i></p>
                  <p>Orbital Period: <i>{selected.orbital_period}</i></p>
                  <p>Population: <i>{selected.population}</i></p>
                  <p>rotation period: <i>{selected.rotation_period}</i></p>
                  <p>surface water: <i>{selected.surface_water}</i></p>
                  <p>terrain: <i>{selected.terrain}</i></p>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <strong>Residents ({selected.residents ? selected.residents.length : null})</strong>
                  {selected.residents && selected.residents.length !== 0 ?
                    this.renderPlanetResidents(selected.residents) :
                    null }
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <EnhancedTableToolbar handleFilterChange={this.handleFilterChange}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={ data ? data.length : 1}
            />
            <TableBody>
              {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, i) => {
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    key={i}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {n.name}
                    </TableCell>
                    <TableCell numeric>{n.population}</TableCell>
                    <TableCell numeric>{n.terrain}</TableCell>
                    <TableCell numeric>{n.climate}</TableCell>
                    <TableCell numeric>{n.gravity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data && data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);