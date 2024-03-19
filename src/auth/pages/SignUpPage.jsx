import { Button, Grid, TextField, Typography } from '@mui/material'
import { Link, Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export const SignUpPage = () => {
  return (
    <AuthLayout title='Sign Up'>
      <form>
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
              sm={6}
            >
              <Button
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
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
