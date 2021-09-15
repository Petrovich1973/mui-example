import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
    reportsDoneList: [],
    user: null
};

export const testReducer = (state, action) => {
    switch(action.type) {
        case 'updateListReports':
            return {
                ...state,
                ...action.payload
            };
        case 'updateUser':
            return {
                ...state,
                user: {...action.payload}
            };
        default:
            return state
    }
};
