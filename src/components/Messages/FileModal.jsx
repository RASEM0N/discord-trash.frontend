import React, { useState } from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'

function FileModal({ modal, closeModal, uploadFile }) {
    const [file, setFile] = useState(null)
    const formatFile = ['image/jpeg', 'image/png']

    const addFile = (e) => {
        const file = e.target?.files[0]

        if (file) {
            setFile(file)
        }
    }

    const clearFile = () => setFile(null)

    const isAuthorized = (fileType) => formatFile.includes(fileType)

    const sendFile = () => {
        if (file) {
            if (isAuthorized(file?.type)) {
                uploadFile(file, { contentType: file.type })
                closeModal()
                clearFile()
            }
        }
    }

    return (
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select an Image File</Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    label="File types: jpg, png"
                    name="file"
                    type="file"
                    onChange={addFile}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={sendFile} color="grey" inverted>
                    <Icon className="checkmark" /> Send
                </Button>
                <Button color="grey" inverted onClick={closeModal}>
                    <Icon className="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default FileModal
