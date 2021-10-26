import React from 'react'
import {ReportsList} from "../components/Demo/ReportsList"
import {useNormalizeReportList} from '../utils/normalizeReportList'

export default function Demo() {
    const {reportsTpl, reportsCount} = useNormalizeReportList()

    return (
        <div className="container">
            <ReportsList list={reportsTpl} reportsCount={reportsCount}/>
        </div>
    )
}
