import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {gosbList, vspList} from "../../data";
import TextField from "@material-ui/core/TextField";
import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Moment from "moment";

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

const optionsListExecution = [
    {value: 'now', label: 'Сейчас'},
    {value: 'night', label: 'Завтра утром'},
    {value: 'schedule', label: 'Расписание'},
]

const optionsListRepeat = [
    {value: 'disposable', label: 'Без повтора'},
    {value: 'daily', label: 'Каждую ночь'},
    {value: 'monthly', label: 'Каждый месяц'},
    {value: 'year', label: 'Каждый год'},
]

const optionsListStorage = [
    {value: '1', label: '1 день'},
    {value: '2', label: '2 дня'},
    {value: '5', label: '5 дней'},
]

export default function Step_03({classes, dataForm, onChangeDataForm, optionsListMethod}) {
    return (
        <div style={{marginBottom: 20}}>
            <div>На третем шаге заполняется форма настроки запроса формирования отчета</div>
            <div style={{display: "flex"}}>
                <FormControl component="fieldset" className={classes.textField} style={{minWidth: 180}}>
                    <FormLabel className={classes.radioLabel} component="legend">
                        Структурная единица
                    </FormLabel>
                    <RadioGroup
                        value={dataForm.method}
                        aria-label="gender"
                        name="customized-radios"
                        onChange={(event, newValue) => {
                            onChangeDataForm({method: newValue});
                        }}>
                        {optionsListMethod.map((option, idx) => (
                            <FormControlLabel
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<StyledRadio/>}
                            label="По группам ГОСБ"
                        />
                    </RadioGroup>
                </FormControl>
                {dataForm.method === 'gosb' && <div
                    className={classes.textField}
                    style={{marginTop: '23px', width: 270, flexShrink: 0}}>
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
                        options={vspList}
                        getOptionLabel={(option) => (option.label)}
                        renderOption={(option) => option.label}
                        className={classes.textField}
                        style={{width: 250, marginTop: '23px'}}
                        value={vspList.find(el => el.value === dataForm.vsp)}
                        // inputValue={dataForm.vsp}
                        // onChange={(event, newValue) => {
                        //     // console.log(newValue.value)
                        //     onChangeDataForm({vsp: newValue.value});
                        // }}
                        onInputChange={(event, newInputValue) => {
                            onChangeDataForm({vsp: newInputValue.value});
                        }}
                        renderInput={(params) => (
                            <TextField
                                autoFocus
                                label="ВСП"
                                {...params}
                                variant="outlined"/>
                        )}
                    />}
                </div>}
                <FormControl component="fieldset" className={classes.textField} style={{minWidth: 150}}>
                    <FormLabel className={classes.radioLabel}
                               component="legend">Условие&nbsp;запуска</FormLabel>
                    <RadioGroup value={dataForm.execution} aria-label="gender" name="customized-radios"
                                onChange={(event, newValue) => {
                                    if(newValue === 'schedule') {
                                        onChangeDataForm({date: Moment().add(1, 'day').format('yyyy-MM-DD')});
                                    } else {
                                        onChangeDataForm({date: Moment().format('yyyy-MM-DD')});
                                    }
                                    onChangeDataForm({execution: newValue});
                                }}>
                        {optionsListExecution.map((option, idx) => (
                            <FormControlLabel
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<StyledRadio/>}
                            label="По дате и времени"
                        />
                    </RadioGroup>
                </FormControl>

                <div className={classes.textField} style={{marginTop: '23px', width: 200, flexShrink: 0}}>
                    <TextField
                        fullWidth
                        id="date"
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
                    {dataForm.execution === 'schedule' &&
                    <>
                        <div style={{height: '10px'}}/>
                        <em>* Отчет за предыдущий день</em>
                        <div style={{height: '30px'}}/>
                        <FormControl component="fieldset">
                            <FormLabel className={classes.radioLabel} component="legend">
                                Повтор запуска (ночной)
                            </FormLabel>
                            <RadioGroup value={dataForm.range} aria-label="gender" name="customized-radios"
                                        onChange={(event, newValue) => {
                                            onChangeDataForm({range: newValue});
                                        }}>
                                {optionsListRepeat.map((option, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={option.value}
                                        control={<StyledRadio/>}
                                        label={option.label}/>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </>
                    }
                </div>
                <FormControl
                    component="fieldset"
                    className={classes.textField}
                    style={{minWidth: 100, marginRight: 0}}>
                    <FormLabel className={classes.radioLabel} component="legend">
                        Хранение</FormLabel>
                    <RadioGroup value={dataForm.durationStorage} aria-label="gender"
                                name="customized-radios"
                                onChange={(event, newValue) => {
                                    onChangeDataForm({durationStorage: newValue});
                                }}>
                        {optionsListStorage.map((option, idx) => (
                            <FormControlLabel
                                key={idx}
                                value={option.value}
                                control={<StyledRadio/>}
                                label={option.label}/>
                        ))}
                    </RadioGroup>
                </FormControl>

            </div>
        </div>
    )
}