export const notebookTitle = (state = '', action) => {
  switch (action.type) {
    case 'SET_NEW_NOTEBOOK_TITLE':
      return action.title
    default:
      return state
  }
}

export const acceptedFiles = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACCEPTED_UPLOAD_FILES': 
      return action.files
    case 'REMOVE_ACCEPTED_UPLOAD_FILES':
      return []
    default: 
      return state
  }
}