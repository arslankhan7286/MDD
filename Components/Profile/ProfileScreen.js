import React, { useState } from 'react';
import { Container, Content, Button, Text, Header, Left, Right, Icon, Body, Title, View, Picker } from 'native-base';
import { StatusBar } from 'react-native'
import styles from './ProfileStyle'
import BottomSheet from 'reanimated-bottom-sheet'
import HomeStyle from '../Home/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input, } from 'native-base'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureData from '../Home/FeatureData';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [selecttedvValue, setSelectedValue] = useState('1')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'MDD', value: 'mdd' },
    { label: 'Legacy', value: 'legacy' },
  ]);
  const onValueChange = (e) => {
    e.preventDefault();
    const value = e.targer.value;
    setSelectedValue(value)
    console.lo
      ("selected value", selecttedvValue)
  }
  const Logout = async () => {
    AsyncStorage.removeItem("jwt")
    navigation.navigate("Login")

  }
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.BotomSheetHeaderView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.BotomSheetHeader}>Select Organization</Text>
          {Platform.OS === 'ios' ? (
            <Button rounded
              style={{ backgroundColor: '#ededed' }}
              onPress={() => sheetRef.current.snapTo(1)}
            >
              <Ionicons name="close" color='gray' size={25} />
            </Button>) : null}

        </View>
        <View style={{ marginTop: 10 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: "#d3dceb",
              height: 40,
              width: 350,
              borderColor: '#d3dceb',
              borderRadius: 5,

            }}

          />
          <Button
            transparent
            style={styles.changeOrganiztion}
            onPress={() => sheetRef.current.snapTo(1)}
          >
            <Text style={{ color: 'white' }}>Change Organization</Text>
          </Button>
        </View>
        {/* <View>
          <Button
            transparent
            style={styles.changeOrganiztion}
          // onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: 'white' }}>Change Organization</Text>
          </Button>

        </View> */}



      </View>


    </View>
  )
  const renderHeader = () => (
    <View style={HomeStyle.header}>
      <View style={HomeStyle.panelHeader}>
        <View style={HomeStyle.panelHandle} />
      </View>
    </View>
  )
  // const bs = React.createRef()
  const sheetRef = React.useRef(null);

  const RenderItem = ({ item, onPress, backgroundColor, textColor }) => (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={onPress} style={HomeStyle.itemFlat} onPress={() => navigation.navigate('Assets')}>
        <Image source={{ uri: item.Image }} style={HomeStyle.Image_style} />
        <View style={{ flexDirection: 'column', }}>

          <Text numberOfLines={1} style={HomeStyle.Text_style} > Header Place Holder </Text>
          <Text numberOfLines={3} style={HomeStyle.Des_Text} >
            {item.Des}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15, }}>
            <Ionicons name="car" size={20} color='gray' style={HomeStyle.Car_style} />
            <Ionicons name="key" size={20} color='gray' style={HomeStyle.Key_style} />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
  return (
    <Container>

      <BottomSheet
        ref={sheetRef}
        snapPoints={Platform.OS === "ios" ? [750, 0, 0] : [600, 0, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledContentGestureInteraction={true}

      />
      <Header style={{ backgroundColor: 'white' }}>
        <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="light-content" />
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' style={{ color: 'black', fontSize: 20 }} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.Header_TITLE}>BMW of Minettonka</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Button full style={styles.Buttonchangeorg} onPress={() => sheetRef.current.snapTo(0)}>
          <Text style={{ color: 'black', fontWeight: 'bold' }} >Change Org</Text>
        </Button>
        <Button full style={styles.ButtonChangePas}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Change Password</Text>
        </Button>
        <Button full style={styles.LogoutButton} onPress={Logout}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
}
export default ProfileScreen;