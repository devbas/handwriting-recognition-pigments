import React, { Component } from 'react';
import * as uploadActions from '../actions/upload'
import NotebookCreateComponent from '../components/notebookCreate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { useDropzone } from 'react-dropzone'

class NotebookCreate extends Component {

  constructor(props) {
    super(props)

    // this.onDrop = this.onDrop.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onSubmitNotebookClick = this.onSubmitNotebookClick.bind(this)
  }

  onTitleChange(e) {
    this.props.actions.setNotebookTitle(e.target.value)
  }

  onSubmitNotebookClick() {
    this.props.actions.uploadNotebook()
  }

  render() {

    return (
      <NotebookCreateComponent 
        title={this.props.notebookTitle}
        onTitleChange={this.onTitleChange}
        onSubmitNotebookClick={this.onSubmitNotebookClick}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    notebookTitle: state.notebookTitle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, uploadActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookCreate)