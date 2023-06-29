const SIGN_UP_MODAL_ACTIVE = 'signUp/MODAL_ACTIVE';
const SIGN_UP_MODAL_INACTIVE = 'signUp/MODAL_INACTIVE';
const SIGN_IN_MODAL_ACTIVE = 'signIn/MODAL_ACTIVE';
const SIGN_IN_MODAL_INACTIVE = 'signIn/MODAL_INACTIVE';

export const signupModalActive = () => {
  return { type: SIGN_UP_MODAL_ACTIVE };
};
export const signupModalInactive = () => {
  return { type: SIGN_UP_MODAL_INACTIVE };
};
export const signinModalActive = () => {
  return { type: SIGN_IN_MODAL_ACTIVE };
};
export const signinModalInactive = () => {
  return { type: SIGN_IN_MODAL_INACTIVE };
};

const initialState = {
  signUpModalState: false,
  signInModalState: false
};
export default function modalState(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_MODAL_ACTIVE:
      return { ...state, signUpModalState: true };
    case SIGN_UP_MODAL_INACTIVE:
      return { ...state, signUpModalState: false };
    case SIGN_IN_MODAL_ACTIVE:
      return { ...state, signInModalState: true };
    case SIGN_IN_MODAL_INACTIVE:
      return { ...state, signInModalState: false };
    default:
      return state;
  }
}
