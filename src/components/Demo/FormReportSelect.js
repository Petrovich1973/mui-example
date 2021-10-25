import React from 'react'
import {TextField} from "@material-ui/core"
import {Autocomplete} from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    input: {
        background: "rgb(232, 241, 250)"
    }
}))

const empty = {empty: true, TITLE: "Не выбрано", NAME_REPORT: "", children: []}

export function FormReportSelect({report, group}) {
    const classes = useStyles()
    const [list, seList] = React.useState([])
    const [select1, setSelect1] = React.useState(empty)
    const [select2, setSelect2] = React.useState(empty)
    const [select3, setSelect3] = React.useState(empty)
    const [select4, setSelect4] = React.useState(empty)
    const [result, setResult] = React.useState({})

    React.useEffect(() => {
        if (report) seList(report.children)
    }, [report])

    const resultReportPath = () => {
        const r = [select1, select2, select3, select4].map((m, i) => {
            if(i === 0) return `${m.NAME_REPORT || m.TITLE}`
            if(!m.empty) return ` / ${m.NAME_REPORT || m.TITLE}`
            return ''
        })
        return r.join('')
    }

    const renderInput = (params) => (
        <TextField
            className={classes.input}
            autoFocus
            label=""
            {...params}
            placeholder="Не выбрано"
            variant="outlined"/>
    )

    const getOptionLabel = option => `${option.NAME_REPORT || option.TITLE}`
    const renderOption = option => `${option.NAME_REPORT || option.TITLE}`
    const getOptionSelected = (option, value) => value.value === option.value

    const handleChange1 = (value) => {
        const {TITLE} = value
        if (TITLE) {
            const select = value || empty
            setSelect1(select)
            if (!select.NAME_REPORT && select.children.length) setSelect2({TITLE: ""})
            else {
                setSelect2(empty)
                setSelect3(empty)
                setSelect4(empty)
                setResult(select)
            }
        } else {
            setSelect1(empty)
            setSelect2(empty)
            setSelect3(empty)
            setSelect4(empty)
            setResult(empty)
        }
    }

    const handleChange2 = (value) => {
        const {TITLE} = value
        if (TITLE) {
            const select = value || empty
            setSelect2(select)
            if (!select.NAME_REPORT && select.children.length) setSelect3({TITLE: ""})
            else {
                setSelect3(empty)
                setSelect4(empty)
                setResult(select)
            }
        } else {
            setSelect2(empty)
            setSelect3(empty)
            setSelect4(empty)
            setResult(empty)
        }
    }

    const handleChange3 = (value) => {
        const {TITLE} = value
        if (TITLE) {
            const select = value || empty
            setSelect3(select)
            if (!select.NAME_REPORT && select.children.length) setSelect4({TITLE: ""})
            else {
                setSelect4(empty)
                setResult(select)
            }
        } else {
            setSelect3(empty)
            setSelect4(empty)
            setResult(empty)
        }
    }

    const handleChange4 = (value) => {
        const {TITLE} = value
        if (TITLE) {
            const select = select3.children.find(f => f.TITLE === TITLE) || empty
            setSelect4(select)
            if (!select.NAME_REPORT && select.children.length) alert('появился новый уровень!')
            else {
                // setSelect5({TITLE: ""})
                setResult(select)
            }
        } else {
            setSelect4(empty)
            setResult(empty)
        }
    }

    return (
        <div className="boxSelect">
            <h4>{group}</h4>
            <div>
                <Autocomplete
                    noOptionsText={'Ничего не найдено'}
                    size={"medium"}
                    options={[{...empty}, ...list]}
                    getOptionLabel={getOptionLabel}
                    renderOption={renderOption}
                    getOptionSelected={getOptionSelected}
                    style={{width: 450}}
                    defaultValue={empty}
                    value={select1}
                    onChange={(event, newValue) => {
                        if(!newValue) handleChange1(empty)
                        else handleChange1(newValue)
                    }}
                    renderInput={renderInput}
                />
            </div>
            {(select1.TITLE && select1.children.length) ? (
                <div>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        size={"medium"}
                        options={[{...empty}, ...select1.children]}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 450}}
                        defaultValue={empty}
                        value={select2}
                        onChange={(event, newValue) => {
                            if(!newValue) handleChange2(empty)
                            else handleChange2(newValue)
                        }}
                        renderInput={renderInput}
                    />
                </div>
            ) : ''}
            {(select2.TITLE && select2.children.length) ? (
                <div>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        size={"medium"}
                        options={[{...empty}, ...select2.children]}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 450}}
                        defaultValue={empty}
                        value={select3}
                        onChange={(event, newValue) => {
                            if(!newValue) handleChange3(empty)
                            else handleChange3(newValue)
                        }}
                        renderInput={renderInput}
                    />
                </div>
            ) : ''}
            {(select3.TITLE && select3.children.length) ? (
                <div>
                    <Autocomplete
                        openOnFocus
                        noOptionsText={'Ничего не найдено'}
                        size={"medium"}
                        options={[{...empty}, ...select3.children]}
                        getOptionLabel={getOptionLabel}
                        renderOption={renderOption}
                        getOptionSelected={getOptionSelected}
                        style={{width: 450}}
                        defaultValue={empty}
                        value={select4}
                        onChange={(event, newValue) => {
                            if(!newValue) handleChange4(empty)
                            else handleChange4(newValue)
                        }}
                        renderInput={renderInput}
                    />
                </div>
            ) : ''}
            <p>{('NAME_REPORT' in result) ? <span>Выбрано: <strong>{resultReportPath()}</strong></span> : 'отчет не выбран'}</p>
        </div>
    )
}
