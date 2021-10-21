import React from "react"
import FormSelectStructure from "../FormSelectStructure"

export default function Step_01({onChangeForm}) {
    const isReportSelect = value => onChangeForm(value)
    return (
        <FormSelectStructure isReportSelect={isReportSelect}/>
    )
}
