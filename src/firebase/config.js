import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDDJg6GIxWYoLx4_mVvGS5q826OJyinSDg",
    authDomain: "cooking-ninja-site-77b7c.firebaseapp.com",
    projectId: "cooking-ninja-site-77b7c",
    storageBucket: "cooking-ninja-site-77b7c.appspot.com",
    messagingSenderId: "937195028351",
    appId: "1:937195028351:web:62061cfe9c14f4e078e44a"
  };

  //init firebase

  firebase.initializeApp(firebaseConfig)

  //init services

  const projectFirestore =firebase.firestore()

  export {projectFirestore}