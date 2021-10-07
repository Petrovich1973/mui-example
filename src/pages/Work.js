import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {
    Switch as SwitchRoute,
    Route,
    Redirect,
    useParams,
    useRouteMatch,
    Link
} from "react-router-dom";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Breadcrumbs, Box, Typography} from "@material-ui/core";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import WorkNav from "../components/WorkNav";
import ReportsList from "../components/ReportsResult/ReportsList";
import Schedule from "../components/Schedule";
import ReportCreate from "../components/ReportCreate";
import {ContextApp} from "../reducer";
import {groupList} from "../data"
import ReportDetail from "../components/ReportsResult/ReportDetail";

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: "center",
        color: 'inherit',
        textDecoration: "none",
        textTransform: "none"
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
    separator: {
        lineHeight: 2
    }
}));

function createData([name, group, lastName, position, osb, tb]) {
    return {name, group, lastName, position, osb, tb};
}

const BreadcrumbsGroups = () => (
    <React.Fragment>
        <PeopleOutlineIcon fontSize="medium" className={useStyles().icon}/>
    </React.Fragment>
)
const BreadcrumbsGroup = ({match}) => {
    return (
        <React.Fragment>
            <Typography variant="caption" display="block">группа</Typography>
            <div style={{width: 4}}/>
            <Box fontWeight='fontWeightBold' display='block'>{match.params.group}</Box>
        </React.Fragment>
    )
}

const BreadcrumbsReport = ({match}) => {
    return (
        <React.Fragment>
            <Typography variant="caption" display="block">отчет</Typography>
            <div style={{width: 4}}/>
            <Box fontWeight='fontWeightBold' display='block'>{match.params.report}</Box>
        </React.Fragment>
    )
}

const routeConfig = [
    {
        path: "/groups",
        breadcrumb: BreadcrumbsGroups,
    },
    {
        path: "/groups/:group",
        breadcrumb: BreadcrumbsGroup,
    },
    {
        path: "/groups/:group/reports/:report",
        breadcrumb: BreadcrumbsReport,
    }
];

export default function Work() {
    const {dispatch} = React.useContext(ContextApp);
    let {user} = useParams();
    let {path, url} = useRouteMatch();
    const breadcrumbs = useBreadcrumbs(routeConfig, {
        excludePaths: ['/', '/groups/:group/reports']
    });

    const classes = useStyles();

    // Нахожу пользователя в списке пользователей по параметру роутера и сохраняю его в reducer
    const setUsers = React.useCallback(() => {
        const res = groupList.map(el => createData(el)).find(el => el.name === user)
        dispatch({
            type: 'updateAccessGroup',
            payload: res
        })
    }, [dispatch, user])

    React.useEffect(() => {
        setUsers()
    }, [setUsers])

    return (
        <>

            <Breadcrumbs aria-label="breadcrumb" separator="›">
                {breadcrumbs.map(({match, breadcrumb}, idx) => (
                    <Link
                        to={match.url}
                        key={idx}
                        className={classes.link}>{breadcrumb}</Link>
                ))}
            </Breadcrumbs>

            <WorkNav/>

            <div style={{height: 10}}/>

            <SwitchRoute>
                <Route exact path={path}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Redirect to={`${url}/reports`}/>
                </Route>
                <Route exact path={`${path}/reports`} component={ReportsList}/>
                <Route path={`${path}/reports/:report`} component={ReportDetail}/>
                <Route exact path={`${path}/schedule`} component={Schedule}/>
                <Route exact path={`${path}/report-create`} component={ReportCreate}/>
            </SwitchRoute>
        </>
    )
}
