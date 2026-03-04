import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [followers, setFollowers] = useState()
    const [following, setFollowing] = useState()

  return (
    <UserContext.Provider value={{followers, setFollowers, following, setFollowing}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider