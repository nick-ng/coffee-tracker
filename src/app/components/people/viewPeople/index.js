import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { getAllPeople } from '../../../reducers/people';


class ViewPerson extends Component {
  constructor() {
    super();
    this.personRow = this.personRow.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  editUser(row) {
    const { allPeople } = this.props;
    const allPeopleArray = allPeople.toArray();
    browserHistory.push(`people/edit/${allPeopleArray[row[0]].get('id')}`);
  }
  addUser() {
    browserHistory.push('people/add');
  }
  personRow() {
    const { allPeople } = this.props;
    return allPeople.map(person => {
      return (
        <TableRow key={person.id}>
          <TableRowColumn>{person.get('name')}</TableRowColumn>
          <TableRowColumn>{person.get('number_coffee_drank')}</TableRowColumn>
          <TableRowColumn>{person.get('number_coffee_paid')}</TableRowColumn>
          <TableRowColumn>$ {person.get('coffee_price').toFixed(2)}</TableRowColumn>
        </TableRow>
      );
    });
  }
  render() {
    return (
      <Paper
        style={{
          width: '100%',
          marginBottom: '3%',
        }}
      >
        <div style={{ padding: '5px 0px 5px 20px' }}> <h3>People</h3> </div>
        <Divider />
        <Table onRowSelection={this.editUser} >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={{ color: '#3d3327' }}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Coffees Drank</TableHeaderColumn>
              <TableHeaderColumn>Coffees Paid</TableHeaderColumn>
              <TableHeaderColumn>Coffee Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {this.personRow()}
          </TableBody>
        </Table>
        <FloatingActionButton onTouchTap={this.addUser} backgroundColor="#6d8165" style={{ position: 'fixed', bottom: '5%', right: '3%', }}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

ViewPerson.propTypes = {
  allPeople: ImmutablePropTypes.map,
};

export default connect(
state => ({
  allPeople: getAllPeople(state),
}))(ViewPerson);