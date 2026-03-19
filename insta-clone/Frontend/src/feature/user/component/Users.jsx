import React, { useState, useEffect } from 'react'
import '../style/users.scss'
import { useUser } from '../hooks/useUser'

const Users = ({ isMobileMode }) => {
  const [activeTab, setActiveTab] = useState('follower')
  const { handleGetFollowers, handleAcceptRequest, handleRejectRequest, handleGetFollowing, handleUnfollowUser, handleCancelFollowRequest, followers, following } = useUser()

  useEffect(() => {
    handleGetFollowers()
    handleGetFollowing()
  }, [])

  const renderUserCard = (user, type) => (
    <div key={user._id} className='user-card followers-card'>
      <img src={user[type].profileImg} className='user-avatar' />
      <div className='user-info'>
        <h4>{user[type].username}</h4>
      </div>
      {type === 'follower' && (user.status === 'pending' ?
        <div className="action">
          <button onClick={() => handleAcceptRequest(user._id)} className='accept-btn'>Accept</button>
          <button onClick={() => handleRejectRequest(user._id)} className='icon' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg></button>
        </div> : '')}
      {type === 'followee' && (user.status === 'accepted' ?
        <div className="action">
          <button onClick={() => handleUnfollowUser(user.followee._id)} className='unfollow-btn'>Unfollow</button>
        </div> : <button onClick={() => handleCancelFollowRequest(user.followee._id)} className='cancel-request-btn'>Cancel request</button>)}
    </div>
  )

  return (
    <div className={`users-container ${isMobileMode ? 'mobile-mode' : ''}`}>

      {isMobileMode && (
        <div className="mobile-tabs">
          <button
            className={activeTab === 'follower' ? 'active' : ''}
            onClick={() => setActiveTab('follower')}
          >
            follower
          </button>
          <button
            className={activeTab === 'following' ? 'active' : ''}
            onClick={() => setActiveTab('following')}
          >
            following
          </button>
        </div>
      )}

      {(!isMobileMode || activeTab === 'follower') && (
        <div className='users-section follower'>
          {!isMobileMode && <h3 className='section-title'>Followers</h3>}
          <div className='users-list'>
            {followers ? followers.map(user => renderUserCard(user, 'follower')) : <p>Loading...</p>}
          </div>
        </div>
      )}

      {(!isMobileMode || activeTab === 'following') && (
        <div className='users-section following'>
          {!isMobileMode && <h3 className='section-title'>Following</h3>}
          <div className='users-list'>
            {following ? following.map(user => renderUserCard(user, 'followee')) : <p>Loading...</p>}
          </div>
        </div>
      )}

    </div>
  )
}

export default Users
