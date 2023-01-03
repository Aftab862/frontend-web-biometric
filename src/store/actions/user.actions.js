import * as ActionTypes from '../actionTypes';

export const login = (userData) => ({ type: ActionTypes.SET_LOGIN_DATA, payload: userData });

export const logout = () => ({ type: ActionTypes.LOG_OUT });
