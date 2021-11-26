import React from 'react'
import axios from "axios"

const style = {
    padding: '0 14px',
    height: '32px',
    fontSize: 18
}
const styleText = {
    padding: '14px',
    fontSize: 18,
    fontFamily: 'inherit'
}

export default function Test() {
    const [url, setUrl] = React.useState('http://localhost:9901')
    const [result, setResult] = React.useState('---')
    const [method, setMethod] = React.useState('GET')
    const [data, setData] = React.useState('')
    const [isError, setIsError] = React.useState(false)
    const [load, setLoad] = React.useState(false)

    React.useEffect(() => {
        result.includes('Error') ? setIsError(true) : setIsError(false)
    }, [result])

    const onChangeUrl = e => {
        const value = e.target.value
        setUrl(value)
    }

    const onKeyDownUrl = e => {
        if (e.key === 'Enter') {
            onSend()
        }
    }

    const onChangeMethod = e => {
        const value = e.target.value
        setMethod(value)
    }

    const onChangeData = e => {
        const value = e.target.value
        setData(value)
    }

    const onSend = async () => {
        setResult('---')
        setLoad(true)
        await axios({
            method,
            url,
            data
        })
        .then(res => setResult(JSON.stringify(res.data)))
        .catch(err => {
            setResult(JSON.stringify(err.toJSON()))
            console.log(err.message)
        })
        setLoad(false)
    }

    const handleFocus = (event) => event.target.select()

    return (
        <div>
            <p>Example:</p>
            <p><small><small>https://jsonplaceholder.typicode.com/posts</small></small></p>
            <p>
                <input
                    value={url}
                    onChange={onChangeUrl}
                    onKeyDown={onKeyDownUrl}
                    onFocus={handleFocus}
                    style={{...style, width: 600}}/> Host
            </p>
            <p><select name="method" id="method" value={method} onChange={onChangeMethod} style={style}>
                {['GET', 'POST', 'PUT', 'DELETE'].map((option, i) => (
                    <option value={option} key={i}>{option}</option>
                ))}
            </select> Method</p>
            {method === 'POST' || method === 'PUT' ? <p>
                <textarea
                    rows="10"
                    cols="45"
                    name="text"
                    value={data}
                    placeholder={`{
    "key": "value" 
}`}
                    onChange={onChangeData}
                    style={{...styleText}}/>
            </p> : ''}
            <h2>Test Request to {url}</h2>
            <p><button style={style} onClick={onSend} disabled={load}>Send</button> {load ? '...Waiting' : ''}</p>
            <p style={isError ? {color: 'red'} : {color: 'green'}}>Result: {result}</p>
        </div>

    )
}