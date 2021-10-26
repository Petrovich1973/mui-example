import React from "react"
import FormSelectStructure from "../FormSelectStructure"
import {FormReportSelect} from "../Demo/FormReportSelect";

export default function Step_01({onChangeForm}) {
    const isReportSelect = value => onChangeForm(value)
    return (
        <>
            {/*<FormReportSelect isReportSelect={isReportSelect}/>*/}
            <FormSelectStructure isReportSelect={isReportSelect}/>
        </>
    )
}
