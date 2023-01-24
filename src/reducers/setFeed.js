const feedReducer = (state = { feedData: null }, action) => {
  switch (action.type) {
    case "SET_FEED":
      return { feedData: action.payload };
    case "CHANGE_FEED":
      return { feedData: action.payload };

    default:
      return state;
  }
};

export default feedReducer;
