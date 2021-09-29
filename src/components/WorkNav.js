import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useRouteMatch, NavLink} from "react-router-dom"
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ListIcon from '@material-ui/icons/List';
import {ListItem, ListItemText} from "@material-ui/core";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginTop: `${theme.spacing(2)}px`,
    },
    item: {
        width: "auto",
        outline: '1px solid #ccc'
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));

export default function ButtonSizes() {
    const classes = useStyles();
    let {url} = useRouteMatch();

    return (
        <List className={classes.root}>
            <ListItem className={classes.item} button component={NavLink} to={`${url}/reports`}
                      activeClassName="Mui-selected">
                <ListIcon className={classes.icon}/>
                <ListItemText primary="Доступные отчетности"/>
            </ListItem>
            <ListItem className={classes.item} button component={NavLink} to={`${url}/schedule`}
                      activeClassName="Mui-selected" exact>
                <ScheduleIcon className={classes.icon}/>
                <ListItemText primary="Расписание"/>
            </ListItem>
            <ListItem className={classes.item} button component={NavLink} to={`${url}/report-create`}
                      activeClassName="Mui-selected" exact>
                <PlaylistAddIcon className={classes.icon}/>
                <ListItemText primary="Создать новый отчет"/>
            </ListItem>
        </List>
    );
}
