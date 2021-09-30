import {useHistory, useRouteMatch} from "react-router-dom";
import React from "react";
import {
    Box, Button, CircularProgress,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
    }
}));

export function getStatusRow(status, classes) {
    switch (status) {
        case 'waiting':
            return <CircularProgress size={18} className={classes.root}/>
        case 'complete':
            return <CheckCircleOutlineIcon size={18} className={classes.root}/>
        default:
            return <CircularProgress size={18} className={classes.root}/>
    }
}

export default function Row({row}) {
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    let {url} = useRouteMatch();
    const classes = useRowStyles();

    const handleDownloadButton = r => history.push(`${url}/${r.calories}`);

    return (
        <>
            <TableRow
                className={classes.root}
                style={{background: row.status === 'waiting' ? 'rgba(0,0,0,.1)' : 'transparent'}}>
                <TableCell>
                    {row.status !== 'waiting' && <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>}
                </TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell className={classes.nowrap}>{row.carbs}</TableCell>
                <TableCell align="right" style={{verticalAlign: 'middle'}}>
                    {getStatusRow(row.status, classes)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Детали отчета
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата создания</TableCell>
                                        <TableCell>Автор</TableCell>
                                        <TableCell>Хранение</TableCell>
                                        <TableCell width={100}/>
                                        <TableCell width={100}/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell>
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell>{historyRow.protein} д.</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleDownloadButton(row)}
                                                >Смотреть</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="inherit"
                                                    onClick={() => handleDownloadButton(row)}
                                                >Скачать</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}