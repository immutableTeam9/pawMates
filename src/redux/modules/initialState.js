const INITIAL_SWITCH_ON = 'global/INITIAL_SWITCH_ON';
const INITIAL_SWITCH_OFF = 'global/INITIAL_SWITCH_OFF';

export const initialSwitchOn = () => ({ type: INITIAL_SWITCH_ON });
export const initialSwitchOff = () => ({ type: INITIAL_SWITCH_OFF });

const initialState = (state = false, action) => {
  switch (action.type) {
    case INITIAL_SWITCH_ON:
      return (state = true);
    case INITIAL_SWITCH_OFF:
      return (state = false);
    default:
      return state;
  }
};

export default initialState;
