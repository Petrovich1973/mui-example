import React from 'react';
import {NavLink, useParams} from "react-router-dom"
import {ContextApp} from "../reducer.js";
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import {reportGroups, reportsList, gosbList, vspList} from "../data"
import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

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
        width: 250,
    },
    radioLabel: {
        whiteSpace: "nowrap",
        marginBottom: '10px'
    }
}));

const useStylesRadioGroup = makeStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));

function StyledRadio(props) {
    const classesRadioGroup = useStylesRadioGroup();

    return (
        <Radio
            className={classesRadioGroup.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classesRadioGroup.icon, classesRadioGroup.checkedIcon)}/>}
            icon={<span className={classesRadioGroup.icon}/>}
            {...props}
        />
    );
}

const defaultDataForm = {
    reportGroups: null,
    reportsList: null,
    date: "2021-09-10",
    method: 'tb',
    execution: 'now',
    gosb: null,
    vsp: null,
    range: 'daily',
    durationStorage: '1',
    status: 'waiting'
}

const optionsListStorage = [
    {value: '1', label: '1 день'},
    {value: '2', label: '2 дня'},
    {value: '5', label: '5 дней'},
]

const optionsListExecution = [
    {value: 'now', label: 'Сейчас'},
    {value: 'night', label: 'Ночной пакет'},
    {value: 'schedule', label: 'По расписанию'},
]

const optionsListRepeat = [
    {value: 'daily', label: 'Ежедневный ночной запуск'},
    {value: 'monthly', label: 'Ежемесячный ночной запуск'},
]

export default function VerticalLinearStepper() {
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
                return <span>На первом шаге предлагается выбрать группу отчетности
                    <Autocomplete
                        id="reportGroups"
                        size={"medium"}
                        options={reportGroups}
                        getOptionLabel={(option) => option}
                        style={{width: 400}}
                        value={dataForm.reportGroups}
                        onChange={(event, newValue) => {
                            onChangeDataForm({reportGroups: newValue});
                            if (newValue) handleNext()
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </span>;
            case 1:
                return <span>На втором шаге выбирается отчет из списка выбранной группы
                    <Autocomplete
                        id="reportsList"
                        size={"medium"}
                        options={reportsList}
                        getOptionLabel={(option) => option}
                        style={{width: 400}}
                        value={dataForm.reportsList}
                        onChange={(event, newValue) => {
                            onChangeDataForm({reportsList: newValue});
                            if (newValue) handleNext()
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </span>;
            case 2:
                return <div style={{marginBottom: 20}}>
                    <div>На третем шаге заполняется форма настроки запроса формирования отчета</div>
                    <div style={{display: "flex"}}>
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel className={classes.radioLabel} component="legend">Структурная единица</FormLabel>
                            <RadioGroup value={dataForm.method} aria-label="gender" name="customized-radios"
                                        onChange={(event, newValue) => {
                                            onChangeDataForm({method: newValue});
                                        }}>
                                {optionsListMethod.map((option, idx) => <FormControlLabel
                                    key={idx}
                                    value={option.value}
                                    control={<StyledRadio/>}
                                    label={option.label}/>)}
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<StyledRadio/>}
                                    label="По группам ГОСБ"
                                />
                            </RadioGroup>
                        </FormControl>
                        {dataForm.method === 'gosb' && <div className={classes.textField} style={{marginTop: '23px'}}>
                            <Autocomplete
                                openOnFocus
                                id="gosb"
                                size={"medium"}
                                options={gosbList.map(([value, label]) => (`${label}`))}
                                getOptionLabel={(option) => option}
                                style={{width: 250}}
                                value={dataForm.gosb}
                                onChange={(event, newValue) => {
                                    onChangeDataForm({gosb: newValue});
                                }}
                                renderInput={(params) => <TextField autoFocus
                                                                    label="ГОСБ" {...params}
                                                                    variant="outlined"/>}
                            />
                            {dataForm.gosb && <Autocomplete
                                id="vsp"
                                size={"medium"}
                                options={vspList.map(([label]) => (`${label}`))}
                                getOptionLabel={(option) => option}
                                className={classes.textField}
                                style={{width: 250, marginTop: '23px'}}
                                value={dataForm.vsp}
                                onChange={(event, newValue) => {
                                    onChangeDataForm({vsp: newValue});
                                }}
                                renderInput={(params) => <TextField autoFocus
                                                                    label="ВСП" {...params}
                                                                    variant="outlined"/>}
                            />}
                        </div>}
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel className={classes.radioLabel}
                                       component="legend">Условие&nbsp;запуска</FormLabel>
                            <RadioGroup value={dataForm.execution} aria-label="gender" name="customized-radios"
                                        onChange={(event, newValue) => {
                                            onChangeDataForm({execution: newValue});
                                        }}>
                                {optionsListExecution.map((option, idx) => <FormControlLabel
                                    key={idx}
                                    value={option.value}
                                    control={<StyledRadio/>}
                                    label={option.label}/>)}
                                <FormControlLabel
                                    value="disabled"
                                    disabled
                                    control={<StyledRadio/>}
                                    label="По дате и времени"
                                />
                            </RadioGroup>
                        </FormControl>

                        <div className={classes.textField} style={{marginTop: '23px'}}>
                            <TextField
                                fullWidth
                                id="date"
                                variant="outlined"
                                label={dataForm.execution === 'schedule' ? "Дата первого запуска" : "Дата отчета"}
                                type="date"
                                format="dd/MM/yyyy"
                                defaultValue={dataForm.date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    onChangeDataForm({date: event.target.value});
                                }}
                            />
                            {dataForm.execution === 'schedule' &&
                            <>
                                <div style={{height: '30px'}}/>
                                <FormControl component="fieldset">
                                    <FormLabel className={classes.radioLabel} component="legend">Повтор
                                        запуска</FormLabel>
                                    <RadioGroup value={dataForm.range} aria-label="gender" name="customized-radios"
                                                onChange={(event, newValue) => {
                                                    onChangeDataForm({range: newValue});
                                                }}>
                                        {optionsListRepeat.map((option, idx) => <FormControlLabel
                                            key={idx}
                                            value={option.value}
                                            control={<StyledRadio/>}
                                            label={option.label}/>)}
                                    </RadioGroup>
                                </FormControl>
                            </>
                            }
                        </div>
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel className={classes.radioLabel} component="legend">
                                Хранение</FormLabel>
                            <RadioGroup value={dataForm.durationStorage} aria-label="gender"
                                        name="customized-radios"
                                        onChange={(event, newValue) => {
                                            onChangeDataForm({durationStorage: newValue});
                                        }}>
                                {optionsListStorage.map((option, idx) => <FormControlLabel
                                    key={idx}
                                    value={option.value}
                                    control={<StyledRadio/>}
                                    label={option.label}/>)}
                            </RadioGroup>
                        </FormControl>

                    </div>
                </div>;
            default:
                return 'Unknown step';
        }
    }

    const handleStart = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch({
            type: 'updateState',
            payload: {
                reportsDoneList: [...state.reportsDoneList, {id: Date.now(), ...dataForm}]
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
                        <Link component={NavLink} to={`/users/${user}/reports`}>Смотреть</Link>
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Создать новый отчет
                    </Button>
                </Paper>
            )}
        </div>
    );
}
