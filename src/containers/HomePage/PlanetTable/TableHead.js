import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

const columnData = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Planet'},
  {id: 'population', numeric: true, disablePadding: false, label: 'Population'},
  {id: 'terrain', numeric: true, disablePadding: false, label: 'Terrain'},
  {id: 'climate', numeric: true, disablePadding: false, label: 'Climate'},
  {id: 'gravity', numeric: true, disablePadding: false, label: 'Gravity'},
];

export default class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render () {
    const {
      order,
      orderBy
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {columnData.map((column, i) => {
            return (
              <TableCell
                key={i}
                numeric={column.numeric} //If true, content will align to the right.
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false} //Set aria-sort direction.
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};