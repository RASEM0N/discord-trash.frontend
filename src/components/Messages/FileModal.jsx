import React from 'react'
import { Button, Icon, Input, Modal } from 'semantic-ui-react'

function FileModal({ modal, closeModal }) {
    return (
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select an Image File</Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    label="File types: jpg, png"
                    name="file"
                    type="file"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="grey" inverted>
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
