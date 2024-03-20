import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { Link, Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { useMemo, useState } from 'react'
import { startEmailAndPasswordSignIn } from '../../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Invalid email address'],
  password: [
    (value) => value.length >= 6,
    'Password must be at least 6 characters'
  ],
  displayName: [(value) => value.length >= 1, 'Display name is required']
}

export const SignUpPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  )

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    email,
    password,
    onInputChange,
    onFormReset,
    displayName,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startEmailAndPasswordSignIn(formState))
  }
  return (
    <AuthLayout title='Sign Up'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Full Name'
              type='text'
              placeholder='John Doe'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Email'
              type='email'
              placeholder='johndoe@gmail.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2 }}
          >
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
              item
              xs={12}
            >
              <Button
                disabled={isCheckingAuthentication}
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
                type='submit'
              >
                Create new account
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            ></Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='end'
          >
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link
              component={RouterLink}
              color='inherit'
              to='/auth/login'
            >
              Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
