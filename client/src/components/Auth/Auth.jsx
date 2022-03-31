import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  useTheme,
} from '@mui/material'
import { Lock } from '@mui/icons-material'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Input from './Input'
import Icon from './icon'
import { signin, signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const googleSuccess = async (res) => {
    const result = res?.porfileObj
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try Again Later')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper
        sx={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
        }}
        elevation={6}>
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.light,
          }}>
          <Lock />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form
          style={{ width: '100%', marginTop: '24px' }}
          onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            sx={{ margin: theme.spacing(3, 0, 2) }}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <Button
                sx={{ marginBottom: theme.spacing(2) }}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
