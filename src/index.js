import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import App from './App.jsx'

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={App} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
)
