import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  useTheme,
} from '@mui/material'

import Form from './Form'
import Posts from './Posts/Posts'
import TagsInput from './TagsInput'
import Pagination from './Pagination'
import { getPostsBySearch } from '../actions/posts'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const theme = useTheme()

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      )
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          sx={{
            [theme.breakpoints.down('xs')]: { flexDirection: 'column-reverse' },
          }}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}>
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              sx={{
                borderRadius: 4,
                marginBottom: theme.spacing(2),
                display: 'flex',
                padding: theme.spacing(2),
              }}
              position='static'
              color='inherit'
              elevation={6}>
              <TextField
                sx={{ marginBottom: theme.spacing(1) }}
                name='search'
                variant='outlined'
                placeholder='Search Posts'
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TagsInput
                sx={{ marginBottom: theme.spacing(2) }}
                tags={tags}
                setTags={setTags}
                fullWidth
                variant='outlined'
                id='tags'
                name='tags'
                placeholder='Search Tags'
              />
              <Button variant='contained' color='primary' onClick={searchPost}>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper
                sx={{
                  borderRadius: 4,
                  marginTop: theme.spacing(2),
                  padding: theme.spacing(2),
                }}
                elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
