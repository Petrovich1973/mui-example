import React from 'react'

export function FormReportSelect({report, group}) {
    const [list, seList] = React.useState([])
    const [select1, setSelect1] = React.useState({})
    const [select2, setSelect2] = React.useState({})
    const [select3, setSelect3] = React.useState({})
    const [select4, setSelect4] = React.useState({})
    const [result, setResult] = React.useState({})

    React.useEffect(() => {
        if (report) seList(report.children)
    }, [report])

    const handleChange1 = (e) => {
        const name = e.target.value
        if (name) {
            const select = list.find(f => f.TITLE === name)
            setSelect1(select)
            if (!select.NAME_REPORT && select.children.length) setSelect2(select.children)
            else {
                setSelect2({})
                setSelect3({})
                setSelect4({})
                setResult(select)
            }
        } else {
            setSelect1({})
            setSelect2({})
            setSelect3({})
            setSelect4({})
            setResult({})
        }
    }

    const handleChange2 = (e) => {
        const name = e.target.value
        if (name) {
            const select = select1.children.find(f => f.TITLE === name)
            setSelect2(select)
            if (!select.NAME_REPORT && select.children.length) setSelect3(select.children)
            else {
                setSelect3({})
                setSelect4({})
                setResult(select)
            }
        } else {
            setSelect2({})
            setSelect3({})
            setSelect4({})
            setResult({})
        }
    }

    const handleChange3 = (e) => {
        const name = e.target.value
        if (name) {
            const select = select2.children.find(f => f.TITLE === name)
            setSelect3(select)
            if (!select.NAME_REPORT && select.children.length) setSelect4(select.children)
            else {
                setSelect4({})
                setResult(select)
            }
        } else {
            setSelect3({})
            setSelect4({})
            setResult({})
        }
    }

    const handleChange4 = (e) => {
        const name = e.target.value
        if (name) {
            const select = select3.children.find(f => f.TITLE === name)
            setSelect4(select)
            if (!select.NAME_REPORT && select.children.length) alert('появился новый уровень!')
            else {
                // setSelect4({})
                setResult(select)
            }
        } else {
            setSelect4({})
            setResult({})
        }
    }

    return (
        <div className="boxSelect">
            <h4>{group}</h4>
            <div>
                <select name="" id="" value={select1.TITLE || ''} onChange={handleChange1}>
                    <option value="">не выбрано</option>
                    {list.map((option, i) => <option key={i} value={option.TITLE}>{option.TITLE}</option>)}

                </select>
            </div>
            {(('TITLE' in select1) && select1.children.length) ? (
                <div>
                    <select name="" id="" value={select2.TITLE || ''} onChange={handleChange2}>
                        <option value="">не выбрано</option>
                        {select1.children.map((option, i) => <option key={i}
                                                                     value={option.TITLE}>{option.TITLE}</option>)}
                    </select>
                </div>
            ) : ''}
            {(('TITLE' in select2) && select2.children.length) ? (
                <div>
                    <select name="" id="" value={select3.TITLE || ''} onChange={handleChange3}>
                        <option value="">не выбрано</option>
                        {select2.children.map((option, i) => <option key={i}
                                                                     value={option.TITLE}>{option.TITLE}</option>)}
                    </select>
                </div>
            ) : ''}
            {(('TITLE' in select3) && select3.children.length) ? (
                <div>
                    <select name="" id="" value={select4.TITLE || ''} onChange={handleChange4}>
                        <option value="">не выбрано</option>
                        {select3.children.map((option, i) => <option key={i}
                                                                     value={option.TITLE}>{option.TITLE}</option>)}
                    </select>
                </div>
            ) : ''}
            <p>Результат: {('NAME_REPORT' in result) ? result.NAME_REPORT : 'отчет не выбран'}</p>
        </div>
    )
}
