import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'

const SidePanel = () => {
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
            <UserPanel />
        </Menu>
    )
}
export default SidePanel
