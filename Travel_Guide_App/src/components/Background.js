import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'



export default function Background({ children }) {
  return (
    <ImageBackground
      source={{uri:'https://www.colorhexa.com/151515.png'}}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 5,
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
