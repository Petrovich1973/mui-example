import React from 'react'
import {ContextApp} from "../reducer.js";
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useHistory } from "react-router-dom"
import {groupList} from "../data"

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

const rows = groupList.map(el => createData(el)).reduce((sum, current) => {
    if((!sum.some(f => f.group === current.group))) sum.push(current)
    return sum
}, [])

export default function GroupList() {
    const {dispatch} = React.useContext(ContextApp);
    const classes = useStyles();
    let history = useHistory();

    const onClickRow = row => {
        dispatch({
            type: 'updateAccessGroup',
            payload: row
        })
        history.push(`/groups/${row.group}`);
    }

    return (
        <TableContainer>
            <Table className={classes.table} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Группа</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Должность</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow className={classes.row} key={index} hover onClick={() => onClickRow(row)}>
                            <TableCell>{row.group}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.position}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
