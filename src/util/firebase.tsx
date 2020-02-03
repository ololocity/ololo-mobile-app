import * as firebase from 'firebase'

import Constants from '../constants'
import NavigationService from '../NavigationService'

const firebaseConfig = {
  apiKey: Constants.FIREBASE_API_KEY,
  authDomain: Constants.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.FIREBASE_DATABASE_URL,
  projectId: Constants.FIREBASE_PROJECT_ID,
  storageBucket: Constants.FIREBASE_STORAGE_BUCKET
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
