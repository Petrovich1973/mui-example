import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ReactComponent as Logo} from './Sberbank_Logo_2020.svg';

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            flexGrow: 1,
            height: `15vh`,
            marginBottom: `50px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(62.79% 62.79% at 16.88% 100%, #ECE831 0%, rgba(236, 232, 49, 0) 100%), radial-gradient(74.41% 74.41% at 16.88% -16.26%, #0989D1 0%, rgba(9, 137, 209, 0) 100%), linear-gradient(90deg, #78B683 -1.09%, #21A037 100%)`
        }
    })
});

export default function CustomComponent() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Logo width="40%" height="50%"/>
        </div>
    );
}
