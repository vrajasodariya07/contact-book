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
  USER_DETAILS_FAIL
} from "../constants/userConstants";

// const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
//   const { userSignin: { userInfo } } = getState();
//   dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
//   try {
//     const { data } = await Axios.put("/api/users/" + userId,
//       { name, email, password }, {
//       headers: {
//         Authorization: 'Bearer ' + userInfo.token
//       }
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set('userInfo', JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// }

// const updateUserProfile = (user) => async (dispatch, getState) => {
//   dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(`/api/users/profile`, user, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     localStorage.setItem('userInfo', JSON.stringify(data));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
//   }
// }

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
  console.log(data);
  try {
    const { data2 } = await Axios.post("https://contactclub.vercel.app/api/users/signup", data);
    //Cookie.set('userInfo', JSON.stringify(data));
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data2 });
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data2));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

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

// const updateUser = (user) => async (dispatch, getState) => {
//   dispatch({ type: USER_UPDATE_REQUEST, payload: user });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(`/api/users/${user._id}`, user, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     //dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     //localStorage.setItem('userInfo', JSON.stringify(data));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
//   }
// };


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
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/';
}



export { signin, listUsers, register, enum_data, logout, detailsUser };