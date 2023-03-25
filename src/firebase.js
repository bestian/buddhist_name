import { initializeApp } from 'firebase/app'
import { getDatabase, ref as dbRef } from 'firebase/database'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDUWQtzKCOx4KmX1jwr906iIxXRsWYdiew",
  authDomain: "number-59440.firebaseapp.com",
  databaseURL: "https://number-59440-default-rtdb.firebaseio.com/",
  projectId: "number-59440",
  storageBucket: "number-59440.appspot.com",
  messagingSenderId: "660427551486",
  appId: "1:660427551486:web:6cdfd5f3fd21453805ebaf",
  measurementId: "G-RNS3WHY858"
})

// used for the databas refs
export const db  = getDatabase(firebaseApp)

// here we can export reusable database references
export const namesRef = dbRef(db, 'names')