import React from 'react'
import { Image, StyleSheet } from 'react-native'



export default function Logo() {
  return <Image source={require('../../images/landscape.png')} style={styles.image} />
}


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
    shadowColor:'black',
    shadowOpacity:0.3,
    shadowOffset:{
      width:5,
      height:4
    }
  },
})
