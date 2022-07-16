import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import OnboardingScreen from "./components/Onboarding";
import LoginOrSignUpScreen from "./screens/LoginOrSignUp"


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// import 

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Onboarding/> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen name="LoginOrSignUp" options={{ headerShown: false }} component={LoginOrSignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
