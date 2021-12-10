import React from 'react'
import Search from "./Search";
import ListTask from "./ListTask";
import axios from "axios";

const styleBlock = {
    display: 'inline-block',
    minWidth: 400,
    maxWidth: 600,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, .04)'
}

const url = 'http://localhost:3001/task'

export default function Tasks() {
    const [list, setList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(res => setList(res.data))
            .catch(err => alert(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading)
        return (
            <div>Waiting...</div>
        )

    return (
        <div style={styleBlock} className="pageTasks">
            <Search/>
            <ListTask list={[...list, ...list, ...list, ...list, ...list, ...list, ...list]}/>
        </div>
    )
}
