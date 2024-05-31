import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import Cookie from 'js-cookie';

import { userDetailsReducer, userEnumReducer, userListReducer, userRegisterReducer, userSigninReducer } from './reducer/userSigninReducer';

const userInfo = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) : '';
const initialState = {
    userSignin: { userInfo },
};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    userEnum : userEnumReducer,
    userDetail: userDetailsReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;