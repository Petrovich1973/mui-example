import React from 'react'
import axios from "axios";
import ReportRow from "./ReportRow";
import {useHistory, useRouteMatch} from "react-router-dom";

const urlApi = 'http://localhost:3001/report'

export default function Report() {
    const [report, setReport] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const [first = {}, ...all] = report
    const headers = Object.keys(first)

    let history = useHistory();
    let {path, url, params} = useRouteMatch();

    const handleDownloadButton = r => history.push(`${url}/${r}`);

    React.useEffect(() => {
        setLoading(true)
        axios.get(urlApi)
            .then(res => setReport(res.data))
            .catch(err => alert(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading)
        return (
            <div>Waiting...</div>
        )

    return (
        <div style={{height: '100%', overflow: 'auto'}}>
            <table className="table">
                <thead>
                <tr>
                    {headers.map((th, i) => <th key={i}>{th}</th>)}
                </tr>
                </thead>
                <tbody>
                {report.map((tr, i) => <ReportRow row={tr} key={i}/>)}
                </tbody>
            </table>
        </div>
    )
}
