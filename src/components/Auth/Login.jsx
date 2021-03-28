import React, { useState } from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase/firebase'

const initialState = {
    email: '',
    password: '',
    error: {
        message: null,
        status: false,
        input: [],
    },
}

function Login() {
    const [form, setForm] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const { email, password, error } = form

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onLoading = () => {
        setLoading(true)
    }

    const offLoading = () => {
        setLoading(false)
    }

    const stateError = (message = null, status = true, input = []) => {
        setForm({
            ...form,
            error: {
                message,
                status,
                input,
            },
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let err = isFormValid()
        if (!err) {
            return
        }

        onLoading()
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user)
                console.log('logged in')
            })
            .catch((err) => {
                stateError(err.message, true)
            })
        offLoading()
    }

    const isFormValid = () => {
        if (!email.length || !password.length) {
            stateError('Not all data is entered', false, ['email', 'password'])
            return false
        }

        if (!(password.length >= 6)) {
            stateError('Password length less than 6', false, ['password'])
            return false
        }
        stateError()

        return true
    }

    const handlerInputError = (inputName) =>
        error.input.includes(inputName) ? 'error' : ''

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column
                style={{
                    maxWidth: 450,
                }}
            >
                <Header as="h2" icon color="grey" textAlign="center">
                    <Icon className="keyboard piece" color={'grey'} />
                    Login
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            className={handlerInputError('email')}
                            onChange={onChange}
                            type="email"
                            value={email}
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            className={handlerInputError('password')}
                            onChange={onChange}
                            type="password"
                            value={password}
                        />
                        <Button
                            className={loading ? 'loading' : null}
                            color={'grey'}
                            fluid
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Segment>
                </Form>
                {error.message ? (
                    <Message error>{error.message}</Message>
                ) : null}

                <Message
                    style={{
                        backgroundColor: 'white',
                        boxShadow: 'none',
                    }}
                >
                    Don't have an account? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
