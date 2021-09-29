import React from "react";
import {ContextApp} from "../reducer";

export const useBreadcrumbsActions = (key, value) => {
    const {state, dispatch} = React.useContext(ContextApp);

    const setBr = React.useCallback((val) => {
        console.log(key, value)
        dispatch({
            type: 'updateState',
            payload: {br: {...state.br, [key]: val}}
        })
    }, [dispatch])

    React.useEffect(() => {
        setBr(value)
    }, [setBr])

    React.useEffect(() => {
        return () => {
            setBr(null)
        }
    }, [])

    return null
};