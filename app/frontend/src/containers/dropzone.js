import React, { Component } from 'react'
import * as uploadActions from '../actions/upload'
// import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

class CustomDropzone extends Component {
  
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this)
    
    this.state = {
      files: []
    }
  }

  onDrop(files) {
    this.props.actions.setAcceptedFiles(files)

    this.setState({files})
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} directory="" webkitdirectory="" type="file"/>
              <p>Drag and drop a folder, or click to select a folder</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }

}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, uploadActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropzone)

// const Dropzone = () => {
//   const onDrop = useCallback((acceptedFiles) => {
//     this.props.actions.setAcceptedFiles(acceptedFiles)
//     // acceptedFiles.forEach((file) => {
//     //   const reader = new FileReader()

//     //   reader.onabort = () => console.log('file reading was aborted')
//     //   reader.onerror = () => console.log('file reading has failed')
//     //   reader.onload = () => {
//     //     // Do whatever you want with the file contents
//     //     const binaryStr = reader.result
//     //     console.log(binaryStr)
//     //   }
//     //   reader.readAsArrayBuffer(file)
//     // })
    
//   }, [])
//   const {getRootProps, getInputProps} = useDropzone({onDrop})

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} directory="" webkitdirectory="" type="file"/>
//       <p>Drag and drop a folder, or click to select a folder</p>
//     </div>
//   )
// }

// function mapStateToProps(state) {
//   return {}
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Object.assign({}, uploadActions), dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)