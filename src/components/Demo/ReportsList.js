import React from 'react'
import {FormReportSelect} from "./FormReportSelect";
import {Button} from "@material-ui/core";

const Row = ({row = {}, expand = false}) => {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setOpen(expand)
    }, [expand])

    return (
        <li>
            {row.NAME_REPORT ?
                (<strong>{row.NAME_REPORT.replace(/""/g, '"')}</strong>) :
                (<span onClick={() => setOpen(!open)}>
                    {row.children.length ?
                        <button className="openBtn">{open ? '-' : '+'}</button> :
                        ''} {row.TITLE.replace(/""/g, '"')}
                </span>)}
            {(row.children.length && open) ? createRow(row.children, expand) : ''}
        </li>
    )
}

export const createRow = (list, expand) => {
    return (
        <ul className="children">
            {list.map((row, i) => (
                <Row key={i} row={row} expand={expand}/>
            ))}
        </ul>
    )
}

export function ReportsList({list = [], reportsCount = 0}) {
    const [rows, setRows] = React.useState([])
    const [expand, setExpand] = React.useState(false)

    React.useEffect(() => {
        setRows(list)
    }, [list])

    if (!rows.length) return (
        <p align="center">Список пуст</p>
    )

    return (
        <div>
            <div>
                <div>
                    <p>Всего уникальных отчетов: {reportsCount}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setExpand(!expand)}
                    >{expand ? 'Свернуть все' : 'Развернуть все'}</Button>
                </div>
                <FormReportSelect report={rows.find(f => (f.group === 'dep_web_reports'))} group={'dep_web_reports'}/>
            </div>
            <ul className="groups">
                {rows.map((row, i) => (
                    <li key={i}>
                        {row.group}
                        {createRow(row.children, expand)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
