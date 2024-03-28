/* Los thunks son acciones que yo puedo hacer distpatch(disparar) pero que son async */

import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerWithEmailAndPassword,
  signInWithGoogle
} from '../../firebase/providers'
import { checkingCredentials, login, logout } from './auth-slice'

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()

    if (!result.ok) {
      dispatch(logout(result.errorMessage))
    }
    dispatch(login(result))
  }
}

export const startRegisterEmailAndPassword = ({
  email,
  password,
  displayName
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } =
      await registerWithEmailAndPassword({
        email,
        password,
        displayName
      })

    if (!ok) {
      return dispatch(logout({ errorMessage }))
    }
    dispatch(login({ uid, photoURL, displayName, email }))
  }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, displayName, photoURL, uid, errorMessage } =
      await loginWithEmailAndPassword({ email, password })

    if (!ok) {
      return dispatch(logout({ errorMessage }))
    }

    return dispatch(login({ displayName, email, photoURL, uid }))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout({}))
  }
}
