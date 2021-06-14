import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GoogleApi from '../../GoogleMapAPI'
import * as Location from 'expo-location'
import firebase from 'firebase'



export default function HotelScreen({ navigation, route }) {

  const { type } = route.params
  const [searchKey, setSearchKey] = useState('')
  const [data, setData] = useState(null)

  //set to location information
  const region = {
    lat: 41.0087,
    lon: 29.0173,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [source, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {

    (async () => {

      // get permission from user for location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      // get current location from user
      let location = await Location.getCurrentPositionAsync({ accuracy: 1 });

      //set location with setLocation
      setLocation(location);

    })();
  }, [])


  useEffect(() => {


    let _region = {
      ...region
    }

    /*
     if location is taken, update initial location information with current location
     search according to the category selected by the user on the home screen,
     set the radius to search on the map
     */
    if (location) {
      _region =
      {
        ..._region, lat: location.coords.latitude,
        lon: location.coords.longitude
      }
    }

    GoogleApi.nearbysearch(
      {
        keyword: searchKey,
        ..._region,
        radius: 10000,
        type
      }).then(result => {
        setData(result)
      })
  }, [searchKey, location])


  const checkRenderImages = data && (data.results[selected]?.photos)

  /*
   if the user presses the marker button
   get id of current user
   With that id, write the place information in the firestore in the places_, that is, the places viewed collection.
   */
  useEffect(() => {
    if (data) {
      const {
        uid
      } = firebase.auth().currentUser

      const dbh = firebase.firestore();
      dbh.collection("places_" + uid).doc(data.results[selected].place_id).set({
        ...data.results[selected]
      })
    }
  }, [selected])

  /*
    if the user presses the marker button
    get id of current user
    With that id, write the place information in the firestore in the places_, that is, the favorite places collection.
    */
  const Like = async () => {

    if (data) {
      const {
        uid
      } = firebase.auth().currentUser

      const dbh = firebase.firestore();
      dbh.collection("placess_" + uid).doc(data.results[selected].place_id).set({
        ...data.results[selected]
      })
    }
  }

  return (

    <View style={{ flex: 1 }} >

      {location &&

        <MapView

          provider={PROVIDER_GOOGLE}
          customMapStyle={mapDarkStyle}
          region={{ ...region, ...location.coords }}
          style={StyleSheet.absoluteFill}
          showsUserLocation
          initialRegion={{ ...region, ...location.coords }} >

          {
            data && data.results.map((item, index) => <CustomMarker onChangeIndex={(index) => setSelected(index)} item={item} index={index} key={item.place_id} />)

          }

        </MapView>
      }

      <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', margin: 20, borderWidth: 2, borderColor: '#afafaf', borderRadius: 20 }} >

        <TextInput placeholder='Arama Yap' placeholderTextColor='#FFFFFF' style={{ flex: 1, padding: 20, fontWeight: 'bold', fontSize: 16, color: '#FFFFFF' }}
          value={searchKey} onChangeText={setSearchKey} />

      </View>

      {checkRenderImages &&

        <View style={{
          position: 'absolute', left: 10, right: 10, bottom: 20, padding: 0, flexDirection: 'row',
          backgroundColor: 'rgba(60, 60, 60,0.6)', borderRadius: 40
        }} >

          <Image style={{ height: 150, width: 150, resizeMode: 'cover', backgroundColor: 'white', borderRadius: 40, borderWidth: 3, borderColor: 'rgba(0,0,0,0.4)' }}

            source={{ uri: GoogleApi.geturlpath({ photo_ref: data.results[selected].photos[0].photo_reference }) }} />

          <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', bottom: 2 }}>

            <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 27, color: 'white', textShadowColor: 'black', textShadowRadius: 20, textAlign: 'center' }} >

              {data.results[selected].name}{"  "}

              <Image

                style={{ height: 35, width: 35, borderRadius: 5, resizeMode: 'center', backgroundColor: 'white' }}
                source={{ uri: GoogleApi.getIcon({ ico: data.results[selected].icon }) }} />

            </Text>

            <Text style={{ fontWeight: '500', top: 15, fontStyle: 'normal', fontSize: 14, color: 'white', textAlign: 'center', textShadowColor: 'black', textShadowRadius: 15, }} >

              Rating: {GoogleApi.getRating({ rat: data.results[selected].rating })}
              {/* {"\n"}Open Now: {GoogleApi.getOpening({ hour: data.results[selected].opening_hours.open_now}).toString()} */}
              {"\n"}Price Level: {GoogleApi.getPrice({ pri: data.results[selected].price_level })}
              {"\n"}Address: {GoogleApi.getAdress({ adr: data.results[selected].vicinity })}
              {"\n"}Place Type: {GoogleApi.getType({ typ: data.results[selected].types[0] }).replace('_', ' ').toUpperCase()}


            </Text>

          </View>
          <TouchableOpacity onPress={() => Like()}>
            <Image style={{ width: 45, height: 45 }} source={require('../../images/lll.png')} />
          </TouchableOpacity>
        </View>

      }

    </View>
  )
}

const CustomMarker = ({ item, index, onChangeIndex }) => {

  const {
    geometry,
    name,
    photos,
    rating,
    price_level
  } = item

  const {
    lat, lng
  } = item.geometry.location

  const region = {
    lat: 41.0087,
    lon: 29.0173,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  /*
   display of design, name, point and pay level information for markers
   name=title
   pay level, score = description
   */
  return (
    <Marker
      style={{ zIndex: index }}
      onPress={() => onChangeIndex(index)}
      tracksViewChanges={false}
      coordinate={{ latitude: lat, longitude: lng }}
      tracksInfoWindowChanges={false}
      title={name}
      description={String("Rating: " + rating + "\n" + "Price level: " + price_level)}
    >
    </Marker>
  )
}


//for the map can be used in dark mode 
const mapDarkStyle = [

  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }

];

