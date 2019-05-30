import {ERROR, GET_ALL_USERS, SET_MANAGED_USER} from './types';
import {backend} from "../apis/backend";
import {camelCaseObject} from "../util/db";

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = (await backend.get('/users')).data.data.map(object => camelCaseObject(object));
        dispatch({
            type: GET_ALL_USERS,
            payload: {users: response}
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response}
        })
    }
};

export const setManagedUser = (managedUser) => {
    return {
        type: SET_MANAGED_USER,
        payload: {
            managedUser
        }
    }
};
