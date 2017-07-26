import { initializeApp, SDK_VERSION } from 'firebase'

export { SDK_VERSION as VERSION }

const app = initializeApp({
  apiKey: 'AIzaSyAdzQCzswmZnc1c6SqpPltlw7Zu5z_xKxQ',
  authDomain: 'nobacon-227bb.firebaseapp.com',
  databaseURL: 'https://nobacon-227bb.firebaseio.com',
  projectId: 'nobacon-227bb',
  storageBucket: 'nobacon-227bb.appspot.com',
  messagingSenderId: '605173431243'
})

export default app
