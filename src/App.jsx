import React from 'react'
import { Grid } from 'semantic-ui-react'
import ColorPanel from './components/ColorPanel/ColorPanel'
import SidePanel from './components/SIdePanel/SidePanel'
import Messages from './components/Messages/Messages'
import MetaPanel from './components/MetaPanel/MetaPanel'

function App() {
    return (
        <Grid columns={'equal'} className={'app'}>
            <ColorPanel />
            <SidePanel />
            <Grid.Column
                style={{
                    marginLeft: 320,
                }}
            >
                <Messages />
            </Grid.Column>
            <Grid.Column width={4}>
                <MetaPanel />
            </Grid.Column>
        </Grid>
    )
}

export default App
