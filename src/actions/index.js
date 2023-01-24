export const signIn = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const setFeed = (feedData) => {
  return {
    type: "SET_FEED",
    payload: feedData,
  };
};

export const changeFeed = (feedData) => {
  return {
    type: "CHANGE_FEED",
    payload: feedData,
  };
};

export const setImageUrl = (data) => {
  return {
    type: "SET_IMAGEURL",
    payload: data,
  };
};

export const setCaption = (data) => {
  return {
    type: "SET_CAPTION",
    payload: data,
  };
};
