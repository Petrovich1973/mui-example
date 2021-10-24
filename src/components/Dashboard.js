import React from 'react'
import reports from '../reports.json'
import FormSelectStructure from "./FormSelectStructure"
import {resultList} from './FormSelectStructure'

const rows = reports.root.row
    .filter(f => (f.NAME_PROC !== "no proc"))
    .filter(f => (f.NAME_REPORT !== "Тестовый отчет для отладки"))
    .filter(f => (f.TITLE !== "меню 1"))

const totalReports = rows.filter(f => f.NAME_REPORT).length

export default function Dashboard() {

    const totalDepWebReports = resultList.filter(f => f.NAME_REPORT).length

    const isReportSelect = value => console.log(value)

    return (
        <>
            <div>
                Пример выбора отчета в группе <strong>dep_web_reports.</strong> Найдено: <big>{totalDepWebReports} отчетов</big>
            </div>
            <div style={{height: 10}}/>

            <FormSelectStructure isReportSelect={isReportSelect}/>

            <div style={{height: 100}}/>
            <h3>Список всех отчетов: {totalReports}</h3>
            <table className="table">
                <tbody>
                {rows.map((row, i) => {
                    const isDouble = rows.filter(f => (f.NAME_REPORT === row.NAME_REPORT)).length > 1
                    return (
                        <tr key={i}>
                            {row.GROUP_NAME ?
                                <td colSpan={4}
                                    style={{color: row.GROUP_NAME === "undefined_group" ? 'red' : 'inherit'}}>
                                    <strong>{row.TITLE} <small>(<em>{row.GROUP_NAME}</em>)</small></strong></td> :
                                row.MENU_NUMBER.split('.').length === 2 ?
                                    <>
                                        <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                        <td colSpan={3}>{row.NAME_REPORT ? <>
                                            <span>{row.NAME_REPORT}</span> {isDouble && (
                                            <small>{row.TITLE}</small>)}</> : <strong>{row.TITLE}</strong>}</td>
                                    </> :
                                    row.MENU_NUMBER.split('.').length === 3 ?
                                        <>
                                            <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                            <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                            <td colSpan={2}>{row.NAME_REPORT ? <>
                                                <span>{row.NAME_REPORT}</span> {isDouble && (
                                                <small>{row.TITLE}</small>)}</> : <strong>{row.TITLE}</strong>}</td>
                                        </> :
                                        <>
                                            <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                            <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                            <td width={100} style={{borderLeft: '1px solid #ccc'}}/>
                                            <td>{row.NAME_REPORT ? <><span>{row.NAME_REPORT}</span> {isDouble && (
                                                <small>{row.TITLE}</small>)}</> : <strong>{row.TITLE}</strong>}</td>
                                        </>
                            }
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div style={{height: 100}}/>
        </>
    )
}
