import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import firebase from 'firebase'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SettingsScreen,
} from './src/screens'
import HomeScreen from './src/pages/HomeScreen'
import SearchScreen from './src/pages/SearchScreen'
import ProfileScreen from './src/screens/ProfileScreen';
import 'firebase/firestore'
import { FIREBASE_CONFIG } from './src/core/config'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator()

if (!firebase.apps.length)
  firebase.initializeApp(FIREBASE_CONFIG);


export default function Apps() {

 
  return (
    <NavigationContainer >

      <Drawer.Navigator initialRouteName="App" drawerStyle={{ backgroundColor: '#262626', width: 210, }} drawerContentOptions={{
        activeTintColor: '#3466cb',
        inactiveTintColor: '#1f3d7a',
        labelStyle: {
          marginLeft: 7,
          letterSpacing: 0.5
        }
      }} >

        <Drawer.Screen name="Home" component={App} />
        <Drawer.Screen name="Profile" component={ProfileScreen}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />

      </Drawer.Navigator>

    </NavigationContainer>
  );
}


function App() {
  return (
    <Provider theme={theme}>

      <Stack.Navigator
        screenOptions={
          {
            headerTitleStyle: { fontSize: 22, fontWeight: '600', color: '#FFFFFF' },
            headerStyle: { backgroundColor: '#151515' }, headerBackTitle: 'Go back', backgroundColor: '#FFFFFF', headerBackTitleStyle: { color: '#FFFFFF' }
          }}
        initialRouteName="AuthLoadingScreen"
      >
        <Stack.Screen
          name="AuthLoadingScreen" options={{}} component={AuthLoadingScreen} />
        <Stack.Screen name="Welcome" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Search" component={SearchScreen} />

      </Stack.Navigator>

    </Provider>
  )
}

const Drawer = createDrawerNavigator();
