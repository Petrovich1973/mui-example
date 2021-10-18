import React from "react";
import Moment from "moment";
Moment.locale('ru');
export const ContextApp = React.createContext();

export const initialState = {
    reportsDoneList: [
        {
            id: 1634299877160,
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
            status: 'complete',
            author: {
                name: 'Щуренков А.А.',
                login: 'ShchurenkovAA'
            }
        },
        {
            id: 1634299877161,
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
            status: 'waiting',
            author: {
                name: 'Билецкая С.С.',
                login: 'SSBiletskaya'
            }
        },
        {
            id: 1634299877162,
            reportGroups: "Отчеты для экономистов",
            reportsList: "Форма 410(7.119) Сведения о пассивах (остатках на вкладах) по видам валют и стран",
            date: "2021-09-06",
            dateCreate: Moment().format('DD.MM.YYYY'),
            dateTimeStart: Moment().format('DD.MM.YYYY HH:mm'),
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '3',
            status: 'complete',
            author: {
                name: 'Выгодин В.В',
                login: 'Vigodin-VV'
            }
        },
        {
            id: 1634299877163,
            reportGroups: "Отчеты для экономистов",
            reportsList: "Отчет о нерезидентах получивших карту Моментум",
            date: "2021-09-06",
            dateCreate: Moment().format('DD.MM.YYYY'),
            dateTimeStart: Moment().format('DD.MM.YYYY HH:mm'),
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '3',
            status: 'complete',
            author: {
                name: 'Выгодин В.В.',
                login: 'Vigodin-VV'
            }
        },
        {
            id: 1634299877164,
            reportGroups: "Отчеты для экономистов",
            reportsList: "Отчеты по операциям (вариант поиска по партициям счета)",
            date: "2021-09-06",
            dateCreate: Moment().format('DD.MM.YYYY'),
            dateTimeStart: Moment().format('DD.MM.YYYY HH:mm'),
            method: 'tb',
            execution: 'now',
            gosb: null,
            range: 'daily',
            durationStorage: '3',
            status: 'complete',
            author: {
                name: 'Билецкая С.С.',
                login: 'SSBiletskaya'
            }
        }
    ],
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
            path: 'Группа отчета/Подгруппа отчета/Наименование отчета',
            name: 'Наименование отчета'
        },

        // Дата и время создания заявки на формирование отчета
        reportRequestDateTimeFormation: 1634550874757,

        // Дата заказываемого отчета
        reportRequestDateTime: 1633478400000,

        // Планируемые дата и время запуска формирования отчета
        reportRequestDateTimeLaunch: 1634551117232,

        // Дата и время окончания формирования отчета (отчет готов к использованию)
        reportRequestDateTimeCompleteFormation: 1634551281865,

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
        reportRequestStatus: 'witting'
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
