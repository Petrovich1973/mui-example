import React from "react";
import Moment from "moment";
Moment.locale('ru');
export const ContextApp = React.createContext();

export const initialState = {
    theme: true,
    reportsDoneList: [],
    auth: true,
    user: {
        name: 'Выгодин В.В',
        login: 'Vigodin-VV',
        position: 'Ведущий экономист',
        permission: ['dep_web_reports', 'dep_web_insrep', 'fc_dep_web_reports'],
        settings: {
            viewAll: false
        }
    },
    accessGroup: {},
    reportRequest: {

        // Группа доступа
        reportGroup: 'Группа доступа',

        // Шаблон отчета
        reportTpl: {
            path: 'ФОРМА 68 / Отчеты для ф.68 / Ф.68 В разрезе филиалов (рубли)',
            name: 'Ф.68 В разрезе филиалов (рубли)'
        },

        // Дата и время создания заявки на формирование отчета
        reportRequestDateTimeFormation: 1634550874757,

        // Дата заказываемого отчета
        reportDateTime: 1633478400000,

        // Планируемые дата и время запуска формирования отчета
        reportRequestDateTimeLaunch: 1634551117232,

        // Дата и время окончания формирования отчета (отчет готов к использованию)
        reportRequestDateTimeCompleteFormation: null,

        // ТБ/ОСБ/ВСП
        unit: {
            tb: '38',
            osb: '4540',
            vsp: '0009'
        },

        // Автор
        author: {
            name: 'Выгодин В.В',
            login: 'Vigodin-VV'
        },

        // Запланированные дата и время удаления сформированного отчета
        scheduledDeletion: 1636156800000,

        // Расписание
        schedule: '',

        // Статус формирования отчета witting | processing | complete | error
        reportRequestStatus: 'waiting'
    }
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
        case 'updateSettings':
            return {
                ...state,
                user: {
                    ...state.user,
                    settings: {...action.payload}
                }
            };
        default:
            return state
    }
};
