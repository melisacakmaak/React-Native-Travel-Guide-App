import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'


export default function Header(props) {
  return <Text style={styles.header} {...props} />
}


const styles = StyleSheet.create({
  header: {
    fontSize: 55,
    color: '#FFFFFF',
    fontWeight: '800',
    paddingVertical: 15,
    letterSpacing: 10,
    textAlign:'center',
    shadowColor:'gray',
    shadowOpacity:1,
    shadowOffset:{
      height:4,width:4
    }
    
  },
})
