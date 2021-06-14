import React, { useState, useRef } from 'react'
import { Animated, View, Text,Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView,  } from 'react-native';
import firebase from 'firebase'
import 'firebase/auth'
import { LinearGradient } from "expo-linear-gradient";
import GoogleApi from '../../GoogleMapAPI'
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { LogBox } from 'react-native';

//Ignore this error to avoid an error if the user does not have a defined profile photo
LogBox.ignoreLogs(['undefined is not an object']);

 
const {
    height,
    width
} = Dimensions.get('window')

export default function ProfileScreen() {

     
    const HEIGHT_IMAGE = 250
    const IMAGE_SIZE = 112

    const scrollY = new Animated.Value(0)

    //Get the current logged in user's name and email to print on the profile screen
    const {
        displayName,
        email
    } = firebase.auth().currentUser


    //capitalize the first and last letters of the current user
    const formatName = (name) => name.split(' ').map((word, index) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

     
    const scale = scrollY.interpolate({
        inputRange: [-HEIGHT_IMAGE, 0],
        outputRange: [2, 1]
    })

  
    const _height = scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [HEIGHT_IMAGE, HEIGHT_IMAGE - 1]
    })


    const [placeList, setplaceList] = useState([])
    const [favoriteList, setFavoriteList] = useState([])
    const [profileImg, setProfileImg] = useState(null)

    useFocusEffect(
        React.useCallback(() => {
            getProfileImg()
            getFavorites()
            getPlaces()
        }, [])
    );

    //set user's profile photo
    let imageUri = (profileImg) => profileImg ? `data:image/jpg;base64,${profileImg}` : null;

    //connect to firebase firestore, read profile photo of current user's id from images collection
    const getProfileImg = async () => {
        const dbh = firebase.firestore();

        const {
            uid
        } = firebase.auth().currentUser
        var image = await dbh.collection("images").doc(uid).get()
        setProfileImg(image.data().image)
    }

   /*
     connect to firebase firestore from places_ collection
     Get location data from last viewed collection by id of current user
     add data to placeslist
     */
    const getPlaces = async () => {
        const dbh = firebase.firestore();

        const {
            uid
        } = firebase.auth().currentUser
        var places = await dbh.collection("places_" + uid).get()

        setplaceList(places.docs.map(doc => doc.data()))
    }

    /*
     connect to firebase firestore from placess_ collection
     Get location data from favorite places collection by id of current user
     add data to placeslist
     */
    const getFavorites = async () => {
        const dbh = firebase.firestore();

        const {
            uid
        } = firebase.auth().currentUser
        var places = await dbh.collection("placess_" + uid).get()

        setFavoriteList(places.docs.map(doc => doc.data()))
    }

  
    return (
        <Animated.ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            style={{ backgroundColor: '#151515' }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: { y: scrollY },
                        },
                    },
                ], {
                useNativeDriver: false
            }
            )}>


            <Animated.View style={{ position: 'absolute', left: 0, right: 0 }} >
                <Animated.View style={{ transform: [{ translateY: scrollY }] }} >

                    <Animated.Image
                        style={{ height: _height }}
                        source={{
                            uri:
                                "https://placeimg.com/640/480/arch/grayscale"
                        }}
                    />

                    <LinearGradient
                        colors={[
                            "rgba(0,0,0,0.3)", "rgba(0,0,0,.85)"
                        ]}
                        style={{ ...StyleSheet.absoluteFill }} />


                </Animated.View>
            </Animated.View>

            <View style={{ paddingTop: HEIGHT_IMAGE, marginBottom: IMAGE_SIZE / 2.7 }} >

                <View>
                    <View style={{ position: 'absolute', left: 10, top: -IMAGE_SIZE / 2.7, borderColor: '#afafaf', borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden', borderRadius: IMAGE_SIZE / 2, height: IMAGE_SIZE, width: IMAGE_SIZE }} >
                        <Image style={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} source={{ uri: imageUri(profileImg) }} />
                    </View>
                    <View style={{ marginLeft: IMAGE_SIZE + 10 + 10, flex: 1, marginTop: 10 }} >
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }} >{formatName(displayName)}</Text>
                        <Text style={{ fontWeight: '200', fontSize: 16, color: 'white' }} >{email}</Text>
                    </View>
                </View>

            </View>

            <Tabs >

                <View style={{ width }} >
                    {
                        CardList({ list: favoriteList })
                    }
                </View>
                <View style={{ width }} >
                    {
                        CardList({ list: placeList })
                    }
                </View>

            </Tabs>

        </Animated.ScrollView>
    )
}

 
const Tabs = ({ children }) => {

    const _scrollView = useRef(null)

    const _Tabs = ["FAVORITE PLACES", "LAST VIEWED PLACES"]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const _selected = new Animated.Value(0)

    const onPress = (index) => {
        _scrollView.current.scrollTo({ x: index * width })
        Animated.timing(_selected,
            {
                toValue: index,
                duration: 250,
                useNativeDriver: true
            }).start()
    }

    return (
        <View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                {
                    _Tabs.map((item, index) => {

                        const opacity = _selected.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3]
                        })

                        const scale = opacity.interpolate({
                            inputRange: [0.3, 1],
                            outputRange: [0.7, 1]
                        })

                        return (
                            <TouchableOpacity key={"tab_" + index.toString()} style={{ padding: 10, marginLeft: index == 0 ? 10 : 0 }} onPress={() => onPress(index)}>
                                <Animated.Text key={index} style={{ color: 'white', opacity, fontSize: 20, transform: [{ scale }, { translateX: index == 1 ? -25 : 0 }] }} >
                                    {item}
                                </Animated.Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
            <ScrollView
                ref={_scrollView}
                horizontal
                scrollEnabled={false}
                pagingEnabled>
                {
                    children
                }
            </ScrollView>
        </View>
    )
}

 
const CardList = ({ list }) => {
    return (
        list.map((item, index) => {

            const {
                name,
                rating,
                vicinity,
                place_id,


            } = item

            return (
                <View key={place_id} style={{ height: 100, marginBottom: 20, backgroundColor: '#1f1f1f', marginHorizontal: 20, borderRadius: 10, overflow: 'hidden', flexDirection: 'row' }}>
                    <Image source={{ uri: item.photos ? GoogleApi.geturlpath({ photo_ref: item.photos[0].photo_reference }) : null }} style={{ height: 100, width: 90 }} />
                    <View style={{ margin: 10, marginVertical: 5, flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'flex-start' }} >

                            <Text style={{ color: 'whitesmoke', fontWeight: '200', fontSize: 18, flex: 1, marginRight: 5 }}>
                                {name.toUpperCase()}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <FontAwesome name="star" size={24} color="#de935f" />
                                <Text style={{ color: '#de935f', paddingLeft: 5 }} >
                                    {rating}
                                </Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="location" size={16} color="#179ff4" />
                            <Text style={{ color: 'gray', paddingLeft: 10, flex: 1 }} >
                                {vicinity}
                            </Text>
                        </View>
                    </View>
                </View>

            )
        })
    )
}