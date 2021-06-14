import React from 'react'
import { ActivityIndicator } from 'react-native'
import firebase from 'firebase/app'
import Background from '../components/Background'
import { theme } from '../core/theme'



export default function AuthLoadingScreen({ navigation }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //set page as home screen if user is logged in
      navigation.reset({

        index: 0,
        routes: [{ name: 'Home' }],

      })
    } 
    else {
      // set page as login screen if no user is logged in
      navigation.reset({

        index: 0,
        routes: [{ name: 'Welcome' }],

      })
    }
  })


  return (
    <Background>

      <ActivityIndicator size="large" color={theme.colors.primary} />
      
    </Background>
  )
}
