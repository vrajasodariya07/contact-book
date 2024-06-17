import { ADD_SURNAME_FAILURE, ADD_SURNAME_REQUEST, ADD_SURNAME_SUCCESS, DELETE_SURNAME_FAILURE, DELETE_SURNAME_REQUEST, DELETE_SURNAME_SUCCESS, GET_SURNAMES_FAILURE, GET_SURNAMES_REQUEST, GET_SURNAMES_SUCCESS, UPDATE_SURNAME_FAILURE, UPDATE_SURNAME_REQUEST, UPDATE_SURNAME_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_ENUM_FAIL, USER_ENUM_REQUEST, USER_ENUM_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}
function userListReducer(state = { loading: true }, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function userEnumReducer(state = {}, action) {
  switch (action.type) {
    case USER_ENUM_REQUEST:
      return { loading: true };
    case USER_ENUM_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_ENUM_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function userLogoutReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


const userSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_SEARCH_REQUEST:
      return { loading: true, users: [] };
    case USER_SEARCH_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const surnameReducer = (state={}, action) => {
  switch (action.type) {
    case ADD_SURNAME_REQUEST:
    case GET_SURNAMES_REQUEST:
    case DELETE_SURNAME_REQUEST:
    case UPDATE_SURNAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SURNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        surnames: [...state.surnames, action.payload],
      };
    case GET_SURNAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        surnames: action.payload,
      };
    case DELETE_SURNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        surnames: state.surnames.filter(surname => surname._id !== action.payload),
      };
    case UPDATE_SURNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        surnames: state.surnames.map(surname => 
          surname._id === action.payload._id ? action.payload : surname
        ),
      };
    case ADD_SURNAME_FAILURE:
    case GET_SURNAMES_FAILURE:
    case DELETE_SURNAME_FAILURE:
    case UPDATE_SURNAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export { userSigninReducer, userListReducer, userRegisterReducer, userEnumReducer, userLogoutReducer, userDetailsReducer, userUpdateProfileReducer, userSearchReducer, userUpdateReducer, surnameReducer }