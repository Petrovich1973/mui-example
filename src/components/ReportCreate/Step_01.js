import React from "react"
import FormSelectStructure from "../FormSelectStructure"
import {FormReportSelect} from "../Demo/FormReportSelect";

export default function Step_01({onChangeForm, group}) {
    const isReportSelect = value => onChangeForm(value)
    return (
        <>
            <FormReportSelect isReportSelect={isReportSelect} group={group}/>
            {/*<FormSelectStructure isReportSelect={isReportSelect}/>*/}
        </>
    )
}
