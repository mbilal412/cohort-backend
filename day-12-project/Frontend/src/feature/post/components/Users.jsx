import React from 'react'
import '../style/users.scss'

const Users = () => {
  const followers = [
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
    <div key={user.id} className='user-card'>
      <img src={user.profileImg} alt={user.username} className='user-avatar' />
      <div className='user-info'>
        <h4>{user.username}</h4>
      </div>
      <button className='follow-btn'>Follow</button>
    </div>
  )

  return (
    <div className='users-container'>
      <div className='users-section'>
        <h3 className='section-title'>Followers</h3>
        <div className='users-list'>
          {followers.map(user => renderUserCard(user))}
        </div>
      </div>

      <div className='users-section'>
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
      </div>
    </div>
  )
}

export default Users
