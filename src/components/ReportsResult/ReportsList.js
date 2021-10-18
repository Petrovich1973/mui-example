import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';
import {ContextApp} from "../../reducer.js";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Switch,
    Box,
    Button
} from '@material-ui/core';
import {styled, makeStyles} from '@material-ui/core/styles'
import delay from "../../utils/delay";
import Row from "./Row";
import Row2 from "./Row2";

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
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const AntSwitch = styled(Switch)(({theme}) => ({
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
    const {reportsDoneList = [], accessGroup, user, reportRequest} = state;
    const [rows, setRows] = React.useState([])
    const [rows2, setRows2] = React.useState([])

    const filter = ({author: {login}}) => {
        if (!user.settings.viewAll) return user.login === login
        return true
    }
    const filter2 = ({login}) => {
        if (!user.settings.viewAll) return user.login === login
        return true
    }
    const listReports = rows.filter(filter)
    const listReports2 = rows2.filter(filter2)

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

    const handleChangeSwitch = value => {
        dispatch({
            type: 'updateSettings',
            payload: {
                viewAll: value
            }
        })
    }

    React.useEffect(() => {
        setRows(createRows().reverse())
        validateStatus()
    }, [createRows, validateStatus])

    const createRows2 = React.useCallback(() => [{...reportRequest}, {...reportRequest, author: {
            name: 'Билецкая С.С.',
            login: 'SSBiletskaya'
        }}].map(row => {
        return (
            {
                id: 111,
                login: row.author.login,
                lineVisible: {
                    report: (<strong>{row.reportTpl.path}</strong>),
                    dateReport: Moment(row.reportRequestDateTime).format('DD.MM.YYYY'),
                    office: `${row.unit.tb}${row.unit.osb && `/${row.unit.osb}`}${row.unit.vsp && `/${row.unit.vsp}`}`,
                    status: row.reportRequestStatus
                },
                lineHide: {
                    dateReportCreate: Moment(row.reportRequestDateTimeFormation).format('DD.MM.YYYY'),
                    dateStart: Moment(row.reportRequestDateTimeLaunch).format('DD.MM.YYYY'),
                    dateEnd: Moment(row.reportRequestDateTimeCompleteFormation).format('DD.MM.YYYY'),
                    author: (<nobr>{row.author.name}</nobr>),
                    dateRemove: row.scheduledDeletion && Moment(row.scheduledDeletion).format('DD.MM.YYYY'),
                }
            }
        )
    }), [])

    React.useEffect(() => {
        setRows2(createRows2().reverse())
    }, [createRows2])

    if (!rows.length) return (
        <div>
            <Typography variant={'h6'}>Пока нет доступных отчетов.</Typography>
            <Typography><Link to={`./report-create`}>Создать отчет</Link></Typography>
        </div>
    )

    if (!listReports.length) return (
        <div>
            <Typography variant={'h6'}>Нет отчетов, созданых вами.</Typography>
            <Typography>
                <Link
                    className={classes.button}
                    onClick={() => handleChangeSwitch(true)}>
                    Смотреть все отчеты группы</Link>
            </Typography>
        </div>
    )

    return (
        <>
            <Box className={classes.root}>
                <Typography>Только мои</Typography>
                <AntSwitch
                    checked={user.settings.viewAll}
                    onChange={e => handleChangeSwitch(e.target.checked)}
                    inputProps={{'aria-label': 'ant design'}}/>
                <Typography>Всей группы</Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Наименование отчета</TableCell>
                            <TableCell>Дата&nbsp;отчета</TableCell>
                            <TableCell>Подразделение</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listReports2.map((row, i) => (
                            <Row2 key={i} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<TableContainer>
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
            </TableContainer>*/}
        </>
    );
}
