import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCwn7ckqqfzQIJlwzAK07YATtnrzKwEs4Q',
    authDomain: 'rc-dis.firebaseapp.com',
    projectId: 'rc-dis',
    storageBucket: 'rc-dis.appspot.com',
    messagingSenderId: '86187793860',
    appId: '1:86187793860:web:3cdacb1d9489a5c2731891',
    measurementId: 'G-Y9RB70SJSF',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
