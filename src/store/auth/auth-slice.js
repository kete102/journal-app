/* El Slice es un parte del estado que contiene los reducers(que normalmente las acciones tienen
 el mismo nombre que los reducers). El slice tiene exporta las acciones que son las referencias
 a los reducers.El slice tiene también más campos del estado como el nombre del slice,
 y el estado inicial del estado. */
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', //'checking','not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const { login, logout, checkingCredentials } = authSlice.actions
