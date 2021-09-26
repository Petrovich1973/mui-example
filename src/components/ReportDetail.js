import React from 'react';
import {ContextApp} from "../reducer";
import {useParams} from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import {Button} from "@material-ui/core";

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
        width: 190
    },
    {
        field: 'expirationday',
        headerName: 'expirationDay',
        width: 190
    },
    {
        field: 'balance',
        headerName: 'balance',
        width: 130
    },
];

export default function ReportDetail() {
    let {report} = useParams();
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
            type: 'updateState',
            payload: {br: {...state.br, brReport: report}}
        })
    }, [state, dispatch, report])

    React.useEffect(() => {
        setBr()
    }, [data])

    return (
        <>
            <Button onClick={setBr}>Add params</Button>
            <div/>
            {data && <div style={{ height: 630, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>}
        </>
    )
}
