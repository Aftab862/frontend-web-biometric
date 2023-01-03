// action - state management
import * as actionTypes from '../actionTypes';

export const initialState = {};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.SET_LOGIN_DATA:
            return {
                ...state,
                ...payload
            };
        case actionTypes.LOG_OUT:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
