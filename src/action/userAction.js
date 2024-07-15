import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_ENUM_SUCCESS,
  USER_ENUM_REQUEST,
  USER_ENUM_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_UPDATE_FAIL,
  ADD_SURNAME_REQUEST,
  ADD_SURNAME_SUCCESS,
  ADD_SURNAME_FAILURE,
  GET_SURNAMES_REQUEST,
  GET_SURNAMES_SUCCESS,
  GET_SURNAMES_FAILURE,
  DELETE_SURNAME_REQUEST,
  DELETE_SURNAME_SUCCESS,
  DELETE_SURNAME_FAILURE,
  UPDATE_SURNAME_REQUEST,
  UPDATE_SURNAME_SUCCESS,
  UPDATE_SURNAME_FAILURE,
  USER_UPDATE_PROFILE_IMAGE_REQUEST,
  USER_UPDATE_PROFILE_IMAGE_SUCCESS,
  USER_UPDATE_PROFILE_IMAGE_FAIL
} from "../constants/userConstants";
import { logout as authLogout } from '../auth';

const addSurname = (name) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SURNAME_REQUEST, payload: name });
    try {
      const response = await Axios.post('https://contactclub.vercel.app/api/users/surnames', { name });
      dispatch({ type: ADD_SURNAME_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: ADD_SURNAME_FAILURE,
        payload: error,
      });
    }
  };
};

export const getSurnames = () => async (dispatch) => {
  dispatch({ type: GET_SURNAMES_REQUEST });
  try {
    const response = await Axios.get('https://contactclub.vercel.app/api/users/surnames');
    dispatch({ type: GET_SURNAMES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_SURNAMES_FAILURE, payload: error.message });
  }
};

export const deleteSurname = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SURNAME_REQUEST, payload: id });
  try {
    await Axios.delete(`http://localhost:7000/api/users/surnames/${id}`);
    dispatch({ type: DELETE_SURNAME_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_SURNAME_FAILURE, payload: error.message });
  }
};

export const updateSurname = (id, name) => async (dispatch) => {
  dispatch({ type: UPDATE_SURNAME_REQUEST, payload: { id, name } });
  try {
    const response = await Axios.put(`http://localhost:7000/api/users/surnames/${id}`, { name });
    dispatch({ type: UPDATE_SURNAME_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_SURNAME_FAILURE, payload: error.message });
  }
};

const updateProfileImage = (userId, profileImage) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_IMAGE_REQUEST });

    const {
      userSignin: { userInfo },
    } = getState();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profileImage', profileImage);

    const { data } = await Axios.post('https://contactclub.vercel.app/api/users/updateProfileImage', formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    dispatch({
      type: USER_UPDATE_PROFILE_IMAGE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_IMAGE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const signin = (phoneNumber, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { phoneNumber, password } });
  try {
    const { data } = await Axios.post("https://contactclub.vercel.app/api/users/signin", { phoneNumber, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_SIGNIN_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}
const register = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: data });
  try {
    const { data: responseData } = await Axios.post("https://contactclub.vercel.app/api/users/signup", data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: responseData });
    // localStorage.setItem('userInfo', JSON.stringify(responseData));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const enum_data = () => async (dispatch, getState) => {
  dispatch({ type: USER_ENUM_REQUEST });
  try {
    const { data } = await Axios.get("https://contactclub.vercel.app/api/users/enum-values");
    //Cookie.set('userInfo', JSON.stringify(data));
    dispatch({ type: USER_ENUM_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_ENUM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

const updateProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put("https://contactclub.vercel.app/api/users/updateprofile", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    //dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    //localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

const detailsUser = (userId) => async (dispatch, getState) => {

  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`https://contactclub.vercel.app/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('https://contactclub.vercel.app/api/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

const searchUsers = (searchParams) => async (dispatch) => {
  try {
    dispatch({ type: USER_SEARCH_REQUEST });

    const { data } = await Axios.get('https://contactclub.vercel.app/api/users/search', {
      params: searchParams,
    });

    dispatch({ type: USER_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await Axios.put(`https://contactclub.vercel.app/api/users/updatedata`, userData, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// const deleteUser = (userId) => async (dispatch, getState) => {
//   dispatch({ type: USER_DELETE_REQUEST, payload: userId });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.delete(`/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_DELETE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_DELETE_FAIL, payload: message });
//   }
// };

// const listTopSellers = () => async (dispatch, getState)  => {
//   dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });

//   try {
//     const { data } = await Axios.get(`/api/users/top-sellers/`);

//     dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
//   } catch (error) {

//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
//   }
// };



const logout = () => (dispatch) => {
  authLogout();
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/';
}



export { signin, listUsers, register, enum_data, logout, detailsUser, updateUser, updateProfile, searchUsers, addSurname, updateProfileImage };