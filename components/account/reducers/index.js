import { combineReducers } from 'redux';
import Reducer from './reducer';
import DummyReducer from './DummyReducer';

export default combineReducers({
	user: Reducer,
	dummy: DummyReducer,
});