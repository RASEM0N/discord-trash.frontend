import React from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'

const messageRef = firebase.database().ref('messages')

const Messages = ({ currentChannel, currentUser }) => {
    if (!currentChannel) {
        return null
    }

    return (
        <>
            <MessageHeader />
            <Segment>
                <Comment.Group className="messages">
                    {/*messages*/}
                </Comment.Group>
            </Segment>
            <MessageForm
                messageRef={messageRef}
                currentChannel={currentChannel}
                currentUser={currentUser}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    currentChannel: state.channel.currentChannel,
    currentUser: state.user.currentUser,
})

export default connect(mapStateToProps, null)(Messages)
