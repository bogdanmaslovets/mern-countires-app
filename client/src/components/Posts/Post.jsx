import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  ButtonBase,
  useTheme,
} from '@mui/material'
import {
  ThumbUpAlt,
  ThumbUpOffAlt,
  Delete,
  MoreHoriz,
} from '@mui/icons-material'

import { deletePost, likePost } from '../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [likes, setLikes] = useState(post?.likes)
  const theme = useTheme()

  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = post.likes.find((like) => like === userId)

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize='small' /> &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like ${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpOffAlt fontSize='small' /> &nbsp;{likes.length}{' '}
          {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return (
      <>
        <ThumbUpOffAlt fontSize='small' /> &nbsp;Like
      </>
    )
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.up('lg')]: {
          height: '500px',
        },
      }}
      raised
      elevation={6}>
      <ButtonBase
        style={{ display: 'block', textAlign: 'initial' }}
        component='span'
        name='test'
        onClick={openPost}>
        <CardMedia
          style={{
            height: 0,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
          }}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'white',
          }}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'white',
            }}>
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={(e) => {
                e.stopPropagation()
                setCurrentId(post._id)
              }}>
              <MoreHoriz fontSize='medium' />
            </Button>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px',
          }}>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          sx={{ padding: theme.spacing(0, 2) }}
          variant='h5'
          component='h2'
          gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        style={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => dispatch(deletePost(post._id))}>
            <Delete fontSize='small' color='secondary' />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
