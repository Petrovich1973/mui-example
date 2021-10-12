import React from 'react'
import reports from '../reports.json'

const rows = reports.root.row
    .filter(f => (f.NAME_PROC !== "no proc"))
    .filter(f => (f.NAME_REPORT !== "Тестовый отчет для отладки"))
    .filter(f => (f.TITLE !== "меню 1"))
    // .filter(f => (f.GROUP_NAME === 'dep_web_reports'))
    // .map((m, id) => ({...m, id}))
    // .reduce((sum, current) => {
    //     if(current.GROUP_NAME) return {parent: current.id, list: [...sum.list, current]}
    //     return {...sum, list: [...sum.list, {...current, group: sum.parent}]}
    // }, {parent: null, list: []}).list

const totalReports = rows.filter(f => f.NAME_REPORT).length

// GROUP_NAME: "arest_rep"
// MENU_NUMBER: "1"
// NAME_PROC: ""
// NAME_REPORT: ""
// TITLE: "Отчеты по арестам"

export default function Dashboard() {
    const [inputFilter, setFilter] = React.useState('')
    console.log(rows)
    const filter = el => {
        if(!inputFilter) return true
        if(!el.NAME_REPORT) return true
        // if(el.GROUP_NAME) return true
        return el.NAME_REPORT.toLowerCase().includes(inputFilter.toLowerCase()) || el.TITLE.toLowerCase().includes(inputFilter.toLowerCase())
    }
    const handleKeyUp = e => {
        setFilter(e.target.value)
    }
    return (
        <>
            <h3>Total(reports): {totalReports}</h3>
            <input value={inputFilter} onChange={handleKeyUp}/>
            <table>
            <tbody>
            {rows.filter(filter).map((row, i) => {
                return (
                    <tr key={i}>
                        {row.GROUP_NAME ?
                            <td colSpan={4} style={{color: row.GROUP_NAME === "undefined_group" ? 'red' : 'inherit'}}><strong>{row.TITLE}</strong></td> :
                            row.MENU_NUMBER.split('.').length === 2 ?
                                <><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td colSpan={3}>{row.NAME_REPORT ? row.NAME_REPORT : <strong>{row.TITLE}</strong>}</td></> :
                                row.MENU_NUMBER.split('.').length === 3 ?
                                    <><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td colSpan={2}>{row.NAME_REPORT ? row.NAME_REPORT : <strong>{row.TITLE}</strong>}</td></> :
                                    <><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td width={100} style={{borderLeft: '1px solid #ccc'}}/><td>{row.NAME_REPORT ? row.NAME_REPORT : <strong>{row.TITLE}</strong>}</td></>
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
