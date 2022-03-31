import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
  useTheme,
} from '@mui/material'

import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'

const PostDetails = () => {
  const { post, posts } = useSelector((state) => state.posts)
  const isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const theme = useTheme()

  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post])

  if (!post) return null

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  const openPost = (_id) => {
    navigate(`/posts/${post._id}`)
  }

  if (isLoading) {
    return (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(2),
          borderRadius: '15px',
          height: '39vh',
        }}
        elevation={6}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }

  return (
    <Paper
      sx={{ padding: theme.spacing(2), borderRadius: '15px' }}
      elevation={6}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
          },
        }}>
        <div style={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>Created by: {post.name}</Typography>
          <Typography variant='body1'>
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider sx={{ margin: theme.spacing(2, 0) }} />
          <CommentSection post={post} />
          <Divider sx={{ margin: theme.spacing(2, 0) }} />
        </div>
        <Box
          sx={{
            marginLeft: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
              marginLeft: 0,
            },
          }}>
          <img
            style={{
              borderRadius: '20px',
              objectFit: 'cover',
              width: '100%',
              maxHeight: '350px',
            }}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </Box>
      </Box>
      {!!recommendedPosts.length && (
        <div style={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: '20px', cursor: 'pointer' }}
                  onClick={() => openPost(_id)}
                  key={_id}>
                  <Typography gutterBottom variant='h6'>
                    {title}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {message}
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    width='200px'
                    alt='recommended-post'
                  />
                </div>
              )
            )}
          </Box>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails
