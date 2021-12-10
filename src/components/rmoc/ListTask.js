import React from 'react'
import Task from "./Task";

const styleUl = {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: '0 20px 10px',
    listStyle: 'none'
}

export default function ListTask ({list = []}) {
    return(
        <ul style={styleUl} className="listTasks">
            {list.map((task, i) => <Task key={i} task={task}/>)}
            <li>end list</li>
        </ul>
    )
}
