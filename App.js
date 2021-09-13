import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Home/Home";
import loginScreen from "./Components/Login/Login";
import PairingScreen from "./Components/PairingScreen/PairingScreen";
import Dealership from "./Components/DealerShip/Dealership";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import AssetsScreen from "./Components/AssetsScreen/AssetsScreen";
import ProfileScreen from "./Components/Profile/ProfileScreen";
import ExploreScreen from './Components/Map/Map'
import SearchCar from "./Components/SearchCar/SearchCars";
import { Provider } from "react-redux";
import store from "./Store";
// import Amplify, { Auth } from "aws-amplify";
import { Amplify, Auth } from "aws-amplify";
import { StatusBar } from "react-native";
import SplashScreen from './Components/SplashScreen';


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId: "us-east-1_q3YmoFL0h",
    identityPoolId: "us-east-1:90bf6957-273b-4697-b478-f0afc88ebe5f",
    userPoolWebClientId: "493lea0ein6jm4m2qcg87es1n6",
    authenticationFlowType: "USER_SRP_AUTH",
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#8FC54B" hidden={true} />
        <Stack.Navigator initialRouteName="splash" headerMode="none">


          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="explore"
            component={ExploreScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={loginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="pairingScreen"
            component={PairingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="dealership"
            component={Dealership}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgot"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="reset"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assets"
            component={AssetsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;