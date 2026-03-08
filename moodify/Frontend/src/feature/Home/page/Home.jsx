import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../Components/Player'
import { useSong } from '../hooks/useSong'


const Home = () => {
  const { handleGetSong } = useSong()
  return (
    <>
      <FaceExpression
        onClick={(mood) => { handleGetSong({ mood }) }}
      />
      <Player />
    </>
  )
}

export default Home