import Autocomplete from "@material-ui/lab/Autocomplete";
import {reportsList as options} from "../../data";
import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Step_02({dataForm, onChangeDataForm, handleNext}) {
    return (
        <span>
                        <span>На втором шаге выбирается отчет из списка выбранной группы</span>
                        <Autocomplete
                            id="reportsList"
                            size={"medium"}
                            options={options}
                            getOptionLabel={(option) => option}
                            style={{width: 400}}
                            value={dataForm.reportsList}
                            onChange={(event, newValue) => {
                                onChangeDataForm({reportsList: newValue});
                                if (newValue) handleNext()
                            }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"/>
                            )}
                        />
                    </span>
    )
}