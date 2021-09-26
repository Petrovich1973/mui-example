import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
    reportsDoneList: [
        {
            reportGroups: "Формы годовой отчетности по 862-10",
            reportsList: "ВКЛ-1 Ведомость счетов, на которые наложен арест",
            date: "2021-09-11",
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '1',
            status: 'complete'
        },
        {
            reportGroups: "Отчеты для экономистов",
            reportsList: "ВКЛ-2 Ведомость условно закрытых счетов",
            date: "2021-09-12",
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '5',
            status: 'waiting'
        }
    ],
    user: {},
    br: {}
};

export const testReducer = (state, action) => {
    switch(action.type) {
        case 'updateState':
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
