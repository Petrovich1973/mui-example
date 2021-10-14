import React from 'react'
import reports from '../reports.json'

const rows = reports.root.row
    .filter(f => (f.NAME_PROC !== "no proc"))
    .filter(f => (f.NAME_REPORT !== "Тестовый отчет для отладки"))
    .filter(f => (f.TITLE !== "меню 1"))

// console.log(rowsReform(rows))

function findLastIndex(array, searchKey, long) {
    return array.reduce((s, c, i) => {
        if (c[searchKey].split('.').length === long) s.push(i)
        return s
    }, []).pop()
}

const resultList = rows
    .reduce((sum, current) => {
        if (current.GROUP_NAME) sum.push({...current, children: []})
        else sum[sum.length - 1].children.push({...current, children: []})
        return sum
    }, [])
    .filter(f => (f.GROUP_NAME === 'dep_web_reports'))
    .map(row => {
        return (
            row.children.reduce((sum, current) => {
                if (current.MENU_NUMBER.split('.').length === 3) {
                    const parentIndex = findLastIndex(sum, 'MENU_NUMBER', 2)
                    sum[parentIndex].children.push({...current})
                } else if (current.MENU_NUMBER.split('.').length === 4) {
                    const parentIndex2 = findLastIndex(sum, 'MENU_NUMBER', 2)
                    const parentIndex3 = findLastIndex(sum[parentIndex2].children, 'MENU_NUMBER', 3)
                    sum[parentIndex2].children[parentIndex3].children.push({...current})
                } else sum.push(current)
                return sum
            }, [])
        )
    })


const totalReports = rows.filter(f => f.NAME_REPORT).length

// GROUP_NAME: "arest_rep"
// MENU_NUMBER: "1"
// NAME_PROC: ""
// NAME_REPORT: ""
// TITLE: "Отчеты по арестам"

export default function Dashboard() {
    const [inputFilter, setFilter] = React.useState('')
    const [select1, setS1] = React.useState('')
    const [select2, setS2] = React.useState('')

    const filter = el => {
        if (!inputFilter) return true
        if (!el.NAME_REPORT) return true
        // if(el.GROUP_NAME) return true
        return el.NAME_REPORT.toLowerCase().includes(inputFilter.toLowerCase()) || el.TITLE.toLowerCase().includes(inputFilter.toLowerCase())
    }
    const handleChange = e => {
        setFilter(e.target.value)
    }

    const selectChange = (e) => {

        setS1(e.target.value)
    }

    console.log(resultList)

    return (
        <>
            <h3>Total(reports): {totalReports}</h3>
            <input value={inputFilter} onChange={handleChange}/>
            <div>
                <select name="q" id="q" value={select1.TITLE} onChange={selectChange} style={{width: 400}}>
                    {resultList.reduce((sum, current) => {
                        current.forEach(el => sum.push(el))
                        return sum
                    }, []).map((option, i) => (
                        <option key={i} value={option.TITLE}>{option.TITLE}</option>
                    ))}
                </select>
            </div>
            {select1 && <div>
                <select name="w" id="w" value={select1.TITLE} onChange={selectChange} style={{width: 400}}>
                    {resultList.reduce((sum, current) => {
                        current.forEach(el => sum.push(el))
                        return sum
                    }, []).find(f => f.TITLE === select1).children.reduce((sum, current) => {
                        current.forEach(el => sum.push(el))
                        return sum
                    }, []).map((option, i) => (
                        <option key={i} value={option.TITLE}>{option.TITLE}</option>
                    ))}
                </select>

            </div>}
            {/*<table className="table">
                <tbody>
                {rows.filter(filter).map((row, i) => {
                    const isDouble = rows.filter(f => (f.NAME_REPORT === row.NAME_REPORT)).length > 1
                    const isSearchRow = `${row.GROUP_NAME}---${row.TITLE}---${row.NAME_REPORT}`.includes(inputFilter)
                    return (
                        <tr key={i}
                            style={inputFilter && isSearchRow ? {color: 'orange'} : inputFilter ? {opacity: '.3'} : {}}>
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
            </table>*/}
            <div style={{height: 100}}/>
        </>
    )
}
