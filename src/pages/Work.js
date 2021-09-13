import React from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import {
    Switch as SwitchRoute,
    Route
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import WorkNav from "../components/WorkNav";
import ReportsDoneList from "../components/ReportsDoneList";
import Schedule from "../components/Schedule";

export default function Work() {
    let {user} = useParams();
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Typography variant="h6" component="h3" gutterBottom>
                Пользователь {user}
            </Typography>
            <WorkNav/>
            <div style={{height: 10}}></div>
            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/reports-done`} />
                </Route>
                <Route exact path={`${path}/reports-done`}>
                    <ReportsDoneList/>
                </Route>
                <Route exact path={`${path}/schedule`}>
                    <Schedule/>
                </Route>
            </SwitchRoute>
        </div>
    )
}
