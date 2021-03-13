import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div className="flex-shrink-0 flex items-center">
            <a href="#">
              <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow"/>
            </a>
          </div>
        </div>
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
          <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className="w-full">
              <label for="search" className="sr-only">Search pigments, ingredients, etc.</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="search" name="search" className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search pigments, ingredients, etc." type="search"/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
          <button type="button" className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <span className="sr-only">Open menu</span>

            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

          <Link to='/notebook/new'>
            <a href="#" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              New Notebook
            </a>
          </Link>
        </div>
      </div>
    </div>

    <nav className="hidden bg-white border-b border-t border-gray-200 lg:flex" aria-label="Breadcrumb">
      <ol className="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Recipe books</a>
          </div>
        </li>
        <li className="flex">
          <div className="flex items-center">
            <svg className="flex-shrink-0 w-6 h-full text-gray-200" preserverAspectRatio="none" viewBox="0 0 24 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a href="#" aria-current="page" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Notebook 1</a>
          </div>
        </li>
      </ol>
    </nav>
  </header>
) 

export default Header