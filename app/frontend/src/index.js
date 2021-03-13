import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers/index'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native
import { composeWithDevTools } from 'redux-devtools-extension'

let middleware = [thunk]; 

if(process.env.NODE_ENV === 'development') {
	middleware = [...middleware, logger]; 
} else {
	middleware = [...middleware]; 
}

const config = {
  key: 'primary', 
  storage
}

const reducer = persistReducer(config, rootReducer)
const store = createStore(reducer, undefined, composeWithDevTools(applyMiddleware(...middleware))); 
const persistor = persistStore(
  store,
  null,
  () => {
    store.getState() // if you want to get restoredState
  }
)

persistor.purge()


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
