/* Los thunks son acciones que yo puedo hacer distpatch(disparar) pero que son async */

import { signInWithGoogle } from '../../firebase/providers'
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
