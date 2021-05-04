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
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
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
                {['Inbox', 'Starred', 'Send email for model transition', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon className={classes.listItemIcon}>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon className={classes.listItemIcon}>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
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