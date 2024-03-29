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

    clearNotesLogout: (state) => {
      state.notes = []
      state.isSaving = false
      state.active = null
      state.messageSaved = ''
    },
    setPhotoToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload]
      state.isSaving = false
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
      state.active = null
    }
  }
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
  setPhotoToActiveNote,
  savingNewNote,
  updatedNote
} = journalSlice.actions
