import React from "react"
import FormSelectUnit from "../FormSelectUnit"

export default function Step_02({onChangeForm}) {
    const isUnitSelect = value => onChangeForm(value)
    return (
        <FormSelectUnit isUnitSelect={isUnitSelect}/>
    )
}
