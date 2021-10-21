import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import StyledRadio from "../StyledRadio";
import Moment from "moment";
import {osbList, vspList} from "../../data";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

Moment.locale('ru');

const optionsListExecution = [
    {value: 'now', label: 'Сейчас'},
    {value: 'schedule', label: 'По расписанию'},
]

const optionsListRepeat = [
    {value: 'disposable', label: 'Без повтора'},
    {value: 'daily', label: 'Каждое утро'},
    {value: 'week', label: 'Каждую неделю'},
    {value: 'monthly', label: 'Каждый месяц'},
]

const optionsListStorage = [
    {value: '1', label: 'Один день'},
    {value: '2', label: 'Два дня'},
    {value: '5', label: 'Пять дней'},
]

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(0),
        marginRight: theme.spacing(3)
    },
    radioGroupLabel: {
        fontSize: '80%',
        marginBottom: '0px'
    },
    radioLabel: {
        marginRight: theme.spacing(2),
        '& > *': {
            fontSize: '90%',
        }
    },
    dateField: {
        marginTop: theme.spacing(0.6),
        marginRight: theme.spacing(5)
    }
}));

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};

export default function Step_03({dataForm, onChangeDataForm}) {
    const classes = useStyles();
    if (true) return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    className={classes.dateField}
                    size="small"
                    id="dateReport"
                    variant="outlined"
                    label={dataForm.execution === 'schedule' ? "Дата первого запуска" : "Дата отчета"}
                    type="date"
                    // format="dd/MM/yyyy"
                    value={dataForm.date}
                    // defaultValue="2021-09-10"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        onChangeDataForm({date: event.target.value});
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.textField}>
                    <FormLabel
                        className={classes.radioGroupLabel}
                        component="legend">
                        Результат&nbsp;хранить
                    </FormLabel>
                    <RadioGroup
                        value={dataForm.execution}
                        aria-label="gender"
                        row
                        name="customized-radios"
                        onChange={(event, newValue) => {
                            if (newValue === 'schedule') {
                                onChangeDataForm({
                                    date: Moment().add(1, 'day').format('yyyy-MM-DD')
                                });
                            } else {
                                onChangeDataForm({date: Moment().format('yyyy-MM-DD')});
                            }
                            onChangeDataForm({execution: newValue});
                        }}>
                        {optionsListStorage.map((option, idx) => (
                            <FormControlLabel
                                className={classes.radioLabel}
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.textField}>
                    <FormLabel
                        className={classes.radioGroupLabel}
                        component="legend">
                        Условие&nbsp;запуска
                    </FormLabel>
                    <RadioGroup
                        value={dataForm.execution}
                        aria-label="gender"
                        row
                        name="customized-radios"
                        onChange={(event, newValue) => {
                            if (newValue === 'schedule') {
                                onChangeDataForm({
                                    date: Moment().add(1, 'day').format('yyyy-MM-DD')
                                });
                            } else {
                                onChangeDataForm({date: Moment().format('yyyy-MM-DD')});
                            }
                            onChangeDataForm({execution: newValue});
                        }}>
                        {optionsListExecution.map((option, idx) => (
                            <FormControlLabel
                                className={classes.radioLabel}
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                    </RadioGroup>
                </FormControl>
                <TextField
                    className={classes.dateField}
                    size="small"
                    id="dateReport"
                    variant="outlined"
                    label={dataForm.execution === 'schedule' ? "Дата первого запуска" : "Дата отчета"}
                    type="date"
                    // format="dd/MM/yyyy"
                    value={dataForm.date}
                    // defaultValue="2021-09-10"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        onChangeDataForm({date: event.target.value});
                    }}
                />
                <FormControl component="fieldset" className={classes.textField}>
                    <FormLabel
                        className={classes.radioGroupLabel}
                        component="legend">
                        Повторение
                    </FormLabel>
                    <RadioGroup
                        value={dataForm.execution}
                        aria-label="gender"
                        row
                        name="customized-radios"
                        onChange={(event, newValue) => {
                            if (newValue === 'schedule') {
                                onChangeDataForm({
                                    date: Moment().add(1, 'day').format('yyyy-MM-DD')
                                });
                            } else {
                                onChangeDataForm({date: Moment().format('yyyy-MM-DD')});
                            }
                            onChangeDataForm({execution: newValue});
                        }}>
                        {optionsListRepeat.map((option, idx) => (
                            <FormControlLabel
                                className={classes.radioLabel}
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
