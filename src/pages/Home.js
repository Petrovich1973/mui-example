import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Cron from "../components/Cron";
import reports from '../reports.json'

const useStyles = makeStyles((theme) => ({
    list: {
        fontSize: "larger",
        lineHeight: 2
    }
}));
// {
//     "GROUP_NAME": "",
//     "MENU_NUMBER": "1.1",
//     "TITLE": "Отчет по исполненным ИД",
//     "NAME_PROC": "sequest_doid.rolling",
//     "NAME_REPORT": "Отчет по исполненным ИД"
// }
export default function Home() {
    const classes = useStyles();
    const [expand, setExpand] = React.useState([])

    // const rows = reports.root.row.reduce((sum, current) => {
    //     if((!sum.some(f => f.TITLE === current.TITLE))) sum.push(current)
    //     return sum
    // }, [])

    // console.log(
    //     reports.root.row.filter(f => f.GROUP_NAME && f.TITLE !== 'Все отчеты пользователя')
    // )

    const rows = reports.root.row
        .filter(f => (f.NAME_PROC !== "no proc"))
        .reduce((sum, current) => {
            if (current.GROUP_NAME) sum.push({...current, children: []})
            else sum[sum.length - 1].children.push(current)
            return sum
        }, [])
        .map(m => {
            m.children.map(mm => {
                if(m.GROUP_NAME === 'dep_web_reports' && mm.MENU_NUMBER.split('.').length > 3) console.log(mm.TITLE, m.children.length)
                return mm
            })
            return m
        })
        .filter(f => (f.GROUP_NAME === 'dep_web_reports'))

// ОТЧЕТЫ ПОЛЬЗОВАТЕЛЯ по данным интегратора экономических форм
// ОТЧЕТЫ ПОЛЬЗОВАТЕЛЯ по данным сводной ведомости начисленных процентов
// ФОРМА 68
    return (
        <div>

            <table className={'table'}>
                <thead>
                <tr>
                    <th colSpan={2}/>
                    <th align={'left'}>Группа</th>
                    <th colSpan={2}/>
                    <th align={'left'}>Наименование</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <tr>
                                <td align={'right'}>{idx + 1}</td>
                                <td>{row.MENU_NUMBER}</td>
                                <td>{row.GROUP_NAME}</td>
                                <td>{row.children.length ? (<span>({row.children.length})</span>) : '-'}</td>
                                <td>
                                    {row.children.length ? (<span><button
                                        style={{width: 30, cursor: 'pointer', textAlign: 'center'}} onClick={() => {
                                        if (!expand.includes(idx)) setExpand([idx])
                                        else setExpand(expand.filter(f => f !== idx))
                                    }}>{!expand.includes(idx) ? '+' : '-'}</button></span>) : ''}
                                </td>
                                <td width={400}>{row.TITLE}</td>
                            </tr>

                            {row.children && expand.includes(idx) && (
                                <tr style={{fontSize: '80%'}}>
                                    <td/>
                                    <td colSpan={5}>
                                        <table border="1" cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th/>
                                                <th align={'left'}>Наименование</th>
                                                <th align={'left'}>Отчет</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {row.children.map((subRow, idxSubRow) => {
                                                if (!subRow.NAME_REPORT) return (
                                                    <React.Fragment key={idxSubRow}>
                                                        <tr>
                                                            <td>{subRow.MENU_NUMBER}</td>
                                                            <td width={300} colSpan={2}>{subRow.TITLE}</td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                                return (
                                                    <React.Fragment key={idxSubRow}>
                                                        <tr>
                                                            <td>{subRow.MENU_NUMBER}</td>
                                                            <td width={300}>{subRow.TITLE}</td>
                                                            <td width={300}><em>{subRow.NAME_REPORT}</em></td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    )
                })}
                </tbody>
            </table>
            {/*<ol>
                {rows.map((row, idx) => {
                    if(idx === 5) console.log(row)
                    return (
                        <React.Fragment key={idx}>
                            <li>
                                {row.GROUP_NAME} {row.children.length ? (<span>({row.children.length}) <button style={{width: 30, cursor: 'pointer', textAlign: 'center'}} onClick={() => {
                                if(!expand.includes(idx)) setExpand([idx])
                                else setExpand(expand.filter(f => f !== idx))
                            }}>{!expand.includes(idx) ? '+' : '-'}</button></span>) : ''} - <strong>{row.TITLE}</strong>
                            </li>

                            {row.children && expand.includes(idx) && (
                                <ol style={{fontSize: '80%'}}>
                                    {row.children.map((subRow, idxSubRow) => (
                                        <li key={idxSubRow}>{subRow.TITLE} - {subRow.NAME_REPORT}</li>
                                    ))}
                                </ol>
                            )}
                        </React.Fragment>
                    )
                })}
            </ol>*/}

            {/*<Cron />*/}

            {/*<Typography variant="h6" component="h3" gutterBottom>
                Элементы пользовательского сценария:
            </Typography>

            <ul className={classes.list}>
                <li>Список пользователей (в каких случаях необходимо выбирать из списка?)</li>
                <li>Список отчетностей (сколько примерно отчетностей? поиск необходим? как группировать отчетности?)
                </li>
                <li>Конфигурация запроса (визард. пошаговая настройка запроса)</li>
                <li>Список сохраненных конфигураций запросов в разрезе отчетностей (фича)</li>
                <li>Список существующих запросов (завершенных, незавершенных, с ошибкой)</li>
                <li>Детализация резултата запроса и его настройки (например доступ, расписание)</li>
            </ul>*/}

        </div>
    )
}
