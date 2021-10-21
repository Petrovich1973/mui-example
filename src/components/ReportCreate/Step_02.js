import React from "react";
import FormSelectUnit from "../FormSelectUnit";

export default function Step_02({onChangeFormStep}) {
    const isUnitSelect = value => onChangeFormStep(value)
    return (
        <FormSelectUnit isUnitSelect={isUnitSelect}/>
    )
}