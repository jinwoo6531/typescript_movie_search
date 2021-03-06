import * as React from 'react'

interface HeaderProps {
    text : string
}

function Header({text}:HeaderProps) {
    return (
        <div>
            <header className="App-header">
                <h2>{text}</h2>
            </header>
        </div>
    )
}

export default Header
