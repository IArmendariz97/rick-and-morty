import {
  ADDFAVORITE,
  DELETEFAVORITE,
  FILTER,
  ORDER,
  RESET,
  SET_USER,
  SET_FAVORITES,
} from "./types";
import axios from "axios";
// Actions creators
const endpoint = "http://localhost:3001/favorites/";
export const addFavorite = ({ userId, id }) => {
  console.log(userId, id);
  const characterId = id;
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, { userId, characterId }); // Enviamos character por body
      const { data } = response;
      return dispatch({
        type: ADDFAVORITE,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};
// Actions.js
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export function deleteFavorite({ userId, id }) {
  const characterId = id;
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${endpoint}/${userId}/${characterId}`
      );
      const { data } = response;
      return dispatch({
        type: DELETEFAVORITE,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function setFavorites(favorites) {
  return { type: SET_FAVORITES, payload: favorites };
}

export function filterCards(gender) {
  return { type: FILTER, payload: gender };
}

export function orderCards(order) {
  return { type: ORDER, payload: order };
}

export function reset() {
  return { type: RESET };
}
