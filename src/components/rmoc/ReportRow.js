import React from 'react'

const styleUl = {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: '0 20px 10px',
    listStyle: 'none'
}

export default function ReportRow({row = {}}) {

    const keys = Object.keys(row)

    return (
        <tr>
            {keys.map((key, i) => <td key={i}>{row[key]}</td>)}
        </tr>
    )
}
