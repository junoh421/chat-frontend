import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import messageReducer from './message_reducer';
import userReducer from './user_reducer';
import conversationReducer from './conversation_reducer';
import profileReducer from './profile_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    conversation: messageReducer,
    users: userReducer,
    conversations: conversationReducer,
    profile: profileReducer
});

export default rootReducer;
