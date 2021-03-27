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
}

function Register() {
    const [formParams, setFormParams] = useState(initialState)

    const { email, username, password, passwordConfirmation } = formParams

    const handleChange = (e) => {
        setFormParams({ ...formParams, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirmation) {
            console.error(`Password and Password Confirmation are not equal`)
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((createUser) => {
                console.log(createUser)
            })
            .catch((err) => {
                console.log(err)
            })
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
                            onChange={handleChange}
                            type="text"
                            value={username}
                        />
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            onChange={handleChange}
                            type="email"
                            value={email}
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            onChange={handleChange}
                            type="password"
                            value={password}
                        />
                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password Confirmation"
                            onChange={handleChange}
                            type="password"
                            value={passwordConfirmation}
                        />
                        <Button color={'blue'} fluid type="submit">
                            Submit
                        </Button>
                    </Segment>
                </Form>
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
