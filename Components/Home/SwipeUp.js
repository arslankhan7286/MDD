import React, { useState } from 'react';
import { View, Text, Platform, FlatList, Image, StyleSheet } from 'react-native';
import { Input, Button, Left } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE, Geojson } from "react-native-maps";
import HomeStyle from './HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RecentSearches from './RecentSearches';
import CarsData from './CarsData';
import FeatureData from './FeatureData';
import SwipeUpDown from 'react-native-swipe-up-down';

const HomeScreen = ({ navigation }) => {
  const [listData, setlistData] = useState(
    CarsData.map((CarsDataItem, index) => ({
      key: `${index}`,
      id: CarsDataItem.CarsDataItem,
      Image: CarsDataItem.Image
    }))
  );
  const [animation, setanimation] = useState('easeInEaseOut')
  const [modalVisible, setModalVisible] = useState(false);
  const region = {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  }
  const Item = ({ item }) => (
    <View style={HomeStyle.item}>
      <Image onPress={() => navigation.navigate('Login')} source={{ uri: item.Image }} style={{ marginHorizontal: '0%', width: 60, height: 60 }} />
      <Text style={{ marginTop: 10 }}>{item.number}</Text>
    </View>
  );
  return (
    <View style={HomeStyle.container}>
      <MapView
        initialRegion={region}
        style={HomeStyle.MapView}
      // provider={PROVIDER_GOOGLE}
      // customMapStyle={ mapStandardStyle}
      >

      </MapView>
      <View style={HomeStyle.mapIcons} >
        <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('dealership')} />

      </View>
      <View style={HomeStyle.mapIcons1} >
        <FontAwesome name="location-arrow" size={20} color="blue" />

      </View>

      <View style={HomeStyle.mapPlusIcon} >
        <AntDesign name="pluscircle" size={40} color="#8AC833" onPress={() => navigation.navigate('dashboard')} />

      </View>
      <SwipeUpDown
        // hasRef={ref => (swipeUpDownRef = ref)} 

        itemMini={

          <View style={{ height: 700, backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
            <Entypo name="minus" size={35} style={{ color: 'gray', marginLeft: "44%", marginTop: -35, }} />
            <View style={{ height: 80, width: '100%', }}>
              <View style={{
                padding: 0,
                height: 35,
                backgroundColor: "#ECECE7",
                flexDirection: "row",
                justifyContent: "space-between",
                elevation: 5,
                borderRadius: 10,
                width: '90%',
                marginHorizontal: 20
              }}>
                <View style={{
                  flexDirection: "row",
                  marginTop: 2
                }} >
                  <Ionicons style={{
                    marginLeft: 5,
                    marginTop: 5
                  }}

                    name="search" size={20} color="gray" />
                  <View style={{ width: '80%', height: 38, marginBottom: 20 }}>
                    <Input
                      placeholder="Search"
                      placeholderTextColor="gray"
                      style={{ color: 'gray', marginLeft: 10, fontSize: 14 }}

                    />
                  </View>

                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: 40,
                  margin: 6
                }}>

                  <Ionicons name="mic" size={20} color='gray' />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ paddingTop: 10, paddingLeft: 30, color: 'gray', fontWeight: 'bold', fontSize: 12 }}>Recents Search </Text>
                <Button
                  // onPress={ref => (swipeUpDownRef = ref)} 
                  transparent style={{ paddingRight: 30 }}><Text style={{ color: '#3db2d9', fontSize: 10, marginTop: -5 }}>See All</Text></Button>
              </View>
            </View>
            <View style={{ height: 270 }}>
              {Platform.OS === "android" ? (
                <FlatList
                  data={CarsData}
                  //  data={new Array(10).fill(0).map((item, index) => index)}
                  renderItem={Item}
                  keyExtractor={item => item.id}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}

                />
              ) : (
                <FlatList
                  data={CarsData}
                  renderItem={Item}
                  keyExtractor={item => item.id}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}

                />

              )}

              <Text style={{ marginHorizontal: 20, fontSize: 14, marginTop: 20 }}>Feature</Text>
              {
                Platform.OS === "android" ? (
                  <FlatList
                    data={FeatureData}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}

                  />

                ) : (
                  <FlatList
                    data={FeatureData}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}

                  />

                )
              }


            </View>
          </View>

        }
        itemFull={
          <View style={styles.panelContainer}>
            <Text style={styles.instructions}>
              Swipe down to close
            </Text>
          </View>
        }
        onShowMini={false}
        disablePressToShow={true}
        style={{ backgroundColor: 'white', }}
        animation={animation}
        swipeHeight={400}
      />

    </View>

  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  panelContainer: {
    height: "80%",

  },
});