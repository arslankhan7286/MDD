import React, { useState } from "react";
import { Container, Text } from 'native-base';
import { View, StatusBar } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import DealerShipStyle from "./DealerShipStyle";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux'


function Dealership({ navigation }) {
  const reduxData = useSelector((state) => state)
  console.log("reduxData", reduxData)
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  console.log("data")
  return (
    <Container>
      <StatusBar backgroundColor="#8FC54B" hidden={true} />
      <View style={DealerShipStyle.DealershipContainer}>
        <View style={{ marginLeft: 30, marginBottom: 30 }}>
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#146aff"
            offColor="#146aff"
            labelStyle={DealerShipStyle.Toggle_Label}
            size="small"
            onToggle={toggleSwitch}
          />
        </View>
        <Text style={DealerShipStyle.dealerShipHeading}>Select Dealership</Text>
        <Text style={DealerShipStyle.dealerShipText}>This page will load  what dealerships  {"\n"}the user has access to
          . Users Sometimes{"\n"}Switch between several Stores{"\n"} {"\n"}We Should be able to Turn on Location {"\n"}Services on This Page</Text>
        <TouchableOpacity style={DealerShipStyle.Logout_Button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'black' }}>Logout </Text>
        </TouchableOpacity>
        <TouchableOpacity style={DealerShipStyle.ChangePassword_Button} >
          <Text style={{ color: 'black' }}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}
export default Dealership;
