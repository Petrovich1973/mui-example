import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, FormLabel, RadioGroup} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import StyledRadio from "../StyledRadio";
import Moment from "moment";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

Moment.locale('ru');

const optionsListExecution = [
    {value: 'immediately', label: 'Сейчас'},
    {value: 'scheduled', label: 'По расписанию'},
]

const optionsListRepeat = [
    {value: 'disposable', label: 'Без повтора'},
    {value: '0 0 8/24 ? * * *', label: 'Каждое утро'},
    {value: '0 0 1 * * MON', label: 'Каждую неделю'},
    {value: '0 0 * ? * * *', label: 'Каждый месяц'},
]

const optionsListStorage = [
    {value: '1', label: 'Один день'},
    {value: '2', label: 'Два дня'},
    {value: '5', label: 'Пять дней'},
]

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.6),
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(0),
        marginRight: theme.spacing(3)
    },
    radioGroupLabel: {
        fontSize: '84%',
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
    },
    scheduled: {
        border: '1px solid #ccc',
        borderRadius: 5
    },
    row: {
        marginBottom: theme.spacing(2)
    }
}));

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};

export default function Step_03({form, onChangeFormConfigure}) {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} className={classes.row}>
                <TextField
                    className={classes.dateField}
                    size="small"
                    id="reportRequestDateTime"
                    variant="outlined"
                    label="Дата отчета"
                    type="date"
                    // format="dd/MM/yyyy"
                    value={form.reportRequestDateTime}
                    // defaultValue="2021-09-10"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        onChangeFormConfigure({reportRequestDateTime: event.target.value});
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs="auto" className={classes.row}>
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel
                                className={classes.radioGroupLabel}
                                component="legend">
                                Результат&nbsp;хранить
                            </FormLabel>
                            <RadioGroup
                                value={form.durationStorage}
                                aria-label="durationStorage"
                                row
                                name="durationStorage"
                                onChange={(event, newValue) => {
                                    onChangeFormConfigure({durationStorage: newValue});
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
                                value={form.startCondition}
                                aria-label="ListExecution"
                                row
                                name="startCondition"
                                onChange={(event, newValue) => {
                                    if(newValue === 'immediately') console.log('Надо сбрасывать повторение и дата первого запуска!')
                                    onChangeFormConfigure({startCondition: newValue});
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
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} className={classes.scheduled}>
                        <Grid item>
                            <TextField
                                className={classes.dateField}
                                size="small"
                                id="startExecutionDateTime"
                                variant="outlined"
                                label="Дата первого запуска"
                                type="date"
                                // format="dd/MM/yyyy"
                                value={form.startExecutionDateTime}
                                // defaultValue="2021-09-10"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    onChangeFormConfigure({startExecutionDateTime: event.target.value});
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset" className={classes.textField} style={{marginRight: 0}}>
                                <FormLabel
                                    className={classes.radioGroupLabel}
                                    component="legend">
                                    Повторение
                                </FormLabel>
                                <RadioGroup
                                    value={form.repeatExecution}
                                    aria-label="ListRepeat"
                                    row
                                    name="repeatExecution"
                                    onChange={(event, newValue) => {
                                        onChangeFormConfigure({repeatExecution: newValue});
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
