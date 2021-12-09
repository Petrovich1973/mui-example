import React from 'react'

const styleBlock = {
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, .04)'
}
const styleInput = {
    display: 'block',
    width: '100%',
    height: 32,
    padding: '0 10px',
    backgroundColor: 'white',
    border: 'none',
    fontSize: 'inherit',
    '&:focus': {
        borderColor: '#ccc',
        borderRadius: 0
    }
}

export default function Search () {
    return(
        <div style={styleBlock}>
            <input style={styleInput} type="text"/>
        </div>
    )
}
