import React from 'react'
import '../../shared/nav.scss'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        <div className="left">
            <h1>ConnectHub</h1>
        </div>
        <div className="right">
            <Link  className='create-post' to={'/create-post'} >Create Post</Link>
        </div>
    </nav>
  )
}

export default Nav