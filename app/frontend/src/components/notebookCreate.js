import React from 'react';
import { Link } from 'react-router-dom'


import Header from './header'
import Dropzone from '../containers/dropzone'

// const NotebookCreate = ({ getRootProps, getInputProps, isDragActive }) => (
  const NotebookCreate = ({ onTitleChange, title }) => (
  <div className="bg-gray-100 min-h-screen">
    <Header/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:p-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Notebook</h3>
            <p className="mt-1 text-sm text-gray-500">
              Let's get started by filling in the notebook name and selecting the folder containing the notebook pictures.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="space-y-6" action="#" method="POST">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label for="notebook_name" className="block text-sm font-medium text-gray-700">Notebook name</label>
                  <input type="text" value={title} onChange={onTitleChange} name="notebook_name" id="notebook_name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notebook pictures folder
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Dropzone/>
                    {/* <Dropzone 
                      onDrop={onDrop}
                      accept={dropzoneAccept}
                      className="flex text-sm text-gray-600"
                    >
                      <div>
                        <div>
                          <label for="directory-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a folder</span>
                            <input type="file" className="sr-only" id="directory-upload" name="directory-upload" directory="" webkitdirectory="" mozdirectory="" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, up to 10MB per picture
                        </p>
                      </div>
                    </Dropzone> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-end sm:p-6">
        <Link to="/">
          <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
        </Link>
        <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </div>
  </div>
)

export default NotebookCreate