import React from 'react'
import '../style/users.scss'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'

const Users = () => {

  const { handleGetFollowers, handleAcceptRequest, handleRejectRequest, followers } = useUser()

  useEffect(() => {
    handleGetFollowers()
  }, [])

  const followwers = [
    {
      id: 1,
      username: 'john_doe',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Photography enthusiast'
    },
    {
      id: 2,
      username: 'sarah_smile',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Travel blogger'
    },
    {
      id: 2,
      username: 'sarah_smile',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Travel blogger'
    },
    {
      id: 2,
      username: 'sarah_smile',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Travel blogger'
    },
    {
      id: 2,
      username: 'sarah_smile',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Travel blogger'
    },
    {
      id: 3,
      username: 'mike_travel',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Adventure seeker'
    }
  ]

  const following = [
    {
      id: 1,
      username: 'emma_watson',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Fitness coach'
    },
    {
      id: 2,
      username: 'alex_dev',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Web developer'
    },
    {
      id: 3,
      username: 'lisa_art',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Digital artist'
    }
  ]

  const suggestedUsers = [
    {
      id: 1,
      username: 'david_design',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'UI/UX Designer'
    },
    {
      id: 2,
      username: 'priya_music',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Music producer'
    },
    {
      id: 3,
      username: 'tom_chef',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Food lover'
    },
    {
      id: 4,
      username: 'nina_fashion',
      profileImg: 'https://ik.imagekit.io/4hjtmx0un/default%20profile.jpg',
      bio: 'Fashion enthusiast'
    }
  ]

  const renderUserCard = (user) => (
    <div key={user._id} className='user-card'>
      <img src={user.follower.profileImg} className='user-avatar' />
      <div className='user-info'>
        <h4>{user.follower.username}</h4>
      </div>
      {user.status === 'pending' ?
        <div className="action">
          <button onClick={()=>handleAcceptRequest(user._id)} className='accept-btn'>Accept</button>
          <button onClick={()=>handleRejectRequest(user._id)} className='icon' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg></button>
        </div> : ''}
    </div>
  )

  return (
    <div className='users-container'>

      <div className='users-section follower'>
        <h3 className='section-title'>Followers</h3>
        <div className='users-list'>
          {followers ? followers.map(user => renderUserCard(user)) : <p>Loading</p>}
        </div>
      </div>

      {/* <div className='users-section'>
        <h3 className='section-title'>Following</h3>
        <div className='users-list'>
          {following.map(user => renderUserCard(user))}
        </div>
      </div>

      <div className='users-section'>
        <h3 className='section-title'>Suggested For You</h3>
        <div className='users-list'>
          {suggestedUsers.map(user => renderUserCard(user))}
        </div>
      </div> */}
    </div>
  )
}

export default Users
