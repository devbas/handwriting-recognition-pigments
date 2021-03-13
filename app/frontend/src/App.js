import logo from './logo.svg';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NotebookSingleComponent from './containers/notebookSingle'
import RecipeComponent from './containers/recipe'
import NotebookListComponent from './containers/notebookList'
import NotebookCreateComponent from './containers/notebookCreate'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/notebook/new" component={NotebookCreateComponent}/>
        <Route path="/notebook/:notebookId" component={NotebookSingleComponent}/>
        <Route path="/notebook/:notebookId/:recipId" component={RecipeComponent}/>
        <Route path="/">
          <NotebookListComponent/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

/* <div className="bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="bg-lightgray">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main>
    </div> */