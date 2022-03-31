import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  useTheme,
} from '@mui/material'

import { createPost, updatePost } from '../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()

  const user = JSON.parse(localStorage.getItem('profile'))

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  )

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
      clear()
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
      clear()
    }
  }

  const clear = () => {
    setCurrentId(0)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  if (!user?.result?.name) {
    return (
      <Paper sx={{ padding: theme.spacing(2) }} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own post and to like other's posts.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ padding: theme.spacing(2) }} elevation={6}>
      <form
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}>
        <Typography sx={{ marginBottom: theme.spacing(2) }} variant='h6'>
          {currentId ? `Editing "${post?.title}"` : 'Creating a Post'}
        </Typography>
        <TextField
          sx={{ marginBottom: theme.spacing(1) }}
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ marginBottom: theme.spacing(1) }}
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ marginBottom: theme.spacing(2) }}
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <Box sx={{ width: '97%', marginBottom: theme.spacing(2) }}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Box>
        <Button
          sx={{ marginBottom: theme.spacing(2) }}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth>
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
