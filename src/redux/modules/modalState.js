const SIGN_UP_MODAL_ACTIVE = 'signUp/MODAL_ACTIVE';
const SIGN_UP_MODAL_INACTIVE = 'signUp/MODAL_INACTIVE';
const SIGN_IN_MODAL_ACTIVE = 'signIn/MODAL_ACTIVE';
const SIGN_IN_MODAL_INACTIVE = 'signIn/MODAL_INACTIVE';
const MODIFY_PROFILE_MODAL_ACTIVE = 'modifyProfile/MODAL_ACTIVE';
const MODIFY_PROFILE_MODAL_INACTIVE = 'modifyProfile/MODAL_INACTIVE';
const MODIFY_PET_INFO_MODAL_ACTIVE = 'modifyPetInfo/MODAL_ACTIVE';
const MODIFY_PET_INFO_MODAL_INACTIVE = 'modifyPetInfo/MODAL_INACTIVE';

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
export const modifyProfileModalActive = () => {
  return { type: MODIFY_PROFILE_MODAL_ACTIVE };
};
export const modifyProfileModalInactive = () => {
  return { type: MODIFY_PROFILE_MODAL_INACTIVE };
};
export const modifyPetInfoModalActive = () => {
  return { type: MODIFY_PET_INFO_MODAL_ACTIVE };
};
export const modifyPetInfoModalInactive = () => {
  return { type: MODIFY_PET_INFO_MODAL_INACTIVE };
};

const initialState = {
  signUpModalState: false,
  signInModalState: false,
  modifyProfileModalState: false,
  modifyPetInfoModalState: false
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
    case MODIFY_PROFILE_MODAL_ACTIVE:
      return { ...state, modifyProfileModalState: true };
    case MODIFY_PROFILE_MODAL_INACTIVE:
      return { ...state, modifyProfileModalState: false };
    case MODIFY_PET_INFO_MODAL_ACTIVE:
      return { ...state, modifyPetInfoModalState: true };
    case MODIFY_PET_INFO_MODAL_INACTIVE:
      return { ...state, modifyPetInfoModalState: false };
    default:
      return state;
  }
}
