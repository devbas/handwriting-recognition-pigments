import * as types from './types'
import axios from 'axios'

export const setAcceptedFiles = (acceptedFiles) => {
  return (dispatch, getState) => {
    dispatch({ 
      type: types.SET_ACCEPTED_UPLOAD_FILES,
      files: acceptedFiles
    })
  }
}

export const removeAcceptedFiles = () => {
  return (dispatch, getState) => {
    dispatch({ 
      type: types.REMOVE_ACCEPTED_UPLOAD_FILES
    })
  }
}

export const setNotebookTitle = (input) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_NEW_NOTEBOOK_TITLE,
      title: input
    })
  }
}

export const uploadNotebook = () => {
  return (dispatch, getState) => {

    // upload the title, obtain a notebook ID
    axios({
      method: 'POST', 
      url: '/api/notebook/new', 
      data: `name=${getState().notebookTitle}`
    }).then((resp) => {
      const notebookId = resp.data.notebookId

      getState().acceptedFiles.forEach((file) => {
        const formData = new FormData()
        formData.append('file', file)

        axios({
          method: 'POST',
          url: '/api/notebook/photo-upload',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
      })
    })

    // axios.post(`/api/notebook/new`, { 
    //   name: getState().notebookTitle 
    // }).then((resp) => {
    //   const notebookId = resp.data.notebookId

    //   console.log('notebook created!', notebookId)
      // list images 
      // getState().acceptedFiles.forEach((file) => {
      //   // Upload each image with Axios along with a notebook ID
      //   const formData = new FormData()
      //   formData.append('file', file)
        
      //   axios.post(`/api/notebook/new`, formData, { 
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }).then((resp) => {
          
      //   })
      //   //  
      // })
    // }).catch((err) => {
    //   console.log(`error creating new notebook: ${err}`)
    // })
  }
}