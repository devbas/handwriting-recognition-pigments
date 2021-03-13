import React, { Component } from 'react';
import NotebookListComponent from '../components/notebookList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NotebookList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <NotebookListComponent/>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookList)