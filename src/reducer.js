import React from "react";
import Moment from "moment";
Moment.locale('ru');
export const ContextApp = React.createContext();

export const initialState = {
    reportsDoneList: [
        {
            reportGroups: "Формы годовой отчетности по 862-10",
            reportsList: "ВКЛ-1 Ведомость счетов, на которые наложен арест",
            date: "2021-09-11",
            dateCreate: "12.09.2021",
            dateTimeStart: "12.09.2021 03:00",
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
            date: "2021-09-07",
            dateCreate: Moment().format('DD.MM.YYYY'),
            dateTimeStart: Moment().format('DD.MM.YYYY HH:mm'),
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '5',
            status: 'waiting'
        }
    ],
    user: {},
    accessGroup: {}
};

export const reducerApp = (state, action) => {
    switch(action.type) {
        case 'updateState':
            return {
                ...state,
                ...action.payload
            };
        case 'updateAccessGroup':
            return {
                ...state,
                accessGroup: {...action.payload}
            };
        default:
            return state
    }
};
