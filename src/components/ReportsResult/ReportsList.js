import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';
import {ContextApp} from "../../reducer.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core';
import delay from "../../utils/delay";
import Row from "./Row";

export default function ReportsList() {
    const {state, dispatch} = React.useContext(ContextApp);
    Moment.locale('ru');
    const {reportsDoneList = [], user} = state;

    const [rows, setRows] = React.useState([])

    const createData = React.useCallback((id, name, calories, fat, carbs, protein, status, dateCreate, dateTimeStart) => {
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
                    customerId: user.name,
                    protein
                },
            ],
        };
    }, [user])

    const createRows = React.useCallback(() => reportsDoneList.map(row => createData(
        row.id,
        row.reportGroups,
        row.reportsList,
        Moment(row.date).format('DD.MM.YYYY'),
        `${user && user.tb}ТБ ${row.gosb ? `/ ${row.gosb}` : ''} ${row.gosb && row.vsp ? `/ ${row.vsp}` : ''}`,
        row.durationStorage,
        row.status,
        row.dateCreate,
        row.dateTimeStart)
    ), [user, reportsDoneList, createData])

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

    React.useEffect(() => {
        setRows(createRows())
        validateStatus()
    }, [createRows, validateStatus])

    if (!rows.length) return (
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
                        <TableCell/>
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
