import React from 'react'
import {Route, Switch as SwitchRoute, Redirect, useRouteMatch, useHistory, useLocation} from "react-router-dom"
import Tasks from "../components/rmoc/Tasks"
import Report from "../components/rmoc/Report"
import CreateTask from "../components/rmoc/CreateTask"

import '../rmoc.css'

export default function RmOc() {
    let {path, url} = useRouteMatch()
    const location = useLocation()
    let history = useHistory()

    const onBack = () => history.push(`${url}`)

    console.log(path, url, location.pathname)

    return (
        <div className="pageRMOC">
            {'/rmoc/tasks' !== location.pathname && <button onClick={onBack}>back</button>}
            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/tasks`}/>
                </Route>
                <Route exact path={`${path}/tasks`} component={Tasks}/>
                <Route exact path={`${path}/create`} component={CreateTask}/>
                <Route path={`${path}/tasks/:report`} component={Report}/>
                <Route path={`${path}/**`} component={Tasks}/>
            </SwitchRoute>
        </div>
    )
}
