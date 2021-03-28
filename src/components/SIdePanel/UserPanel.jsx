import React from 'react'
import { Dropdown, Grid, Header, Icon, Menu } from 'semantic-ui-react'
import firebase from '../../firebase/firebase'

const UserPanel = () => {
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
                    Signed is as <strong>User</strong>{' '}
                </span>
            ),
            disabled: true,
        },

        {
            key: 'avatar',
            text: <span>Change a Avatar</span>,
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
                </Grid.Row>
                {/*User Dropdown*/}
                <Header
                    style={{
                        padding: '0.25rem',
                    }}
                    inverted
                    as="h4"
                >
                    <Dropdown
                        trigger={<span>User</span>}
                        options={dropdownOptions}
                    />
                </Header>
            </Grid.Column>
        </Grid>
    )
}
export default UserPanel
