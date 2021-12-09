import React from 'react'

const styleLi = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 10px',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, .6)'
}
const styleRow = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0 3px'
}
const styleTaskName = {
    display: 'block',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    fontSize: '120%'
}
const styleTaskDateCreate = {
    display: 'block'
}
const styleTaskStatus = {
    display: 'block'
}

export default function Task ({task}) {
    const {
        reportName = "Вкл-14",
        reportId = "vkl-14_001",
        reportStatus = "done",
        reportCreateDate = "2021-12-08T13:24:00",
        reportGenerationDateTime = "2021-12-08T13:24:00"
    } = task
    return(
        <li style={styleLi}>
            <span style={styleTaskName}>{reportName}</span>
            <span style={styleRow}>
                <span style={styleTaskDateCreate}>{reportCreateDate}</span>
                <span style={styleTaskStatus}>{reportStatus}</span>
            </span>
        </li>
    )
}
