import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Button,
  Animated,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location === null ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0032,
            longitudeDelta: 0.0031,
          }}
          onRegionChangeComplete={(region)=>console.log(region)}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          ></Marker>
        </MapView>
      )}
      <Text style={{fontSize:24,position:"absolute",top:'50%',right:'50%'}}>i</Text>
      {/* <Text style={{position:"absolute",bottom:'10%',left:'5%'}}>latitude {location.coords.latitude===null?'Loading': location.coords.latitude}</Text>
      <Text style={{position:"absolute",bottom:'5%',left:'5%'}}>latitude {location.coords.longitude===null?'Loading': location.coords.longitude}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
