import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { signUpUser } from '../api/auth-api'
import Toast from '../components/Toast'
 


 
export default function RegisterScreen({ navigation }) {


  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [name, setName] = useState({ value: '', error: '' })


  const onSignUpPressed = async () => {
 
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    setLoading(true)
    
    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value,

    })

    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

 
  return (
    <Background>

      <Logo />

      <Text style={{ fontSize: 30, shadowColor: 'white', shadowOffset: { width: 5, height: 3 }, shadowOpacity: 0.5, color: 'white', fontWeight: '600', letterSpacing: 5, textAlign: 'center' }}>Create Account</Text>

      <TextInput
        label="Name and Surname"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>

      <View style={styles.row}>

        <Text style={styles.links}>Already have an account? </Text>

        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>

      </View>

      <Toast message={error} onDismiss={() => setError('')} />

    </Background>
  )
}
 
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'gray',
  },
  links: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})
