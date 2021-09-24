import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Redirect, useParams, useRouteMatch, useLocation, useHistory} from "react-router-dom";
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
import {ContextApp} from "../reducer";
import {usersList} from "../data"
import ReportDetail from "../components/ReportDetail";

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: "flex-end"
    },
    icon: {
        marginRight: theme.spacing(0.5),
    }
}));

function createData([name, group, lastName, position, osb, tb]) {
    return {name, group, lastName, position, osb, tb};
}

export default function Work() {
    const {state, dispatch} = React.useContext(ContextApp);
    const classes = useStyles();
    let {brUser = null, brReport = null} = state.br
    let {user} = useParams();
    let {path, url} = useRouteMatch();

    const setUsers = React.useCallback( () => {
        const res = usersList.map(el => createData(el)).find(el => el.name === user)
        dispatch({
            type: 'updateUser',
            payload: res
        })
    }, [dispatch, user])

    React.useEffect(() => {
        setUsers()
    }, [setUsers])

    const setBr = React.useCallback(() => {
        dispatch({
            type: 'updateListReports',
            payload: {br: {...state.br, brUser: user}}
        })
    }, [])

    React.useEffect(() => {
        setBr()
    }, [])

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/users" className={classes.link}>
                    <PeopleOutlineIcon fontSize="medium" className={classes.icon}/>
                </Link>
                {brUser && <Typography component='div' color="textPrimary" className={classes.link}>
                    <Typography variant="caption" display="block">
                        роль
                    </Typography>
                    <div style={{width: 10}}/>
                    <Box fontWeight='fontWeightBold' display='block'>{brUser}</Box>
                </Typography>}
                {brReport && <Typography component='div' color="textPrimary" className={classes.link}>
                    <Typography variant="caption" display="block">
                        отчет
                    </Typography>
                    <div style={{width: 10}}/>
                    <Box fontWeight='fontWeightBold' display='block'>{brReport}</Box>
                </Typography>}
            </Breadcrumbs>

            <WorkNav/>

            <div style={{height: 10}}/>

            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/reports`}/>
                </Route>
                <Route exact path={`${path}/reports`}>
                    <ReportsDoneList/>
                </Route>
                <Route exact path={`${path}/reports/:report`}>
                    <ReportDetail/>
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
