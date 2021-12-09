import React from 'react'
import {Route, Switch as SwitchRoute, Redirect, useRouteMatch} from "react-router-dom"
import Tasks from "../components/rmoc/Tasks"
import Report from "../components/rmoc/Report"
import CreateTask from "../components/rmoc/CreateTask"

export default function RmOc() {
    let {path, url} = useRouteMatch()

    return (
        <div>
            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/tasks`}/>
                </Route>
                <Route exact path={`${path}/tasks`} component={Tasks}/>
                <Route exact path={`${path}/create`} component={CreateTask}/>
                <Route path={`${path}/report/:report`} component={Report}/>
                <Route path={`${path}/**`} component={Tasks}/>
            </SwitchRoute>
        </div>
    )
}
