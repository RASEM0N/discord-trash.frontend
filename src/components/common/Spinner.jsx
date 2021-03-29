import React from 'react'
import spinner from './spinner.gif'

function Spinner() {
    return (
        <div
            style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -125%)',
            }}
        >
            <img
                src={spinner}
                style={{
                    width: '75px',
                }}
                alt="Loading..."
            />
        </div>
    )
}

export default Spinner
