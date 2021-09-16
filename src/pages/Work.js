import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import {
    Switch as SwitchRoute,
    Route
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import WorkNav from "../components/WorkNav";
import ReportsDoneList from "../components/ReportsDoneList";
import Schedule from "../components/Schedule";
import {Breadcrumbs} from "@material-ui/core";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Link from "@material-ui/core/Link";
import ReportCreate from "../components/ReportCreate";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: "flex-end"
    },
    icon: {
        marginRight: theme.spacing(0.5),
    }
}));

export default function Work() {
    const classes = useStyles();
    let {user} = useParams();
    let {path, url} = useRouteMatch();
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/users" className={classes.link}>
                    <PeopleOutlineIcon fontSize="medium" className={classes.icon}/>
                </Link>
                <Typography component='div' color="textPrimary" className={classes.link}>
                    <Typography variant="caption" display="block">
                        пользователь
                    </Typography>
                    <div style={{width: 10}}/>
                    <Box fontWeight='fontWeightBold' display='block'>{user}</Box>
                </Typography>
            </Breadcrumbs>

            <WorkNav/>

            <div style={{height: 10}}/>

            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/reports-done`}/>
                </Route>
                <Route exact path={`${path}/reports-done`}>
                    <ReportsDoneList/>
                </Route>
                <Route exact path={`${path}/schedule`}>
                    <Schedule/>
                </Route>
                <Route exact path={`${path}/report-create`}>
                    <ReportCreate/>
                </Route>
            </SwitchRoute>
        </div>
    )
}
