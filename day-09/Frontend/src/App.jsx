import { useState, useEffect } from "react"
import axios from 'axios'


function App() {
  const [notes, setNotes] = useState([])
  const [toggleForm, setToggleForm] = useState(false)
  const [activeID, setActiveID] = useState(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function displayForm(id = null) {
    setToggleForm(true)
    setActiveID(id)
    setTitle((notes.find(n => n._id === id))?.title || "")
    setDescription((notes.find(n => n._id === id))?.description || "")

  }

  function closeForm() {
    setToggleForm(false)
    setActiveID(null)
  }

  function fetchNotes() {
    axios.get('https://cohort-backend-ykgt.onrender.com/api/notes')
      .then(res => {
        setNotes(res.data.note)
      })


  }
  useEffect(() => {
    fetchNotes()
  }, [])



  function createNote(e) {
    e.preventDefault()
    const { title, description } = e.target.elements

    axios.post('https://cohort-backend-ykgt.onrender.com/api/notes', { title: title.value, description: description.value })
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })

  }


  function deleteNote(id) {
    axios.delete(`https://cohort-backend-ykgt.onrender.com/api/notes/${id}`)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
      })
  }

  function updateNote(e) {
    e.preventDefault()
    const { updateTitle, updateDescription } = e.target.elements
    axios.patch(`https://cohort-backend-ykgt.onrender.com/api/notes/${activeID}`, { title: updateTitle.value, description: updateDescription.value })
      .then(res => {
        console.log(res.data)
        closeForm()
        fetchNotes()
      })
  }

  function changeTitle(e) {
    setTitle(e.target.value)
  }

  function changeDescription(e) {
    setDescription(e.target.value)
  }


  return (
    <>

      {toggleForm && <div className="update-note">
        <div onClick={closeForm} className="full-screen"></div>
        <form className='note-update-form' onSubmit={updateNote} >
          <input value={title} className="update-title" name='updateTitle' type="text" placeholder='Enter title' required onChange={changeTitle} />
          <input value={description} className="update-desc" name='updateDescription' type="text" placeholder='Enter description' required onChange={changeDescription} />
          <button >Update note</button>
        </form>
      </div>}

      <form className='note-create-form' onSubmit={createNote} >
        <input name='title' type="text" placeholder='Enter title' required />
        <input name='description' type="text" placeholder='Enter description' required />
        <button>Create note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="buttons">
                <button className="delete" onClick={() => {
                  deleteNote(note._id)
                }}>Delete
                </button>

                <button onClick={() => { displayForm(note._id) }} className="edit">Edit</button>
              </div>

            </div>
          })
        }
      </div>
    </>
  )
}

export default App
