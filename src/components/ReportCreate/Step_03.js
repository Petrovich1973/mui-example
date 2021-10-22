import React from "react"
import {FormControlLabel, FormLabel, RadioGroup, Grid, TextField, FormControl} from "@material-ui/core"
import StyledRadio from "../StyledRadio"
import * as PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import { useToasts } from 'react-toast-notifications'

import Moment from "moment"
Moment.locale('ru')

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
        backgroundColor: '#2385c114',
        borderRadius: 5,
        padding: theme.spacing(2.8)
    },
    row: {
        marginBottom: theme.spacing(2)
    }
}))

function Item(props) {
    return null
}

Item.propTypes = {children: PropTypes.node}

export default function Step_03({form, onChangeFormConfigure}) {
    const classes = useStyles()
    const { addToast } = useToasts()
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
                    value={Moment(form.reportRequestDateTime).format("YYYY-MM-DD")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(event) => {
                        onChangeFormConfigure({reportRequestDateTime: +Moment(event.target.value)})
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
                                    onChangeFormConfigure({durationStorage: newValue})
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
                                    onChangeFormConfigure({startCondition: newValue})
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
                    {form.startCondition === 'scheduled' && <Grid item xs={6}>
                        <Grid container spacing={2} className={classes.scheduled}>
                        <Grid item>
                            <Grid container>
                            <TextField
                                className={classes.dateField}
                                size="small"
                                id="startExecutionDateTime"
                                variant="outlined"
                                label="Дата первого запуска"
                                type="date"
                                value={Moment(form.startExecutionDateTime).format("YYYY-MM-DD")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(event) => {
                                    const contentToast = (
                                        <div>
                                            <h3>Дата ({Moment(event.target.value).format('DD.MM.yyyy')}) не выбрана!</h3>
                                            <p><strong>Дата первого запуска</strong> не может быть раньше чем <strong>дата отчета</strong>!</p>
                                            <p>Пожалуйста выберите другую дату</p>
                                        </div>
                                    )
                                    if(+Moment(event.target.value) > form.reportRequestDateTime)
                                        onChangeFormConfigure({startExecutionDateTime: +Moment(event.target.value)})
                                    else
                                        addToast(contentToast, {
                                            appearance: 'error',
                                            autoDismiss: true
                                        })
                                }}
                            />
                            </Grid>
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
                                        onChangeFormConfigure({repeatExecution: newValue})
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
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
    )
}
