import React from 'react'
import { Text } from 'react-native-paper'



export default function Paragraph(props) {
  return <Text style={{
    color: '#FFFFFF', fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 12,
    
  }} {...props} />
}


