import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { ImagesGalery } from '../components'
import { useMemo } from 'react'
export const NoteView = () => {
  const { active: note } = useSelector((state) => state.journal)

  const { body, title, date, onInputChange } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString().slice(0, 16)
  }, [date])

  return (
    <Grid
      className='animate__animated animate__fadeIn'
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
          {dateString}
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
          value={title}
          name='title'
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder={`What's up?`}
          minRows={5}
          multiline
          value={body}
          name='body'
          onChange={onInputChange}
        />
      </Grid>
      <ImagesGalery />
    </Grid>
  )
}
