import React from 'react';
import {NavLink, useParams} from "react-router-dom"
import {ContextApp} from "../../reducer.js";
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import Moment from "moment";
import Step01 from "./Step_01";
import Step02 from "./Step_02";
import Step03 from "./Step_03";

Moment.locale('ru');

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
    },
    textField: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(3),
        width: 250
    },
    radioLabel: {
        whiteSpace: "nowrap",
        marginBottom: '10px'
    }
}));

const defaultDataForm = {
    reportGroups: null,
    reportsList: null,
    date: Moment().format('yyyy-MM-DD'),
    dateCreate: Moment().format('yyyy-MM-DD'),
    dateTimeStart: null,
    method: 'tb',
    execution: 'now',
    gosb: null,
    vsp: null,
    range: 'disposable',
    durationStorage: '1',
    status: 'waiting'
}

// const reportGenerationRequest = {
//
//     // Группа отчета
//     reportGroup: 1,
//     // Шаблон отчета
//     reportTpl: 2,
//     // Дата и время создания заявки на формирование отчета
//     reportRequestDateTimeFormation: '',
//     // Дата заказываемого отчета
//     reportRequestDateTime: '',
//     // Планируемые дата и время запуска формирования отчета
//     reportRequestDateTimeLaunch: '',
//     // Дата и время окончания формирования отчета (отчет готов к использованию)
//     reportRequestDateTimeCompleteFormation: '',
//     // ТБ/ОСБ/ВСП
//     actualOffice: '',
//     // Условие запуска
//     startCondition: '',
//     // Запланированные дата и время удаления сформированного отчета
//     scheduledDeletion: '',
//     // Расписание
//     schedule: '',
//     // Статус формирования отчета
//     reportRequestStatus: ''
//
// }

export default function Wizard() {
    const {state, dispatch} = React.useContext(ContextApp);
    let {user} = useParams();
    const {tb = ''} = state.user
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataForm, setDataForm] = React.useState(defaultDataForm);
    const steps = getSteps();

    const optionsListMethod = [
        {value: 'tb', label: `${tb} ТБ`},
        {value: 'gosb', label: 'ГОСБ'},
    ]

    function getSteps() {
        return [
            activeStep !== 0 && dataForm.reportGroups ? dataForm.reportGroups : 'Выбор группы отчетности',
            activeStep !== 1 && dataForm.reportsList ? dataForm.reportsList : 'Выбор отчета',
            'Конфигурация отчета'
        ];
    }

    const onChangeDataForm = value => {
        setDataForm(dataForm => ({...dataForm, ...value}))
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <Step01 {...{dataForm, onChangeDataForm, handleNext}}/>
                );
            case 1:
                return (
                    <Step02 {...{dataForm, onChangeDataForm, handleNext}}/>
                );
            case 2:
                return (
                    <Step03 {...{classes, dataForm, onChangeDataForm, optionsListMethod}}/>
                );
            default:
                return 'Unknown step';
        }
    }

    const handleStart = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch({
            type: 'updateState',
            payload: {
                reportsDoneList: [
                    ...state.reportsDoneList,
                    {
                        id: Date.now(),
                        ...dataForm,
                        dateCreate: Moment().format('DD.MM.YYYY')
                    }
                ]
            }
        })
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setDataForm(defaultDataForm)
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
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
                    <Typography>Запрос создания отчета создан и отправлен на обработку</Typography>
                    <Typography>Формирование отчета займет некоторое время. Статус <strong>Ожидает
                        обработку</strong></Typography>
                    <Typography>
                        Данный отчет помещен в список доступных отчетов.
                        <Link component={NavLink} to={`/groups/${user}/reports`}>Смотреть</Link>
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Создать новый отчет
                    </Button>
                </Paper>
            )}
        </div>
    );
}
