import React, { Component } from 'react';
import NotebookSingleComponent from '../components/notebookSingle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NotebookSingle extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <NotebookSingleComponent/>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSingle)