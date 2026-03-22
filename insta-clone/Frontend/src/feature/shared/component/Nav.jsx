import React from 'react'
import '../../shared/nav.scss'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'


const Nav = () => {

    const {handleLogout} = useAuth()
    const handleLogoutClick = () => {
        handleLogout()
    }


  const location = useLocation()
  
  return (
    <>
      <nav className="top-nav">
          <div className="left">
              <Link className='connect-hub' id='logo' to={'/feed'}><h1>ConnectHub</h1></Link>
          </div>
          <div className="right">
              <Link className='create-post' to={'/create-post'} >Create Post</Link>
              <button onClick={handleLogoutClick} className='logout'>Logout</button>
          </div>
      </nav>

      <div className="mobile-bottom-nav">
          <Link to={'/feed'} className={location.pathname === '/feed' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path></svg>  
          </Link>
          <Link to={'/create-post'} className={location.pathname === '/create-post' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
          </Link>
          <Link to={'/network'} className={location.pathname === '/network' ? 'active' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V22H4V14.252C4 13.1118 4.77561 12.1264 5.86738 11.908L8.68112 11.3453C9.431 11.1953 10.1554 11.8385 10.1554 12.603V13H10.5186C10.7441 12.5539 11.1623 12.2355 11.666 12.1348L14 11.668V10C14 8.34315 15.3431 7 17 7C18.6569 7 20 8.34315 20 10V11.2356L22.618 11.7593C23.4158 11.9188 24 12.6133 24 13.427V22H16V17.062L14.7394 15.8014L14 14.252ZM12 14.232H11.8446C11.3789 14.232 11 14.6109 11 15.0766V20H6V14.0754L8.28682 14.5328C8.80231 14.6358 9.30909 14.1843 9.30909 13.6593V11C9.30909 10.4286 8.92213 9.93247 8.35821 9.81969L6.15175 9.37841C5.4668 9.24141 5 8.64168 5 7.94273V6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V11.1923L12 11.0923V14.232ZM18 13.6193V11C18 10.4286 17.613 9.93247 17.0491 9.81969L14.8427 9.37841C14.1577 9.24141 13.6909 8.64168 13.6909 7.94273V6.20864L14 6.23964V10L16 10.4V14.5328L18 14.9328V20H22V13.8016L19.7895 13.3596L18 13.6193ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8ZM17 6C17.5523 6 18 5.55228 18 5C18 4.44772 17.5523 4 17 4C16.4477 4 16 4.44772 16 5C16 5.55228 16.4477 6 17 6Z"></path></svg>
          </Link>
      </div>
    </>
  )
}

export default Nav