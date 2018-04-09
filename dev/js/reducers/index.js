import {combineReducers} from 'redux';
import schedulework from './schedulework';

const allReducers = combineReducers({
    schedulework: schedulework
});

export default allReducers
