import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useRouteMatch, NavLink} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginTop: `${theme.spacing(2)}px`,
    },
    link: {
        marginRight: theme.spacing(2),
        color: '#000'
    },
}));

export default function ButtonSizes() {
    const classes = useStyles();
    let {url} = useRouteMatch();

    return (
        <div className={classes.root}>
            <NavLink
                className={classes.link}
                to={`${url}/reports-done`}
                activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                }}
            >Доступные отчетности</NavLink>
            <NavLink
                className={classes.link}
                to={`${url}/schedule`}
                activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                }}
            >Расписание</NavLink>
            <NavLink
                className={classes.link}
                to={`${url}/reports-create`}
                activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                }}
            >+ Создать отчетность</NavLink>
        </div>
    );
}
