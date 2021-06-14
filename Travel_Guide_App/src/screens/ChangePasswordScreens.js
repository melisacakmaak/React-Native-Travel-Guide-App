import React from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import { Text, View, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements';


export class ChangePasswordScreens extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
        };
    }

    /*
       get current user information
       get current user's current password
    */
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

   //update user's new password
    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Successful", "Password was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
    }



    render() {
     
        return (
            <View style={{ marginBottom: 15, borderWidth: 3, borderColor: '#a3a3c2', borderTopEndRadius: 50, borderBottomStartRadius: 50, margin: 10, backgroundColor: "#1F1F1F" }}>
                <Text style={{ fontSize: 22, color: '#a3a3c2', marginHorizontal: 15, marginBottom: 10, margin: 15, textDecorationLine: 'underline', fontWeight: '400', borderColor: 'white', padding: 10 }}>
                    Password
                </Text>
                <TextInput style={{ marginHorizontal: 10, borderBottomWidth: 1, borderColor: "#a3a3c2", marginVertical: 10, padding: 10, height: 40, alignSelf: "stretch", fontSize: 18, color: '#FFFFFF' }} value={this.state.currentPassword}
                    placeholder="Current Password" placeholderTextColor="#a3a3c2" autoCapitalize="none" secureTextEntry={true}
                    onChangeText={(text) => { this.setState({ currentPassword: text }) }} />
                <TextInput style={{ marginHorizontal: 10, borderBottomWidth: 1, borderColor: "#a3a3c2", marginVertical: 10, padding: 10, height: 40, alignSelf: "stretch", fontSize: 18, color: '#FFFFFF' }} value={this.state.newPassword}
                    placeholder="New Password" placeholderTextColor="#a3a3c2" autoCapitalize="none" secureTextEntry={true}
                    onChangeText={(text) => { this.setState({ newPassword: text }) }} />
                <Button title="Change Password" type="outline" onPress={this.onChangePasswordPress}
                    buttonStyle={{ borderColor: '#a3a3c2', borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, marginHorizontal: 25, backgroundColor: '#a3a3c2' }} titleStyle={{ color: '#FFFFFF' }} />

            </View>
        )
    }


}

