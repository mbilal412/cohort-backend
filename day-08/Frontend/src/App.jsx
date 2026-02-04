import { useState } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })

  return (
   <>
        <div className="all-notes">
          
          {notes.map(n=>{
            return <div className="note">
            <div className="title">{n.title}</div>
            <div className="desc">{n.description}</div>
          </div>
          })}
        </div>
   </>
  )
}

export default App
