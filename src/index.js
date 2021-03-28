import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import App from './App.jsx'
import firebase from './firebase/firebase'
import { connect, Provider } from 'react-redux'
import store from './store'
import { compose } from 'redux'
import { setUser } from './actions/user-action'
import Spinner from './components/common/Spinner'

const Root = ({ history, setUser, isLoading }) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                history.push('/')
            }
        })
    }, [])

    return isLoading ? (
        <Spinner />
    ) : (
        <Switch>
            <Route exact path={'/'} component={App} />
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
        </Switch>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
})

const RootWithAuth = compose(
    withRouter,
    connect(mapStateToProps, {
        setUser,
    })
)(Root)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
