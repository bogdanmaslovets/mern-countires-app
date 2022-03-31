import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid, Typography } from '@mui/material'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading)
    return <Typography variant='h5'>No posts</Typography>

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
      container
      alignItems='stretch'
      spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
