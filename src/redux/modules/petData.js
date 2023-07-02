const SET_PET_DATA = 'pets/SET_PET_DATA';

export const setPetData = (petInfo) => {
  return { type: SET_PET_DATA, payload: petInfo };
};

export default function petData(state = {}, action) {
  switch (action.type) {
    case SET_PET_DATA:
      return { ...action.payload };

    default:
      return state;
  }
}
