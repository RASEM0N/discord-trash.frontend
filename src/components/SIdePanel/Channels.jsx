import React, { useState } from 'react'
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'
import firebase from '../../firebase/firebase'

const initialStateForm = {
    channelName: '',
    channelDetails: '',
}

const channelRef = firebase.database().ref('channels')

const Channels = ({ user: { displayName, photoURL } }) => {
    const [channels, setChannel] = useState([])
    const [form, setForm] = useState(initialStateForm)
    const [stateModal, setStateModal] = useState(false)

    const { channelName, channelDetails } = form

    const closeModal = () => {
        setStateModal(false)
    }
    const openModal = () => {
        setStateModal(true)
    }

    const addChannel = () => {
        const key = channelRef.push().key

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: displayName,
                avatar: photoURL,
                date: Date.now(),
            },
        }

        channelRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setChannel([...channels, newChannel])
                setStateModal(false)
                console.log(`channel added`)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const isFormValid = () => channelName && channelDetails

    const onSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            addChannel()
        }
    }

    return (
        <>
            <Menu.Menu
                style={{
                    paddingBottom: '2em',
                }}
            >
                <Menu.Item>
                    <span>
                        <Icon className="exchange" /> CHANNELS{' '}
                    </span>
                    ({channels.length}){' '}
                    <Icon className="add" onClick={openModal} />
                </Menu.Item>
            </Menu.Menu>

            <Modal basic open={stateModal} onClose={closeModal}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label="Name of Channel"
                                name="channelName"
                                value={channelName}
                                onChange={onChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                label="Details of Channel"
                                name="channelDetails"
                                value={channelDetails}
                                onChange={onChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="grey" inverted onClick={onSubmit}>
                        <Icon className="checkmark" /> Add
                    </Button>
                    <Button color="grey" inverted onClick={closeModal}>
                        <Icon className="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
export default Channels