import React from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import {
    Switch as SwitchRoute,
    Route
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import WorkNav from "../components/WorkNav";
import ReportsDoneList from "../components/ReportsDoneList";

export default function Work() {
    let {user} = useParams();
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Typography variant="h6" component="h3" gutterBottom>
                Пользователь {user}
            </Typography>
            <WorkNav/>
            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/reports-done`} />
                </Route>
                <Route exact path={`${path}/reports-done`}>
                    <ReportsDoneList/>
                </Route>
            </SwitchRoute>
        </div>
    )
}
