import React, { useEffect } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'
import { ChannelMessages } from '../../actions/channels-action'
import Spinner from '../common/Spinner'
import Message from './Message'

const messageRef = firebase.database().ref('messages')

const Messages = ({
    currentChannel,
    currentUser,
    ChannelMessages,
    messages: { messageLoading, messages },
}) => {
    useEffect(() => {
        if (currentChannel && currentUser) {
            let loadMessages = []
            messageRef.child(currentChannel.id).on('child_added', (snap) => {
                loadMessages.push(snap.val())
                ChannelMessages(loadMessages)
            })
        }
    }, [currentChannel, currentUser])

    if (!currentChannel) {
        return null
    }

    return (
        <>
            <MessageHeader />
            <Segment>
                <Comment.Group className="messages">
                    {messages.length > 0 &&
                        messages.map((message) => (
                            <Message
                                message={message}
                                userId={currentUser.uid}
                                key={message.date}
                            />
                        ))}
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
    messages: state.channel.message,
})

export default connect(mapStateToProps, {
    ChannelMessages,
})(Messages)
