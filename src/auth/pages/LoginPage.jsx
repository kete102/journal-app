import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import {
  startGoogleSignIn,
  startLoginWithEmailAndPassword
} from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { email, password, onInputChange, onFormReset } = useForm(formData)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    onFormReset()

    //Aqui hay que cambiar este dispatch por startLoginWithEmailAndPassword
    dispatch(startLoginWithEmailAndPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn'
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Email'
              type='email'
              placeholder='example@example.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid
            item
            sx={{ mt: 2 }}
            xs={12}
          >
            <TextField
              label='Password'
              type='password'
              placeholder='password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display={errorMessage ? '' : 'none'}
          >
            <Alert
              severity='error'
              sx={{ marginTop: 2 }}
            >
              {errorMessage}
            </Alert>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
                type='submit'
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='end'
          >
            <Link
              component={RouterLink}
              color='inherit'
              to='/auth/signup'
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
