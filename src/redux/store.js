const initialState = {
  movies: [],
  actors: [],
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FILL_MOVIES":
      return {
        ...state,
        movies: action.movies,
      };
    case "FILL_ACTORS":
      return {
        ...state,
        actors: action.actors,
      };
    case "SET_LOADING_GAME":
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
}

export default reducer;
