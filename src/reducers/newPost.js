const newPostReducer = (state = { imageUrl: "", caption: "" }, action) => {
  switch (action.type) {
    case "SET_IMAGEURL":
      return { ...state, imageUrl: action.payload };
    case "SET_CAPTION":
      return { ...state, caption: action.payload };

    default:
      return state;
  }
};

export default newPostReducer;
