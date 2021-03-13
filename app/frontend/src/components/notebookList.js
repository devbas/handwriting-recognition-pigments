import React from 'react';

import Header from './header'

const NotebookList = ({ 
  onNewNotebookClick
}) => (
  <div className="bg-gray-100 min-h-screen">
    <Header/>
    <main className="bg-lightgray">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    </main>
  </div>
)

export default NotebookList