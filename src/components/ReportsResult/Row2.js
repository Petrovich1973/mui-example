import React from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    Box, Button, CircularProgress,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {KeyboardArrowUp, KeyboardArrowDown, CheckCircleOutline} from "@material-ui/icons";

const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    nowrap: {
        whiteSpace: 'nowrap'
    },
    status: {
        margin: '0 auto',
        display: 'block'
    },
    reportName: {
        '& span': {
            display: 'flex',
            alignItems: 'center'
        }
    }
}));

export function getStatusRow(status, classes) {
    switch (status) {
        case 'waiting':
            return <CircularProgress size={18} className={classes.root}/>
        case 'complete':
            return <CheckCircleOutline size={18} className={classes.root}/>
        default:
            return <CircularProgress size={18} className={classes.root} color="secondary"/>
    }
}

export default function Row2({row}) {
    const {lineVisible, lineHide} = row
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    let {url} = useRouteMatch();
    const classes = useRowStyles();

    const handleDownloadButton = r => history.push(`${url}/${r.report}`);

    return (
        <>
            <TableRow
                className={classes.root}
                style={{background: lineVisible.status === 'waiting' ? 'rgba(0,0,0,.1)' : 'transparent'}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell className={classes.reportName}>{lineVisible.report}</TableCell>
                <TableCell>{lineVisible.dateReport}</TableCell>
                <TableCell>{lineVisible.office}</TableCell>
                <TableCell align="center" style={{verticalAlign: 'middle'}}>
                    {getStatusRow(lineVisible.status, classes)}
                </TableCell>
                <TableCell>
                    <Button
                        disabled={lineVisible.status === 'waiting'}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleDownloadButton(lineVisible)}
                    >
                        <nobr>Смотреть отчет</nobr>
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow
                style={{background: lineVisible.status === 'waiting' ? 'rgba(0,0,0,.1)' : 'transparent'}}>
                <TableCell/>
                <TableCell style={{padding: 0}} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases" style={{marginLeft: '-12px'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата создания</TableCell>
                                        <TableCell>Дата запуска</TableCell>
                                        <TableCell>Дата успешного выполнения</TableCell>
                                        <TableCell width={220}>Автор</TableCell>
                                        <TableCell>Дата удаления</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{lineHide.dateReportCreate}</TableCell>
                                        <TableCell>{lineHide.dateStart}</TableCell>
                                        <TableCell>{lineHide.dateEnd}</TableCell>
                                        <TableCell>{lineHide.author}</TableCell>
                                        <TableCell>{lineHide.dateRemove}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
