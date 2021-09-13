import React, { useState } from "react";
import { View, Image } from "react-native";
import {
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  ActivityIndicator,
} from "native-base";
import Loginstyles from "./LoginStyle";
import { setValue } from "../StorageWraper";
import { LoginSuccess } from '../../Redux/Actions/LoginAction'
import { fetchUsers } from "../../Store/actions/LoginAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
// import config from "../../config";
import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from "../../axios.client";
function loginScreen({ navigation }) {
  const [username, setUserName] = useState("hamid@mdd.io");
  const [userNameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("Changeme123");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null)
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);

  const handleChangeUserName = (event) => {
    const value = event.target.value;
    console.log("value", value)
    setUserName(value)
    console.log(username)
  }
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value)
  }
  const SignIn = async () => {
    try {
      setLoading(true)
      const user = await Auth.signIn(username, password);

      const token = user.signInUserSession.idToken.jwtToken;
      dispatch(LoginSuccess(user.signInUserSession.idToken.jwtToken))


      try {
        await AsyncStorage.setItem('jwt', token)

      } catch (e) {
        setLoading(false)
        console.log(e)
      }

      customAxios.get('/profile/hamid@mdd.io')
        .then(response => {
          console.log("response", response)
          setUrl(response)
          console.log("url", url)
        })
        .catch(error => console.log("error", error));
      // await AsyncStorage.setItem(key, value);
      // const localStorage = AsyncStorage.setItem("jwt", JSON.stringify(user.signInUserSession.idToken)

      setLoading(false)
      navigation.navigate('Home')

    } catch (error) {
      console.log("error signing in", error);
      setLoading(false)
      alert(error.message)
    }
  };

  return (
    <View style={Loginstyles.mainViewContainer}>
      <View style={Loginstyles.mainView}>
        <Image source={require("../../Assets/Img/mdd.png")} />
      </View>
      <Content>
        <Form style={Loginstyles.formContainer}>
          <Item regular style={{ borderRadius: 5 }}>
            <Input
              placeholder="Username"
              style={Loginstyles.inputfield}
              value={username}
              onChangeText={(username) => setUserName(username)}
              autoCapitalize='none'
            />

          </Item>
          <Text style={{ color: "red" }}>{userNameError}</Text>
          <Item regular style={{ marginTop: 10, borderRadius: 5 }}>
            <Input
              placeholder="Password"
              style={Loginstyles.inputfield}
              secureTextEntry={true}
              value={password}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize='none'
            />
          </Item>
          <Text style={{ color: "red" }}>{passwordError}</Text>
          <Button style={Loginstyles.loginButton} onPress={SignIn}>
            <Text>SIGN IN</Text>
          </Button>
        </Form>
        <View style={Loginstyles.forgotContainer}>
          <Button
            transparent
            style={Loginstyles.forgotText}
          // onPress={() => navigation.navigate("Home")}
          >
            <Text>Forgot Password ?</Text>
          </Button>
        </View>

        <View style={Loginstyles.lastContainer}>
          <Text style={Loginstyles.textLast}>
            By Proceeding you also agree to the term of Service
          </Text>
          <Text style={Loginstyles.textLastTwo}>and Privacy Policy</Text>
        </View>
      </Content>
      <Loader loading={loading} />
    </View>
  );
}

export default loginScreen;