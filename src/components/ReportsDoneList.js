import React from 'react';
import {Link} from "react-router-dom";
import {ContextApp} from "../reducer.js";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Moment from 'moment';
import {CircularProgress} from "@material-ui/core";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(name, calories, fat, carbs, protein, status) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        status,
        price: 'Ожидает запуска',
        history: [
            {date: '2020-01-05', customerId: 'dragon1', amount: 3},
        ],
    };
}

function getStatusRow(status) {
    switch (status) {
        case 'waiting':
            return <CircularProgress size={18}/>
        case 'complete':
            return 'Complete'
        default:
            return null
    }
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
                <TableCell>{getStatusRow(row.status)}</TableCell>
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
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                Some data
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

export default function ReportsDoneList() {
    const {state} = React.useContext(ContextApp);
    Moment.locale('ru');
    const {reportsDoneList = [], user} = state;
    const rows = reportsDoneList.map(row => createData(
        row.reportGroups,
        row.reportsList,
        Moment(row.date).format('DD.MM.YYYY'),
        row.method === 'tb' ? `ТБ ${user && user.tb}` : row.gosb,
        row.durationStorage,
        row.status)
    )

    if(!rows.length) return (
        <div>
            <Typography variant={'h6'}>Пока нет доступных отчетов.</Typography>
            <Typography><Link to={`./report-create`}>Создать отчет</Link></Typography>
        </div>
    )

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Группа</TableCell>
                        <TableCell>Отчет</TableCell>
                        <TableCell>Дата&nbsp;отчета</TableCell>
                        <TableCell>Масштаб</TableCell>
                        <TableCell>Хранение&nbsp;(дней)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.reverse().map((row, idx) => (
                        <Row key={idx} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
