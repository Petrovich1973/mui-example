import React from 'react'
import {NavLink, useParams} from "react-router-dom"
import {ContextApp} from "../../reducer.js"
import {makeStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from "@material-ui/core/Link"
import Step01 from "./Step_01"
import Step02 from "./Step_02"
import Step03 from "./Step_03"

import Moment from "moment"

Moment.locale('ru')

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    stepper: {
        backgroundColor: "transparent"
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(7),
        display: 'inline-block'
    },
    stepLabel: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            fill: '#ccc'
        },
        '& em': {
            opacity: '0.6',
            fontSize: '90%'
        },
        '& > *': {
            display: 'flex',
            alignItems: 'center',
            '& > *': {
                display: 'flex',
                alignItems: 'center',
            }
        }
    }
}))

const formTemplate = {
    reportTpl: {
        path: '',
        name: ''
    },
    unit: {
        tb: '',
        osb: '',
        vsp: '',
        path: ''
    },
    configure: {
        reportDateTime: +Moment().subtract(1, 'day'),
        durationStorage: '1', // 1 | 2 | 5
        startCondition: 'immediately', // immediately | scheduled
        startExecutionDateTime: +Moment().add(1, 'day'),
        repeatExecution: 'disposable'
    }
}

export default function Wizard() {
    const {state, dispatch} = React.useContext(ContextApp)
    const {name, login} = state.user
    let {group} = useParams()
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [form, setForm] = React.useState(formTemplate)
    const steps = getSteps()

    function getSteps() {
        return [
            activeStep !== 0 && form.reportTpl.name ? form.reportTpl.path : 'Выбор заказываемого отчета',
            activeStep !== 1 && form.unit.tb ? form.unit.path : 'Выбор подразделения',
            'Конфигурация отчета'
        ]
    }

    const onChangeForm = value => {
        setForm(form => ({...form, ...value}))
    }

    const onChangeFormConfigure = value => {
        setForm(form => ({...form, configure: {...form.configure, ...value}}))
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Step01 {...{onChangeForm, group}}/>
                )
            case 1:
                return (
                    <Step02 {...{onChangeForm}}/>
                )
            case 2:
                return (
                    <Step03 {...{form: form.configure, onChangeFormConfigure}}/>
                )
            default:
                return 'Unknown step'
        }
    }

    const createNameReport = (value) => {
        if(value) {
            if(value.NAME_REPORT) return value.NAME_REPORT
            return value.TITLE
        }
        return ''
    }

    const handleStart = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        const author = {
            name,
            login
        }

        const reportRequestDateTimeLaunch = form.configure.startCondition === 'scheduled' ? form.configure.startExecutionDateTime : +Moment()
        const newReport = {

            // Группа доступа
            reportGroup: 'Группа доступа',

            // Шаблон отчета
            reportTpl: {...form.reportTpl, fullName: form.reportTpl.path},

            // Дата и время создания заявки на формирование отчета
            reportRequestDateTimeFormation: +Moment(),

            // Дата заказываемого отчета
            reportDateTime: form.configure.reportDateTime,

            // Планируемые дата и время запуска формирования отчета
            reportRequestDateTimeLaunch,

            // Дата и время окончания формирования отчета (отчет готов к использованию)
            reportRequestDateTimeCompleteFormation: null,

            // ТБ/ОСБ/ВСП
            unit: form.unit,

            // Автор
            author,

            // Запланированные дата и время удаления сформированного отчета
            scheduledDeletion: +Moment(reportRequestDateTimeLaunch).add(+form.configure.durationStorage, 'day'),

            // Расписание
            schedule: form.configure.startCondition,

            // Повторение, если выбрано расписание
            repeatExecution: form.configure.repeatExecution,

            // Статус формирования отчета witting | processing | complete | error
            reportRequestStatus: 'waiting',
        }
        dispatch({
            type: 'updateState',
            payload: {
                reportsDoneList: [
                    ...state.reportsDoneList,
                    {
                        id: Date.now(),
                        ...newReport
                    }
                ]
            }
        })
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setForm(formTemplate)
    }

    const isDisabledNext = !Boolean(form.reportTpl.name) || (activeStep === 1 && !Boolean(form.unit.tb))
    // console.log(form)
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel><span className={classes.stepLabel}>{label}</span></StepLabel>
                        <StepContent>
                            <div>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 ? <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleStart}
                                        className={classes.button}
                                    >Запуск создания отчета</Button> : <Button
                                        disabled={isDisabledNext}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >Next</Button>}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Отлично! Запрос на создание отчета создан и отправлен на обработку</Typography>
                    <Typography>Формирование отчета займет некоторое время.</Typography>
                    <Typography>
                        Данный отчет помещен в список доступных отчетов.
                        <Link component={NavLink} to={`/groups/${group}/reports`}>Смотреть</Link>
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Создать новый отчет
                    </Button>
                </Paper>
            )}
        </div>
    )
}
