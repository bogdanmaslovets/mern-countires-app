import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import {
  AppBar,
  Box,
  Avatar,
  Typography,
  Toolbar,
  Button,
  useTheme,
} from '@mui/material'
import { deepPurple } from '@mui/material/colors'

import countriesLogo from '../images/countriesLogo.png'
import countriesText from '../images/countriesText.png'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const theme = useTheme()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })

    navigate('/auth')

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: theme.spacing(4, 0),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 6),
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          padding: theme.spacing(1),
        },
      }}
      position='static'
      color='inherit'>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={countriesText} alt='icon' height='45px' />
        <img
          style={{ marginLeft: '10px', marginTop: '5px' }}
          src={countriesLogo}
          alt='posts'
          height='50'
        />
      </Link>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
          [theme.breakpoints.down('sm')]: {
            width: 'auto',
          },
        }}>
        {user?.result ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
              alignItems: 'center',
              [theme.breakpoints.down('md')]: {
                padding: theme.spacing(0, 2),
              },
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
                marginTop: theme.spacing(2),
              },
            }}>
            <Avatar
              sx={{
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
                marginLeft: theme.spacing(8),
                [theme.breakpoints.down('md')]: {
                  margin: theme.spacing(0, 2),
                },
              }}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}>
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
              variant='h6'>
              {user?.result?.name}
            </Typography>
            <Button
              sx={{
                marginLeft: theme.spacing(2),
                [theme.breakpoints.down('md')]: {
                  margin: theme.spacing(0, 2),
                },
              }}
              variant='contained'
              color='secondary'
              onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              [theme.breakpoints.down('md')]: {
                marginRight: theme.spacing(20),
              },

              [theme.breakpoints.down('sm')]: {
                marginRight: 0,
              },
            }}
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
