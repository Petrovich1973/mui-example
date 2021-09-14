import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useHistory } from "react-router-dom"
import {usersList} from "../data"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    row: {
        cursor: "pointer"
    }
});

function createData([name, group, lastName, position, osb, tb]) {
    return {name, group, lastName, position, osb, tb};
}

const rows = usersList.map(el => createData(el))

export default function UserList() {
    const classes = useStyles();
    let history = useHistory();

    const onClickRow = user => history.push(`/users/${user}`);

    return (
        <TableContainer>
            <Table className={classes.table} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Пользователь</TableCell>
                        <TableCell>Группа</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Должность</TableCell>
                        <TableCell align="right">ОСБ</TableCell>
                        <TableCell align="right">ТБ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow className={classes.row} key={index} hover onClick={() => onClickRow(row.name)}>
                            <TableCell component="td" scope="row">{row.name}</TableCell>
                            <TableCell>{row.group}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.position}</TableCell>
                            <TableCell align="right">{row.osb}</TableCell>
                            <TableCell align="right">{row.tb}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
