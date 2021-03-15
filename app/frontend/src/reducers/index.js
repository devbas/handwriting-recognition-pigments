import { combineReducers } from 'redux'
import * as localize from './localize'
import * as upload from './upload'

const combinedReducers = combineReducers(Object.assign({}, localize, upload));

export default combinedReducers