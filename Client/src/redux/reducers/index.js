import {
  ADDFAVORITE,
  DELETEFAVORITE,
  FILTER,
  ORDER,
  RESET,
  SET_USER,
  SET_FAVORITES,
} from "../actions/types";

const initialGlobalState = {
  favorites: [],
  allCharacters: [],
  access: false,
  aunMas: [],
  detail: {},
  user: null,
};

export default function rootReducer(state = initialGlobalState, action) {
  // Nos fijabamos por el TYPE de la accion
  switch (action.type) {
    case ADDFAVORITE:
      return {
        ...state,
        favorites: action.payload,
        allCharacters: action.payload,
      };

    case DELETEFAVORITE:
      return {
        ...state,
        favorites: action.payload,
        allCharacters: action.payload,
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case FILTER:
      return {
        ...state,
        favorites: state.allCharacters.filter(
          (pj) => pj.gender === action.payload
        ),
      };
    case ORDER:
      // [{id: 8},{id: 6},{id: 4},1,7]
      //    a.id    b.id

      let copy = state.favorites.sort((a, b) => {
        if (action.payload === "A") {
          // ordenar de menor a mayor
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0; // Si son iguales, no los muevo de posición.
        } else {
          // ordenar de mayor a menor
          if (a.id > b.id) return -1;
          if (b.id > a.id) return 1;
          return 0; // Si son iguales, no los muevo de posición.
        }
      });

      return {
        ...state,
        favorites: copy,
      };

    case RESET:
      return { ...state, favorites: state.allCharacters };
    default:
      return { ...state };
  }
}

// favorites [{1},{2},{3}]
// vs
// []
