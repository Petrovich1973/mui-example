import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import TemporaryDrawer from "./Drawer"
import {ContextApp} from "../reducer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    header: {
        boxShadow: "none"
    },
    title: {
        flexGrow: 1
    },
    userBox: {
        display: "flex",
        alignItems: "center"
    }
}))

export default function MenuAppBar() {
    const classes = useStyles()
    const {state} = React.useContext(ContextApp);
    const {auth, user} = state
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent" className={classes.header}>
                <Toolbar>

                    <TemporaryDrawer/>
                    <Typography variant="h5" className={classes.title}>
                        Отчеты по вкладам и счетам ФЛ в РМ ОЦ
                    </Typography>

                    {auth && (
                        <div className={classes.userBox}>
                            <Typography component="span">
                                <span style={{height: 5, display: 'block'}} />
                                <small><em>{user.position}</em></small> {user.name}
                            </Typography>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <PermIdentityIcon fontSize={'large'}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Выйти</MenuItem>
                                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
