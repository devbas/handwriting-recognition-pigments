import { combineReducers } from 'redux'
import * as localize from './localize'

const combinedReducers = combineReducers(Object.assign({}, localize));

export default combinedReducers