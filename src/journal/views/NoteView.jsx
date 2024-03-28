/* eslint-disable react-hooks/exhaustive-deps */
import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journal-slice'
import { startSaveNote } from '../../store/journal/thunks'
import { ImagesGalery } from '../components'

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving
  } = useSelector((state) => state.journal)

  const dispatch = useDispatch()
  const { body, title, date, onInputChange, formState } = useForm(note)
  const fileInputRef = useRef()
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString().slice(0, 16)
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Toastify({
        text: messageSaved,
        duration: 2000,
        newWindow: true,
        gravity: 'bottom',
        position: 'left',
        stopOnFocus: true,
        onClick: () => Toastify.hideAll()
      }).showToast()
    }
  }, [messageSaved])

  const saveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = (e) => {
    if (e.target.files === 0) return

    //dispatch(startUploadingFiles(target.files))
    console.log(e.target.files)
  }

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
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={saveNote}
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
