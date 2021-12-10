import React from 'react'
import {ReportsList} from "../components/Demo/ReportsList"
import {useNormalizeReportList} from '../utils/normalizeReportList'
import markova from '../reportMarkova.json'
import Test from "./Test";

export default function Demo() {
    const {reportsTpl, reportsCount} = useNormalizeReportList()

    const filter = row => {
        return row['cod16_depohist.id_mega'].includes('33')
    }

    return (
        <div className="container">
            <Test/>
            <table cellPadding={10}>
                <thead>
                <tr>
                {Object.keys(markova.report[0]).map((key, i) => (
                    <th align="left" key={i}>{key}</th>
                ))}
                </tr>
                </thead>
                <tbody>
                {markova.report.filter(filter).map((el, i) => {
                    const keys = Object.keys(el)
                    return (
                        <tr key={i}>
                            {keys.map((key, idTd) => (
                                <td key={idTd}>
                                    {el[key] !== "NULL" ? el[key] : "---"}
                                </td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {/*<ReportsList list={reportsTpl} reportsCount={reportsCount}/>*/}
        </div>
    )
}
