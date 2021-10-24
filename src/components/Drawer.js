import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton"
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    list: {
        width: 250
    },
    listItemIcon: {
        minWidth: theme.spacing(5)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}))

export default function TemporaryDrawer() {
    const classes = useStyles()
    const [state, setState] = React.useState(false)

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setState(isOpen)
    }

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {[
                    {label: "Dashboard", link: "/home"},
                    {label: "Группы доступа", link: "/groups"}
                ].map((text, index) => (

                    <NavLink
                        className={classes.link}
                        key={index}
                        to={text.link}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.listItemIcon}>{index % 2 === 0 ? <InboxIcon/> :
                                <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text.label}/>
                        </ListItem>
                    </NavLink>


                ))}
            </List>
            <Divider/>
            <List>
                {[
                    {label: "Demo", link: "/demo"}
                ].map((text, index) => (

                    <NavLink
                        className={classes.link}
                        key={index}
                        to={text.link}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.listItemIcon}>{index % 2 === 0 ? <InboxIcon/> :
                                <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text.label}/>
                        </ListItem>
                    </NavLink>


                ))}
            </List>
        </div>
    )

    return (
        <div>
            <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    )
}
