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
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: {
        message: null,
        status: false,
        input: [],
    },
}

const userRef = firebase.database().ref('users')

const Register = () => {
    const [form, setForm] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const { email, username, password, passwordConfirmation, error } = form

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

    const isFormValid = () => {
        if (
            !email.length ||
            !username.length ||
            !password.length ||
            !passwordConfirmation.length
        ) {
            stateError('Not all data is entered', false, [
                'email',
                'username',
                'password',
                'passwordConfirmation',
            ])
            return false
        }

        if (!(password.length >= 6)) {
            stateError('Password length less than 6', false, ['password'])
            return false
        }

        if (password !== passwordConfirmation) {
            stateError("Passwords don't match", false, [
                'password',
                'passwordConfirmation',
            ])
            return false
        }
        stateError()

        return true
    }

    const handlerInputError = (inputName) =>
        error.input.includes(inputName) ? 'error' : ''

    const saveUser = (createdUser) => {
        return userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
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
            .createUserWithEmailAndPassword(email, password)
            .then((createUser) => {
                createUser.user
                    .updateProfile({
                        displayName: username,
                        photoURL: `https://oceni-krasotu.ru/wp-content/uploads/2019/12/eff759c20463c17cd91253ffe3e91768.jpg`,
                    })
                    .then(() => {
                        saveUser(createUser).then(() => {
                            console.log('user saved')
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        stateError(err.message, true)
                    })
            })
            .catch((err) => {
                console.log(err)
                stateError(err.message, true)
            })
        offLoading()
    }

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column
                style={{
                    maxWidth: 450,
                }}
            >
                <Header as="h2" icon color="blue" textAlign="center">
                    <Icon className="keyboard piece" color={'blue'} />
                    Register
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            className={handlerInputError('username')}
                            onChange={onChange}
                            type="text"
                            value={username}
                        />
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
                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password Confirmation"
                            className={handlerInputError(
                                'passwordConfirmation'
                            )}
                            onChange={onChange}
                            type="password"
                            value={passwordConfirmation}
                        />
                        <Button
                            className={loading ? 'loading' : null}
                            color={'blue'}
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
                    Already a user? <Link to={'/login'}>Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Register
