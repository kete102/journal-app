import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImagesGalery } from '../components'

export const NoteView = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography
          fontSize={39}
          fontWeight='light'
        >
          March 17, 2024
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color='primary'
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder={`What's up?`}
          minRows={5}
          multiline
        />
      </Grid>
      {/* Images Galery */}
      <ImagesGalery />
    </Grid>
  )
}
