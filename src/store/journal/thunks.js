import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updatedNote,
  setPhotoToActiveNote
} from './journal-slice'
import { fileUpload, loadNotes } from '../../helpers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    //coloco la id de la nota para poder despachar la acción
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
    //dispatch(activeNote)
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!uid) throw new Error('Usuario inexistente')

    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSetActiveNote = ({ title, body, id, date, imageUrls }) => {
  return (dispatch) => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFirestore = { ...note }
    //Aquí hay que borrar esta id porque si no se crearí ana nueva entrada en firestore ya que esta
    //id es diferente a la id de la nota
    delete noteToFirestore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updatedNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    //await fileUpload(files[0])
    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotoToActiveNote(photosUrls))
  }
}
