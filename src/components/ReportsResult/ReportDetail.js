import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
// import axios from "axios";
import {report} from "../../data"

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
    const [data, setData] = React.useState(null)

    React.useEffect(() => {

        // const fetchData = async () => {
        //     const result = await axios('/report');
        //     return result.data
        // };
        //
        // fetchData()
        //     .then(res => setData(res))
        //     .catch(err => console.error(err));
        setData(report)

    }, []);

    return (
        <>
            {data && <div style={{height: 630, width: '100%'}}>
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
