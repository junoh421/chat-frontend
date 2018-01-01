import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import messageReducer from './message_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    messages: messageReducer,
});

export default rootReducer;
