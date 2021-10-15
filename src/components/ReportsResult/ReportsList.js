import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';
import {ContextApp} from "../../reducer.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Switch, Box} from '@material-ui/core';
import {styled, makeStyles} from '@material-ui/core/styles'
import delay from "../../utils/delay";
import Row from "./Row";

const useRowStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px 0',
        '& > *': {
            borderBottom: 'unset',
        },
        '& > * + *': {
            marginLeft: '10px'
        },
    }
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function ReportsList() {
    const {state, dispatch} = React.useContext(ContextApp);
    Moment.locale('ru');
    const classes = useRowStyles();
    const {reportsDoneList = [], accessGroup, user} = state;
    const [rows, setRows] = React.useState([])

    const filter = ({author: {login}}) => {
        if(!user.settings.viewAll) return user.login === login
        return true
    }

    const listReports = rows.filter(filter)

    const createData = React.useCallback((id, name, calories, fat, carbs, protein, status, dateCreate, dateTimeStart, author) => {
        return {
            id,
            name,
            calories,
            fat,
            carbs,
            status,
            history: [
                {
                    date: fat,
                    dateCreate,
                    dateTimeStart,
                    customerId: author.name,
                    protein
                },
            ],
            author
        };
    }, [])

    const createRows = React.useCallback(() => reportsDoneList.map(row => createData(
        row.id,
        row.reportGroups,
        row.reportsList,
        Moment(row.date).format('DD.MM.YYYY'),
        `${accessGroup && accessGroup.tb}ТБ ${row.gosb ? `/ ${row.gosb}` : ''} ${row.gosb && row.vsp ? `/ ${row.vsp}` : ''}`,
        row.durationStorage,
        row.status,
        row.dateCreate,
        row.dateTimeStart,
        row.author)
    ), [accessGroup, reportsDoneList, createData])

    // Эмуляция изменения статуса готовности отчета
    const validateStatus = React.useCallback(() => {
        if (reportsDoneList.some(el => el.status === 'waiting')) delay(7000).then(() => {
            dispatch({
                type: 'updateState',
                payload: {
                    reportsDoneList: reportsDoneList.map(el => ({
                        ...el,
                        status: 'complete',
                        dateTimeStart: Moment().format('DD.MM.YYYY HH:mm')
                    }))
                }
            })
        })
    }, [dispatch, reportsDoneList])

    const handleChangeSwitch = e => {
        dispatch({
            type: 'updateSettings',
            payload: {
                viewAll: e.target.checked
            }
        })
    }

    React.useEffect(() => {
        setRows(createRows().reverse())
        validateStatus()
    }, [createRows, validateStatus])

    if (!rows.length) return (
        <div>
            <Typography variant={'h6'}>Пока нет доступных отчетов.</Typography>
            <Typography><Link to={`./report-create`}>Создать отчет</Link></Typography>
        </div>
    )

    return (
        <>
            <Box className={classes.root}>
                <Typography>Только мои</Typography>
                <AntSwitch
                    checked={user.settings.viewAll}
                    onChange={handleChangeSwitch}
                    inputProps={{'aria-label': 'ant design'}}/>
                <Typography>Всей группы</Typography>
            </Box>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Группа</TableCell>
                            <TableCell>Отчет</TableCell>
                            <TableCell>Дата&nbsp;отчета</TableCell>
                            <TableCell>Масштаб</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listReports.map((row, idx) => (
                            <Row key={idx} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
