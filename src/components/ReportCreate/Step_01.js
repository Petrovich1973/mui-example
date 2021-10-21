import React from "react";
import FormSelectStructure from "../FormSelectStructure";

export default function Step_01({onChangeFormStep}) {
    const isReportSelect = value => onChangeFormStep(value)
    return (
        <FormSelectStructure isReportSelect={isReportSelect}/>
    )
}
