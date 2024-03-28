import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    /* active: {
      id: 1,
      title: '',
      body: '',
      date: '',
      imageUrls: [] // [url, url, url]
    } */
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true

      //TODO: error message
      state.messageSaved = ''
    },
    updatedNote: (state, { payload }) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload
        }
        return note
      })

      //TODO: mostrar mensaje de update
      state.messageSaved = `Nota actualizada correctamente`
    },
    deleteNoteById: (state, action) => {}
  }
})

export const {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  savingNewNote
} = journalSlice.actions
