const SET_USER = 'user/SET_USER';

export const setUser = (user) => {
  return { type: SET_USER, payload: user };
};

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };

    default:
      return state;
  }
}
