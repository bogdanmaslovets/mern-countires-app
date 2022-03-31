import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([post?.comments])
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const commentsRef = useRef()

  const handleComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`

    const newComments = await dispatch(commentPost(finalComment, post._id))

    setComment('')
    setComments(newComments)

    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          styles={{
            height: '200px',
            overflowY: 'auto',
            marginRight: '30px',
          }}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              <strong>{c.toString().split(': ')[0]}</strong>
              {c.toString().split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              variant='contained'
              color='primary'
              onClick={handleComment}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default CommentSection
