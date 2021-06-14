import React from 'react'
import { TouchableOpacity, Text, View,  } from 'react-native'
import { ChangePasswordScreens } from './ChangePasswordScreens';
import { ChangePhoto } from './ChangePhoto';

 
export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#151515', }}>

      <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5, marginHorizontal: 5, }}>

        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Profile' }], })} style={{}}>
          <Text style={{ fontSize: 22, alignItems: 'center', justifyContent: 'center', color: '#008CBA', fontWeight: '500' }}>
            {" < Profile"}
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 25, alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
          Settings
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{}} >
          <Text style={{ fontSize: 22, alignItems: 'center', justifyContent: 'center', color: '#008CBA', fontWeight: '500' }}>
            {"Home > "}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 2, margin: 10, }}>

        <ChangePasswordScreens />

        <ChangePhoto />

      </View>

    </View>

  )
}
