import React from 'react'
import * as Facebook from 'expo-facebook'

import Constants from '../constants'
import firebase from './firebase'
import NavigationService from '../NavigationService'

const EMAIL_AUTH_REDIRECT_URL = 'https://app.ololo.kg/api/verify-email'

export async function loginWithFacebook() {
  await Facebook.initializeAsync(Constants.FACEBOOK_APP_ID)

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile', 'email']
  })

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    // Sign in with credential from the Facebook user.
    return firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        console.log({ error })
        // Handle Errors here.
      })
  }
}

export async function loginWithEmail(email: string) {
  const actionCodeSettings = {
    url: `${EMAIL_AUTH_REDIRECT_URL}?email=${email}`,
    handleCodeInApp: true
  }

  return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
}

export async function confirmEmailWithLink(
  email: string,
  link: string
): Promise<Object | undefined> {
  try {
    const credential = await firebase
      .auth()
      .signInWithEmailLink(String(email), link)

    return credential
  } catch (error) {
    // Common errors could be invalid email and invalid or expired OTPs.
    console.log(`Error verifying e-mail. Code: ${error.code}`)
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
  const isLoggedIn = firebase.auth().currentUser

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

          if (
            Array.isArray(nextUserData.providerData) &&
            nextUserData.providerData.length > 0
          ) {
            const { email } = nextUserData.providerData[0]

            if (email) {
              firebase.auth().currentUser.updateEmail(email)
            }
          }

          return NavigationService.navigate('App')
        }

        // Logged out
        setUserData(undefined)
        if (previousUserDataRef.current && !nextUserData) {
          // Handle logout event somehow in the future
        }
      })

      previousUserDataRef.current = userData

      return function cleanup() {
        unsubscribe()
      }
    }, [userData])

    const ctxValue = React.useMemo(() => ({ userData }), [userData])

    return (
      <AuthContext.Provider value={ctxValue}>
        <WrappedComponent {...props} />
      </AuthContext.Provider>
    )
  }
}
