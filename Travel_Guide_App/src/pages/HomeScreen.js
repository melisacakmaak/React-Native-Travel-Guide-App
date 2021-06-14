import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { logoutUser } from '../api/auth-api'


const {
  height,
  width
} = Dimensions.get('window')


function HomeScreen({ navigation }) {


  let randomImages = [

    require('../../yeni/7.png'),
    require('../../yeni/8.png'),
    require('../../yeni/9.png'),
    require('../../yeni/10.png'),
    require('../../yeni/11.png'),
    require('../../yeni/12.png'),
    require('../../yeni/13.png'),

  ]

  //definitions according to the categories the user wants to search
  const searchTypes = [
    { image: 'https://thumbs.gfycat.com/AgedNiceDeinonychus-size_restricted.gif', type: 'cafe', name: '       Cafes and Restaurants       ' },
    { image: 'https://en.dubaibonjour.com/wp-content/uploads/sites/4/2017/06/The-Meydan-Hotel-Rooms.gif', type: 'lodging', name: '                       Hotels                    ' },
    { image: 'https://i.pinimg.com/originals/a5/aa/27/a5aa27a463fa63a92338385efa8db669.gif', type: 'museum', name: '           Places to visit           ' },
  ]

  
  return (
    <View style={{ flex: 1, backgroundColor: '#151515' }}>


      <Image source={randomImages[Math.floor(Math.random() * randomImages.length)]}

        style={{ resizeMode: 'cover', margin: 20, marginHorizontal: 10, justifyContent: 'center', borderRadius: 40,borderBottomRightRadius:80,borderTopLeftRadius:80, height: '25%', width: '95%', borderWidth: 0.5, borderColor: '#C6C6E9', shadowColor: 'white' }} />

      <Text style={{ bottom: 10, top: 30, color: "#C4C4E8", fontSize: 42, fontWeight: "bold", textAlign: 'right', letterSpacing: 14, backgroundColor: "#2E2E2E", }}>
        Discover New Places</Text>

      <ScrollView pagingEnabled snapToOffsets={[0, width - 20, width * 2 - 40]} horizontal={true} style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {
            searchTypes.map((item, index) => {
              return (

                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Search', { type: item.type })}
                  style={{ margin: 10, bottom: -20, left: 10, borderRadius: 17, overflow: 'hidden', borderWidth: 0.5, borderColor: '#a3a3c2'}} >

                  <Image resizeMode='cover' style={{ height: 150 }} source={{ uri: item.image }} />

                  <View style={{ ...StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.53)', alignItems: 'center', justifyContent: 'center', }} >

                    <Text style={{ color: '#C4C4E8', backgroundColor: "#2E2E2E", fontWeight: '400', fontSize: 28, fontStyle: 'italic', alignItems: 'center', justifyContent: 'center', }} >
                      {item.name}
                    </Text>

                  </View>

                </TouchableOpacity>
              )
            })
          }
        </View>

      </ScrollView>

      <TouchableOpacity style={{ borderRadius: 150, borderColor: 'white', borderWidth: 1, justifyContent: 'center', alignItems: 'center', height: 50, width: 100, left: '70%', marginBottom: 20, backgroundColor: 'black' }} onPress={logoutUser}>

        <Text style={{ color: 'white', fontSize: 25 }}>Logout</Text>

      </TouchableOpacity>

    </View>
  );
}


const Stack = createStackNavigator();
export default HomeScreen;
