import React from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete"
import reports from '../reports.json'
import TextField from "@material-ui/core/TextField";

const rows = reports.root.row
    .filter(f => (f.NAME_PROC !== "no proc"))
    .filter(f => (f.NAME_REPORT !== "Тестовый отчет для отладки"))
    .filter(f => (f.TITLE !== "меню 1"))

export default function FormSelectStructure({isReportSelect}) {
    const [l1, setL1] = React.useState(null)
    const [l2, setL2] = React.useState(null)
    const [l3, setL3] = React.useState(null)

    React.useEffect(() => {
        const path = l1 && <>
            {l1 &&
            <span><small><em>{l1.MENU_NUMBER}</em></small> <strong>{l1.NAME_REPORT || l1.TITLE}</strong></span>}
            {l2 &&
            <span> &#10141;
                <small><em>{l2.MENU_NUMBER}</em></small> <strong>{l2.NAME_REPORT || l2.TITLE}</strong></span>}
            {l3 &&
            <span> &#10141;
                <small><em>{l3.MENU_NUMBER}</em></small> <strong>{l3.NAME_REPORT || l3.TITLE}</strong></span>}
        </>
        const name = (l1 && l1.NAME_REPORT) || (l2 && l2.NAME_REPORT) || (l3 && l3.NAME_REPORT)
        const reportTpl = {
            reportTpl: {
                path,
                name
            }
        }
        if (name) isReportSelect(reportTpl)
        else isReportSelect({
            reportTpl: {
                path: '',
                name: ''
            }
        })
    }, [l1, l2, l3])

    const resultList = rows
        .reduce((sum, current) => {
            if (current.GROUP_NAME) sum.push({...current, children: []})
            else sum[sum.length - 1].children.push({...current, children: []})
            return sum
        }, [])
        .filter(f => (f.GROUP_NAME === 'dep_web_reports'))
        .reduce((sum, current) => {
            current.children.forEach(row => {
                sum.push(row)
            })
            return sum
        }, [])

    const nesting = (prevSelect, n) => (
        resultList.filter(f => f.MENU_NUMBER.split('.').length === n &&
            prevSelect.MENU_NUMBER === f.MENU_NUMBER.split('.').splice(0, n - 1).join('.'))
    )

    const renderInput = (params) => (
        <TextField
            autoFocus
            label=""
            {...params}
            placeholder="Не выбрано"
            variant="outlined"/>
    )
    const getOptionLabel = option => `${option.MENU_NUMBER} ${option.NAME_REPORT} ${option.TITLE}`
    const renderOption = option => `${option.MENU_NUMBER} ${option.NAME_REPORT || option.TITLE}`
    const getOptionSelected = (option, value) => option.TITLE === value.TITLE

    return (
        <>
            {l1 && <>
                <div>
                    {l1 &&
                    <span><small><em>{l1.MENU_NUMBER}</em></small> <strong>{l1.NAME_REPORT || l1.TITLE}</strong></span>}
                    {l2 &&
                    <span> &#10141;
                        <small><em>{l2.MENU_NUMBER}</em></small> <strong>{l2.NAME_REPORT || l2.TITLE}</strong></span>}
                    {l3 &&
                    <span> &#10141;
                        <small><em>{l3.MENU_NUMBER}</em></small> <strong>{l3.NAME_REPORT || l3.TITLE}</strong></span>}
                </div>
                <div style={{height: 10}}/>
            </>}
            <div>
                <Autocomplete
                    openOnFocus
                    noOptionsText={'Ничего не найдено'}
                    id="l1"
                    size={"medium"}
                    options={resultList.filter(f => f.MENU_NUMBER.split('.').length === 2)}
                    getOptionLabel={getOptionLabel}
                    renderOption={renderOption}
                    getOptionSelected={getOptionSelected}
                    style={{width: 450}}
                    value={l1}
                    onChange={(event, newValue) => {
                        setL1(newValue)
                        setL2(null)
                        setL3(null)
                    }}
                    renderInput={renderInput}
                />
            </div>
            {l1 && nesting(l1, 3).length ?
                <div>
                    <div style={{height: 10}}/>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        id="l2"
                        size={"medium"}
                        options={nesting(l1, 3)}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 450}}
                        value={l2}
                        onChange={(event, newValue) => {
                            setL2(newValue)
                            setL3(null)
                        }}
                        renderInput={renderInput}
                    />
                </div> : null}
            {l2 && nesting(l2, 4).length ?
                <div>
                    <div style={{height: 10}}/>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        id="l3"
                        size={"medium"}
                        options={nesting(l2, 4)}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 450}}
                        value={l3}
                        onChange={(event, newValue) => {
                            setL3(newValue)
                        }}
                        renderInput={renderInput}
                    />
                </div> : null}
        </>
    )
}
