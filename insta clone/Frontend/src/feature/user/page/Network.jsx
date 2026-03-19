import React from 'react'
import Users from '../../user/component/Users'
import Nav from '../../shared/component/Nav'
import '../../user/style/network.scss'

const Network = () => {
    return (
        <main className='network-main'>
            <div className="network-page">
                <Nav />
                <div className="network-content">
                    <Users isMobileMode={true} />
                </div>
            </div>
        </main>
    )
}

export default Network
