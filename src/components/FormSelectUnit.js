import React from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete"
import {tbList, osbList, vspList} from '../data.js'
import TextField from "@material-ui/core/TextField";
import {ChevronRight} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            display: 'flex',
            alignItems: 'center',
        }
    }
}));

export default function FormSelectUnit({isUnitSelect}) {
    const [l1, setL1] = React.useState(null)
    const [l2, setL2] = React.useState(null)
    const [l3, setL3] = React.useState(null)
    const classes = useStyles();

    const path = <span className={classes.root}>
        {[l1,l2,l3].map((el, i) => {
            if(!el) return (el)
            if(i === 0) return (
                <span key={i}>
                    <small><em>ТБ</em></small>
                    &nbsp;
                    <strong>{el.value} {el.label}</strong>
                </span>
            )
            if(i === 1) return (
                <span key={i}>
                    <ChevronRight/>
                    <small><em>ОСБ</em></small>
                    &nbsp;
                    <strong>{el.label}</strong>
                </span>
            )
            return (
                <span key={i}>
                    <ChevronRight/>
                    <small><em>ВСП</em></small>
                    &nbsp;
                    <strong>{el.label}</strong>
                </span>
            )
        })}
    </span>

    React.useEffect(() => {
        const tb = (l1 && l1.value) || null
        const osb = (l2 && l2.value) || null
        const vsp = (l3 && l3.value) || null
        const unit = {
            unit: {
                tb,
                osb,
                vsp,
                path
            }
        }
        if (tb) isUnitSelect(unit)
        else isUnitSelect({
            unit: {
                tb: '',
                osb: '',
                vsp: '',
                path: ''
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [l1, l2, l3])

    const renderInput = (params, label) => (
        <TextField
            autoFocus
            label={label}
            {...params}
            placeholder="Не выбрано"
            variant="outlined"/>
    )
    const getOptionLabel = option => `${option.label}`
    const renderOption = option => `${option.label}`
    const getOptionSelected = (option, value) => option.label === value.label

    return (
        <>
            {l1 && <>
                {path}
                <div style={{height: 10}}/>
            </>}
            <div>
                <Autocomplete
                    openOnFocus={false}
                    noOptionsText={'Ничего не найдено'}
                    id="l1"
                    size={"medium"}
                    options={tbList}
                    getOptionLabel={option => `${option.value} ${option.label}`}
                    renderOption={option => `${option.value} ${option.label}`}
                    getOptionSelected={getOptionSelected}
                    style={{width: 300}}
                    value={l1}
                    onChange={(event, newValue) => {
                        setL1(newValue)
                        setL2(null)
                        setL3(null)
                    }}
                    renderInput={params => renderInput(params, 'ТБ')}
                />
            </div>
            {l1 ?
                <div>
                    <div style={{height: 10}}/>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        id="l2"
                        size={"medium"}
                        options={osbList}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 300}}
                        value={l2}
                        onChange={(event, newValue) => {
                            setL2(newValue)
                            setL3(null)
                        }}
                        renderInput={params => renderInput(params, 'ОСБ')}
                    />
                </div> : null}
            {l2 ?
                <div>
                    <div style={{height: 10}}/>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        id="l3"
                        size={"medium"}
                        options={vspList}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 300}}
                        value={l3}
                        onChange={(event, newValue) => {
                            setL3(newValue)
                        }}
                        renderInput={params => renderInput(params, 'ВСП')}
                    />
                </div> : null}
        </>
    )
}
