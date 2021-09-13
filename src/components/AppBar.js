import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import TemporaryDrawer from "./Drawer"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    header: {
        boxShadow: "none"
    },
    title: {
        flexGrow: 1
    }
}))

export default function MenuAppBar() {
    const classes = useStyles()
    const [auth] = React.useState(true)
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
                        Витрины отчетности по вкладам и счетам ФЛ в РМ ОЦ
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle fontSize={'large'}/>
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
