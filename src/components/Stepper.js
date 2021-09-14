import React from 'react';
import {NavLink, useParams} from "react-router-dom"
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
import {reportGroups, reportsList} from "../data"
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
        maxWidth: 300,
    },
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

function getSteps() {
    return ['Выбор группы отчетности', 'Выбор отчета', 'Конфигурация отчета'];
}

const defaultDataForm = {
    reportGroups: null,
    reportsList: null,
    date: "2021-09-10",
    method: 'tb',
    schedule: 'now',
    gosb: 'Выбрать ГОСБ',
    range: 'daily'
}

const optionsListMethod = [
    {value: 'tb', label: 'Целиком по ТБ'},
    {value: 'gosb', label: 'По ГОСБ'},
]

const optionsListSchedule = [
    {value: 'now', label: 'Сейчас'},
    {value: 'night', label: 'Ночной пакет'},
    {value: 'schedule', label: 'По расписанию'},
]

const optionsListRepeat = [
    {value: 'daily', label: 'Ежедневный ночной запуск'},
    {value: 'monthly', label: 'Ежемесячный ночной запуск'},
]

const optionsListGOSB = ['ОПЕРУ ЦА', 'КРАСНОПРЕСНЕНСКОЕ ОСБ 1569', 'КИЕВСКОЕ ОСЬ 5276']

export default function VerticalLinearStepper() {
    let {user} = useParams();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataForm, setDataForm] = React.useState(defaultDataForm);
    const steps = getSteps();

    const onChangeDataForm = value => {
        setDataForm(dataForm => ({...dataForm, ...value}))
    }
    console.log(dataForm)

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
                            handleNext()
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
                            handleNext()
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </span>;
            case 2:
                return <div style={{marginBottom: 20}}>
                    <div>На третем шаге заполняется форма настроки запроса формирования отчета</div>
                    <div style={{display: "flex"}}>
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel component="legend">Сбособ</FormLabel>
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
                        {dataForm.method === 'gosb' && <Autocomplete
                            id="gosn"
                            size={"medium"}
                            options={optionsListGOSB}
                            getOptionLabel={(option) => option}
                            className={classes.textField}
                            style={{width: 250}}
                            value={dataForm.gosb}
                            onChange={(event, newValue) => {
                                onChangeDataForm({gosb: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined"/>}
                        />}
                        <FormControl component="fieldset" className={classes.textField}>
                            <FormLabel component="legend">Расписание запуска</FormLabel>
                            <RadioGroup value={dataForm.schedule} aria-label="gender" name="customized-radios"
                                        onChange={(event, newValue) => {
                                            onChangeDataForm({schedule: newValue});
                                        }}>
                                {optionsListSchedule.map((option, idx) => <FormControlLabel
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
                        <div>
                            {dataForm.schedule === 'schedule' ?
                            <FormControl component="fieldset" className={classes.textField}>
                                <FormLabel component="legend">Период запуска</FormLabel>
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
                            </FormControl> :
                                <TextField
                                fullWidth
                                id="date"
                                variant="outlined"
                                label="Дата отчета"
                                type="date"
                                format="dd/MM/yyyy"
                                defaultValue={dataForm.date}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                            }}
                                onChange={(event) => {
                                onChangeDataForm({date: event.target.value});
                            }}
                                />}
                        </div>
                    </div>
                </div>;
            default:
                return 'Unknown step';
        }
    }

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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Запуск создания отчета' : 'Next'}
                                    </Button>
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
                        <Link component={NavLink} to={`/users/${user}/reports-done`}>Смотреть</Link>
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Создать новый отчет
                    </Button>
                </Paper>
            )}
        </div>
    );
}
