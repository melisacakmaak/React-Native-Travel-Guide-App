import React from 'react'
import {  Text, View,  Alert,} from 'react-native'
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase'
import 'firebase/firestore'

 
export class ChangePhoto extends React.Component {

     
    state = {
        image: null
    };

   
    componentDidMount() {
        this.getPermissionAsync()
    }


    // requesting permission from the user to access the gallery
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }


    // select photo from gallery and write selected photo to firebase firestore images collection
    _pickImage = async () => {
        const dbh = firebase.firestore();
        try {
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4, 4],
                quality: 0.3,
            });


            this.setState({ image })

            //Write the selected photo to the firestore with the id of the current user
            await dbh.collection("images").doc(firebase.auth().currentUser.uid).set({
                image: image.base64
            })

            Alert.alert("Successful", "Your profile picture has been changed!");
         

        } catch (E) {
            console.log(E);
        }
    }


    render() {

        let { image } = this.state;
       
        return (
            <View style={{ marginTop: 15, borderWidth: 3, borderTopStartRadius: 40, borderBottomEndRadius: 40, borderColor: '#5499C7', margin: 10, backgroundColor: "#1F1F1F" }}>
                <Text style={{ fontSize: 22, color: '#5499C7', marginHorizontal: 15, marginBottom: 10, margin: 15, textDecorationLine: 'underline', fontWeight: '400', borderColor: 'white', padding: 10 }}>
                    Photo
                </Text>
                <Button title="Change profile photo" onPress={this._pickImage} buttonStyle={{ margin: 15, marginHorizontal: 25, backgroundColor: '#5499C7' }} />   
            </View>
        )
    }

}

