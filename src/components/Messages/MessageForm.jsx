import React, { useState } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'
import firebase from '../../firebase/firebase'
import FileModal from './FileModal'

const MessagesForm = ({
    messageRef,
    currentChannel,
    currentUser: { uid, photoURL, displayName },
}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)

    const uploadFile = (file, metadata = null) => {
        console.log(file, metadata)
    }

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        if (message) {
            setLoading(true)
            messageRef
                .child(currentChannel.id)
                .push()
                .set({
                    content: message,
                    date: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        id: uid,
                        name: displayName,
                        avatar: photoURL,
                    },
                })
                .then(() => {
                    setMessage('')
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                    console.error(err)
                })
        }
    }

    return (
        <Segment className="message__form">
            <Input
                fluid
                name="message"
                style={{ marginBottom: '0.7em' }}
                label={<Button icon={'add'} />}
                labelPosition="left"
                placeholder="Write your message"
                value={message}
                onChange={onChange}
            />
            <Button.Group icon widths="2">
                <Button
                    color="grey"
                    content="Add Reply"
                    labelPosition="left"
                    onClick={sendMessage}
                    icon="edit"
                    disabled={loading}
                />
                <Button
                    color="grey"
                    content="Upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                    disabled={loading}
                    onClick={openModal}
                />
                <FileModal
                    modal={modal}
                    closeModal={closeModal}
                    uploadFile={uploadFile}
                />
            </Button.Group>
        </Segment>
    )
}
export default MessagesForm
