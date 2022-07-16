import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";

import OnboardingData from "./OnboardingData";

const { width, height } = Dimensions.get("window");
export default function Onboarding({ navigation }) {
  const [compleated, setCompleated] = useState(false);

  const scrollX = new Animated.Value(0);

  const [base64Image1, setBase64Image1] = useState("");
  const [base64Image2, setBase64Image2] = useState("");
  const [base64Image3, setBase64Image3] = useState("");

  const [data, setData] = useState(null);
  const url = "http://192.168.0.103:5000/images/query";
  const query = { query: { page: "onboarding" } };

  const fetchImages = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const resJson = await response.json();
      setData(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        // snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {OnboardingData.map((item, index) => {
          return (
            <View
              key={index}
              style={{ width: width, flex: 1, justifyContent: "center" }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: `${data===null?"center":"flex-end"}`,
                  paddingtop: "30%",

                  // backgroundColor: "cyan",
                }}
              >
                {data === null ? (
                  <Text style={{  width: "100%", height: "70%",fontSize:30 }}>Loading...</Text>
                ) : (
                  
                  <Image
                    // source={item.image}
                    source={{
                      uri: `data:image/png;base64,${data[index].encodedImage}`,
                    }}
                    resizeMode="contain"
                    style={{ width: "100%", height: "70%" }}
                  />
                  
                )} 
              </View>
              {/* {data!==null?console.log(data[index].encodedImage):console.log("")} */}

              <View
                style={[
                  styles.title_desc_view,
                  {
                    width: "100%",
                    flex: 0.9,
                    // backgroundColor:"green",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  },
                ]}
              >
                <View style={{ width: 290 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.skipButtonContainer}
                onPress={() => navigation.navigate("LoginOrSignUp")}
              >
                <Text style={styles.skipButton}>
                  {index === OnboardingData.length - 1 ? "Next" : "Skip"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={styles.dotContainer}>
        {OnboardingData.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ["grey", "#5D5FEF", "grey"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.dot, { backgroundColor: opacity }]}
            ></Animated.View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
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
  title: {
    // backgroundColor:"cyan",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 50,
    color: "#17161A",
  },

  description: {
    textAlign: "center",
    color: "#808080",
    lineHeight: 32,
    fontSize: 16,
    fontWeight: "400",
  },
  title_desc_view: {
    width: 290,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: "5%",
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    backgroundColor: "grey",
    borderRadius: 15,
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  skipButtonContainer: {
    position: "absolute",
    top: 0,
    // backgroundColor:"red",
    padding: 20,
    right: 0,
  },
  skipButton: {
    fontSize: 20,
    color: "grey",
  },
});
