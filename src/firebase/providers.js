import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    //const credentials = GoogleAuthProvider.credentialFromResult(result)

    const { displayName, email, photoURL, uid } = result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const registerWithEmailAndPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const { uid, photoURL } = resp.user
    updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid,
      photoURL,
      displayName
    }
  } catch (error) {
    /* Aquí es dónde se puede evaluar el error code para un mejor manejo de errores de auth */
    return { ok: false, errorMessage: error.message }
  }
}
