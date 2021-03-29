import React from 'react'
import { Comment } from 'semantic-ui-react'

function Message({ message, userId }) {
    return (
        <Comment
            style={{
                display: 'flex',
            }}
        >
            <img
                src={message.user.avatar}
                alt=""
                style={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                }}
            />
            <Comment.Content
                className={message.user.id === userId ? 'message__self' : ''}
                style={{ marginLeft: 20 }}
            >
                <Comment.Author>{message.user.name}</Comment.Author>
                <Comment.Text>{message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default Message
