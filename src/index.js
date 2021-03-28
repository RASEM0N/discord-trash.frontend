import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import App from './App.jsx'
import firebase from './firebase/firebase'

const Root = ({ history }) => {
    useEffect(() => {
        // вроде куки чекает
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                history.push('/')
            }
        })
    }, [])

    return (
        <Switch>
            <Route exact path={'/'} component={App} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
        </Switch>
    )
}

const RootWithAuth = withRouter(Root)

ReactDOM.render(
    <BrowserRouter>
        <RootWithAuth />
    </BrowserRouter>,
    document.getElementById('root')
)
