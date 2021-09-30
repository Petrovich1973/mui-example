import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Stepper from "./Stepper";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
    },
}));

export default function ReportCreate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Stepper/>
        </div>
    )
}
