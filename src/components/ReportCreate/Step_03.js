import React from "react"
import {FormControlLabel, FormLabel, RadioGroup, Grid, TextField, FormControl, Collapse} from "@material-ui/core"
import StyledRadio from "../StyledRadio"
import * as PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import {useToasts} from 'react-toast-notifications'

import Moment from "moment"

Moment.locale('ru')

const optionsListExecution = [
    {value: 'immediately', label: 'Сейчас'},
    {value: 'scheduled', label: 'По расписанию'},
]

const optionsListRepeat = [
    {value: 'disposable', label: 'Без повтора', message: ''},
    {value: '0 0 8/24 ? * * *', label: 'Каждое утро', message: 'Итерационный запуск сдвигает дату отчета на один день'},
    {
        value: '0 0 1 * * MON',
        label: 'Каждую неделю',
        message: 'Итерационный запуск сдвигает дату отчета на одну неделю'
    },
    {value: '0 0 * ? * * *', label: 'Каждый месяц', message: 'Итерационный запуск сдвигает дату отчета на один месяц'},
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
    },
    firstStartBlock: {
        display: 'flex',
        flexWrap: 'nowrap',
        '& > *:first-child': {
            flexShrink: 0
        },
        '& > *:last-child': {
            color: '#2385c1'
        }
    }
}))

function Item(props) {
    return null
}

Item.propTypes = {children: PropTypes.node}

export default function Step_03({form, onChangeFormConfigure}) {
    const classes = useStyles()
    const {addToast} = useToasts()
    const [collapse, setCollapse] = React.useState(false)
    React.useEffect(() => {
        if(form.startCondition === 'scheduled') setCollapse(true)
        else setCollapse(false)
    }, [form.startCondition])
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} className={classes.row}>
                <TextField
                    className={classes.dateField}
                    size="small"
                    id="reportDateTime"
                    variant="outlined"
                    label="Дата отчета"
                    type="date"
                    value={Moment(form.reportDateTime).format("YYYY-MM-DD")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(event) => {
                        if (+Moment(event.target.value) >= form.startExecutionDateTime) {
                            onChangeFormConfigure({
                                reportDateTime: +Moment(event.target.value),
                                startExecutionDateTime: +Moment(event.target.value).add(1, 'day')
                            })
                            if (form.startCondition === 'scheduled') {
                                const contentToast = (
                                    <div>
                                        <h3>Внимание!</h3>
                                        <p><strong>Дата первого запуска</strong> изменена.</p>
                                        <p>Новое
                                            значение <strong>{Moment(event.target.value).add(1, 'day').format('DD.MM.yyyy')}</strong>
                                        </p>
                                    </div>
                                )
                                addToast(contentToast, {
                                    appearance: 'warning',
                                    autoDismiss: true
                                })
                            }
                        } else
                            onChangeFormConfigure({
                                reportDateTime: +Moment(event.target.value)
                            })
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
                                    if (newValue === 'immediately') console.log('Надо сбрасывать повторение и дата первого запуска!')
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
                        <Collapse in={collapse}><Grid container spacing={2} className={classes.scheduled}>
                            <Grid item>
                                <Grid container className={classes.firstStartBlock}>
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
                                                    <h3>Дата ({Moment(event.target.value).format('DD.MM.yyyy')}) не
                                                        выбрана!</h3>
                                                    <p><strong>Дата первого запуска</strong> не может быть установлена раньше
                                                        чем выбранная <strong>дата отчета</strong>!</p>
                                                    <p>Пожалуйста выберите другую дату первого запуска или измените дату
                                                        отчета</p>
                                                </div>
                                            )
                                            if (+Moment(event.target.value) > form.reportDateTime)
                                                onChangeFormConfigure({startExecutionDateTime: +Moment(event.target.value)})
                                            else
                                                addToast(contentToast, {
                                                    appearance: 'error',
                                                    autoDismiss: true
                                                })
                                        }}
                                    />
                                    <span>{optionsListRepeat.find(f => form.repeatExecution === f.value).message}</span>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <FormControl component="fieldset" className={classes.textField}
                                             style={{marginRight: 0}}>
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
                        </Grid></Collapse>
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
    )
}
