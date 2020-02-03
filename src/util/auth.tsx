import React from 'react'
import * as Facebook from 'expo-facebook'

import Constants from '../constants'
import firebase from './firebase'
import NavigationService from '../NavigationService'

export async function loginWithFacebook() {
  await Facebook.initializeAsync(Constants.FACEBOOK_APP_ID)

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile']
  })

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    // Sign in with credential from the Facebook user.
    return firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        // Handle Errors here.
      })
  }
}

export async function logout() {
  return firebase.auth().signOut()
}

interface AuthContextValue {
  userData?: Object
}

const DEFAULT_CONTEXT_VALUE: AuthContextValue = {}

export const AuthContext = React.createContext(DEFAULT_CONTEXT_VALUE)

export function useAuth() {
  const { userData } = React.useContext(AuthContext)
  const isLoggedIn = Boolean(userData)

  return { isLoggedIn, userData }
}

export function withAuth(WrappedComponent) {
  return function AuthStateObserverHOC(props) {
    const previousUserDataRef = React.useRef()
    const [userData, setUserData] = React.useState(undefined)

    React.useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(nextUserData => {
        if (nextUserData) {
          // Authenticated
          setUserData(nextUserData)
          return NavigationService.navigate('App')
        }

        // Logged out
        setUserData(undefined)
        if (previousUserDataRef.current && !nextUserData) {
          NavigationService.navigate('Auth')
        }
      })

      previousUserDataRef.current = userData

      return function cleanup() {
        unsubscribe()
      }
    }, [userData, setUserData])

    const ctxValue = React.useMemo(() => ({ userData }), [userData])

    return (
      <AuthContext.Provider value={ctxValue}>
        <WrappedComponent {...props} />
      </AuthContext.Provider>
    )
  }
}
