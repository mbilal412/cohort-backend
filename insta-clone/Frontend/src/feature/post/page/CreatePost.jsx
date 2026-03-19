import React from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../shared/component/Nav'

const CreatePost = () => {
    const navigate = useNavigate()
    const [selectedPost, setSelectedPost] = useState('')
    const [caption, setCaption] = useState('')
    const postImageInputRef = useRef()
    const postImage = postImageInputRef.current?.files[0]

    const { handleCreatePost } = usePost()

    const handlePost = async (e) => {
        e.preventDefault()
        try {
            await handleCreatePost(caption, postImage)
            navigate('/feed')
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setCaption('')
        }
    }


    return (

        <main id='create-post-main'>
            <Nav />
            <div className='create-post-container'>
                <form onSubmit={handlePost} className='create-post-form'>
                    <textarea
                        required
                        onChange={(e) => setCaption(e.target.value)}
                        className='post-caption'
                        placeholder='Write your caption here...'
                        rows='4'
                        value={caption}
                    ></textarea>

                    <div className='file-input-wrapper'>
                        <input
                            required
                            onChange={(e) => setSelectedPost(e.target.files[0].name)}
                            ref={postImageInputRef}
                            hidden
                            type='file'
                            id='post-image'
                            className='post-file-input'
                            accept='image/*'
                        />
                        <label htmlFor='post-image' className='file-label'>
                            {selectedPost ? `${selectedPost}` : `Select Image`}
                        </label>
                    </div>

                    <button type='submit' className='post-submit-btn'>
                        Create Post
                    </button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost