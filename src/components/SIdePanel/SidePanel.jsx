import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Channels from './Channels'
import { connect } from 'react-redux'

const SidePanel = ({ user }) => {
    return (
        <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{
                fontsize: '1.2rem',
                background: 'grey',
            }}
        >
            <UserPanel
                user={{
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }}
            />
            <Channels
                user={{
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }}
            />
        </Menu>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
})
export default connect(mapStateToProps, null)(SidePanel)
