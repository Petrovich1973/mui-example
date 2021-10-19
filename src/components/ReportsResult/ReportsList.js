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
    Box
} from '@material-ui/core';
import {styled, makeStyles} from '@material-ui/core/styles'
// import delay from "../../utils/delay";
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
    const {user, reportRequest} = state;
    const [rows2, setRows2] = React.useState([])

    const exampleList = React.useCallback(() => ([
        {
            ...reportRequest,
            reportTpl: {
                path: 'Меню  для расчета показателей краткосрочной ликвидности ф. 7-136 , 7-151/Расчет показателей краткосрочной ликвидности ф. 7-136, 7-151 (сборщик данных)',
                name: 'Расчет показателей краткосрочной ликвидности ф. 7-136, 7-151 (сборщик данных)'
            },
            reportRequestDateTimeFormation: 1632530870740,
            reportRequestStatus: 'complete'
        },
        {
            ...reportRequest,
            reportRequestDateTimeFormation: 1633540872750,
            reportRequestStatus: 'complete'
        },
        {
            ...reportRequest,
            reportRequestDateTimeFormation: 1634550874752,
            reportTpl: {
                path: 'ОТЧЕТЫ ПОЛЬЗОВАТЕЛЯ по данным интегратора экономических форм/Ф. 1-35 Распределение средств физ. лиц по размеру вклада в разрезе субъектов РФ',
                name: 'Ф. 1-35 Распределение средств физ. лиц по размеру вклада в разрезе субъектов РФ'
            },
            author: {
                name: 'Билецкая С.С.',
                login: 'SSBiletskaya'
            }
        }
    ]), [reportRequest])

    const filter2 = ({login}) => {
        if (!user.settings.viewAll) return user.login === login
        return true
    }

    const listReports2 = rows2.filter(filter2)

    const handleChangeSwitch = value => {
        dispatch({
            type: 'updateSettings',
            payload: {
                viewAll: value
            }
        })
    }

    const createRows2 = React.useCallback((list) => list.map(row => {
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

    // Эмуляция изменения статуса готовности отчета
    // const validateStatus2 = React.useCallback(() => {
    //
    //     if (exampleList().some(el => el.reportRequestStatus === 'witting')) delay(7000).then(() => {
    //         setRows2(createRows2(exampleList().map(el => ({
    //             ...el,
    //             reportRequestStatus: 'complete'
    //         }))).reverse())
    //     })
    //
    // }, [exampleList, createRows2])

    const sort = (a, b) => a.reportRequestDateTimeFormation - b.reportRequestDateTimeFormation

    React.useEffect(() => {
        setRows2(createRows2(exampleList().sort(sort)))
        // validateStatus2()
    }, [createRows2, exampleList, /*validateStatus2*/])

    if (!rows2.length) return (
        <div>
            <Typography variant={'h6'}>Пока нет доступных отчетов.</Typography>
            <Typography><Link to={`./report-create`}>Создать отчет</Link></Typography>
        </div>
    )

    if (!listReports2.length) return (
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
                <Typography>Мои отчеты</Typography>
                <AntSwitch
                    checked={user.settings.viewAll}
                    onChange={e => handleChangeSwitch(e.target.checked)}
                    inputProps={{'aria-label': 'ant design'}}/>
                <Typography>Отчеты группы</Typography>
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
        </>
    );
}
