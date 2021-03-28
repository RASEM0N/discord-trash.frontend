import React from 'react'
import { Dropdown, Grid, Header, Icon, Image, Menu } from 'semantic-ui-react'
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'

const UserPanel = ({ user: { displayName, photoURL } }) => {
    const onSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log(`SignOut`)
            })
    }

    const dropdownOptions = [
        {
            key: 'user',
            text: (
                <span>
                    Signed by{' '}
                    <strong>{displayName ? displayName : 'User'}</strong>{' '}
                </span>
            ),
            disabled: true,
        },

        {
            key: 'avatar',
            text: <span>Change Avatar</span>,
        },

        {
            key: 'signout',
            text: <span onClick={onSignOut}>Sing Out</span>,
        },
    ]

    return (
        <Grid>
            <Grid.Column>
                <Grid.Row
                    style={{
                        padding: '1.2rem',
                        margin: 0,
                    }}
                >
                    {/*App Header*/}
                    <Header inverted floated="left" as="h2">
                        <Icon className="chat" />
                        <Header.Content>Chat</Header.Content>
                    </Header>
                    <Header
                        style={{
                            padding: '0.25rem',
                        }}
                        inverted
                        as="h4"
                    >
                        <Dropdown
                            trigger={
                                <span>
                                    <Image
                                        src={photoURL ? photoURL : null}
                                        avatar
                                        spaced="right"
                                        style={{
                                            objectFit: 'cover',
                                            // objectPosition: '0 -15px',
                                            width: 60,
                                            height: 60,
                                        }}
                                    />
                                    {displayName ? displayName : 'User'}
                                </span>
                            }
                            options={dropdownOptions}
                        />
                    </Header>
                </Grid.Row>
                {/*User Dropdown*/}
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
})

export default connect(mapStateToProps, null)(UserPanel)
