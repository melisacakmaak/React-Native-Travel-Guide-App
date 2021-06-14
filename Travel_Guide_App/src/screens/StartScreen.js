import React from 'react'
import Logo from '../components/Logo'
import { TouchableOpacity, Text, View } from 'react-native'

 
export default function StartScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: '#151515', flex: 1, justifyContent: 'center', alignItems: 'center' }} >

      <Logo />

      <Text style={{ margin: 5, fontSize: 60, shadowColor: 'white', shadowOffset: { width: 5, height: 3 }, shadowOpacity: 0.5, color: 'white', fontWeight: 'bold', letterSpacing: 8, textAlign: 'center' }}>Travel Guide App</Text>

      <Text style={{ margin: 5, fontSize: 15, color: 'white', fontWeight: '200', letterSpacing: 4, }}>
        Ready to explore new places?</Text>

      <View style={{ flexDirection: 'column', margin: 10, padding: 15, paddingHorizontal: 20, width: '95%' }}>

        <TouchableOpacity
          style={{ borderRadius: 5, backgroundColor: '#001233', bottom: 10, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '800', letterSpacing: 5, }}>
            LOGIN
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ borderRadius: 5, backgroundColor: '#154360', top: 5, height: 50, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '800', letterSpacing: 4, }}>
            SIGN UP
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  )
}
