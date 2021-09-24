import React from 'react';
import {ContextApp} from "../reducer";
import {useHistory, useParams} from "react-router-dom";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";

const columns = [
    {
        field: 'idMega',
        headerName: 'idMega',
        width: 130
    },
    {
        field: 'branchno',
        headerName: 'branchno',
        width: 140
    },
    {
        field: 'idMinor',
        headerName: 'idMinor',
        width: 130
    },
    {
        field: 'idMajor',
        headerName: 'idMajor',
        width: 130
    },
    {
        field: 'printableno',
        headerName: 'printableno',
        width: 190
    },
    {
        field: 'openday',
        headerName: 'openDay',
        width: 140
    },
    {
        field: 'expirationday',
        headerName: 'expirationDay',
        width: 170
    },
    {
        field: 'balance',
        headerName: 'balance',
        width: 130
    },
];

export default function ReportDetail() {
    let {user, report} = useParams();
    const {state, dispatch} = React.useContext(ContextApp);
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/report',
            );

            setData(result.data);
        };
        fetchData();
    }, []);

    const setBr = React.useCallback(() => {
        dispatch({
            type: 'updateListReports',
            payload: {br: {...state.br, brReport: report}}
        })
    }, [])

    React.useEffect(() => {
        setBr()
    }, [])

    return (
        <>
            <div/>
            {data && <div style={{ height: 630, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 40]}
                />
            </div>}
        </>
    )
}