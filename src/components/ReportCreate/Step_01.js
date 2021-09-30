import Autocomplete from "@material-ui/lab/Autocomplete";
import {reportGroups as options} from "../../data";
import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Step_01({dataForm, onChangeDataForm, handleNext}) {
    return (
        <span>
            <span>На первом шаге предлагается выбрать группу отчетности</span>
            <Autocomplete
                id="reportGroups"
                size={"medium"}
                options={options}
                getOptionLabel={(option) => option}
                style={{width: 400}}
                value={dataForm.reportGroups}
                onChange={(event, newValue) => {
                    onChangeDataForm({reportGroups: newValue});
                    if (newValue) handleNext()
                }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined"/>
                )}
            />
        </span>
    )
}