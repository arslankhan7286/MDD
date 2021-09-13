import React, { useState, useEffect } from 'react'
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView
} from 'react-native'

import BottomSheet from 'reanimated-bottom-sheet'
import HomeStyle from '../Home/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'


import FeatureData from '../Home/FeatureData'
import MapView, { Marker } from "react-native-maps";
import Entypo from 'react-native-vector-icons/Entypo'
import { Input, } from 'native-base'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import customAxios from '../../axios.client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValue } from '../StorageWraper';
import { markersTest } from '../Map/model/mapArray';


console.log("marktest", markersTest)


const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE = 44.9720529;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CARD_HEIGHT = 280;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import Loader from '../Loader';

const region = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
}

const HomeScreen = ({ navigation }) => {
  const [apiData, setApiData] = useState(null)
  const [token, setToken] = useState(null)
  const [inventory, setInventory] = useState([])
  const [filterData, setFilterData] = useState([])
  const [indexvalue, setIndexValue] = useState('')
  const [search, setSearch] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [zoom, setZoom] = useState(15)
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const data = await customAxios.post('/organizations/BOM/inventory')
    // console.log("data", data.data.inventory)
    setFilterData(data.data.inventory);
    setInventory(data.data.inventory);
    setLatitude(data.data.inventory[0].location.coordinates.lat)
    setLatitude(data.data.inventory[0].location.coordinates.lan)
    // .then(response => {
    //   setInventory(response.data.inventory)
    //   setFilterData(response.data.inventory)

    // })

  }, [])

  const SearchData = () => {

  }

  useEffect(() => {
    console.log("filterData", filterData)
  }, [filterData]);
  let mapAnimation = new Animated.Value(0);
  const FetchAssetData = async (e) => {
    setIndexValue(e)
    const Assetdata = await inventory[e];
    navigation.navigate('Assets', {
      itemId: e,
      otherParam: Assetdata,
    });
  }
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value)
  }
  const searchFilter = (text) => {
    if (text) {

      const newData = inventory.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })

      setFilterData(newData)
      setSearch(text)
    }
    else {
      setFilterData(inventory);
      setSearch(text)
    }
  }

  const bs = React.createRef()
  const RenderItem = ({ item, index, backgroundColor, textColor }) => (

    <View style={{ flex: 1, height: 120 }}>
      <TouchableOpacity style={HomeStyle.itemFlat} onPress={() => FetchAssetData(index)}>
        <Image
          // source={{ uri: item.image.replace('http', 'https') }} 
          source={item.image
            ? { uri: item.image.replace('http', 'https') }
            : require('../../Assets/Img/mdd.png')}
          style={{ height: 70, width: 70, resizeMode: 'contain', marginTop: 15 }} />

        {/* <Image source={require("../../Assets/Img/mdd.png")} /> */}
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          {/* {console.log("title", item.title)} */}
          <Text numberOfLines={1} style={{ color: 'black', width: '120%' }} > {item.title} </Text>
          {
            item && item.subtitles.map((sub, index) => {
              return (

                <Text numberOfLines={1} style={HomeStyle.Des_Text} >
                  {sub.display} : {sub.value}
                </Text>
              )
            })
          }
          {/* <View style={{ flexDirection: 'row', marginTop: 10, }}>
            <Ionicons name="car" size={20} color='gray' style={HomeStyle.Car_style} />
            <Ionicons name="key" size={20} color='gray' style={HomeStyle.Key_style} />
          </View> */}
        </View>
      </TouchableOpacity>

    </View>



  );
  const ListEmptyView = () => {
    return (
      <View >
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}> loading...</Text>
      </View>

    );
  }
  // console.log("inventory", inventory)
  const renderInner = () => (
    <SafeAreaView>

      <View style={HomeStyle.panel}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <AntDesign
            name="down" size={20} color="gray"
            onPress={() => bs.current.snapTo(1)} />

          <AntDesign
            name="up" size={20} color="gray"
            onPress={() => bs.current.snapTo(0)}
          />


        </View>
        <View style={HomeStyle.ViewTwo}>

          <View style={HomeStyle.Child_View} >
            <Ionicons style={HomeStyle.search_Icon}
              name="search" size={20} color="gray" />
            <View style={HomeStyle.InputView}>
              <Input
                placeholder="Search here"
                placeholderTextColor="gray"
                style={HomeStyle.Input_style}
                autoCapitalize='none'
                defaultValue={search}
                value={search}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
          <View style={HomeStyle.Mic_View}>
            <Ionicons name="mic" size={20} color='gray' />
          </View>
        </View>

        <View style={{ flex: 1, marginTop: 10 }}>

          <FlatList
            data={filterData}
            renderItem={(index) => RenderItem(index)}
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={ListEmptyView}
            scrollEnabled={true}

          // index={index}
          />
        </View>

      </View>
    </SafeAreaView>
  )


  const interpolations = inventory && inventory.location && inventory.location.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });
    return { scale };
  });
  const renderHeader = () => (
    <View style={HomeStyle.header}>
      <View style={HomeStyle.panelHeader}>
        {/* <View style={HomeStyle.panelHandle}
        /> */}
      </View>
    </View>
  )
  return (
    <View style={HomeStyle.container}>
      <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="dark-content" />
      <BottomSheet
        ref={bs}
        snapPoints={Platform.OS === "ios" ? [800, 385, 385] : [650, 300, 300]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledContentGestureInteraction={false}
        scrollEnabled={true}
      />
      <MapView
        initialRegion={{
          latitude: 44.972578,
          longitude: -93.4797703,
          latitudeDelta: 0.3,
          longitudeDelta: 0.4,
        }}
        minZoomLevel={13}
        maxZoomLevel={80}
        zoomEnabled={true}
        followUserLocation={true}
        style={HomeStyle.MapView}
        onRegionChangeComplete={(initialRegion) => {
          setZoom(Math.round(Math.log(360 / initialRegion.latitudeDelta) / Math.LN2))
        }}
      >
        {filterData && filterData.map((marker, index) => (
          <Marker
            coordinate={{ latitude: marker.location.coordinates.lat, longitude: marker.location.coordinates.lon }}
          >
            <Animated.View style={[HomeStyle.markerWrap]}>
              <Animated.Image
                source={require('../../Assets/Img/marker.png')}
                style={[HomeStyle.marker]}
                resizeMode="cover"
              />
            </Animated.View>
          </Marker>
        ))}

      </MapView>

      <View style={HomeStyle.mapIcons} >
        <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('Profile')} />

      </View>
      <View style={HomeStyle.mapIcons1}>
        <Entypo name="plus" size={30} color="#8AC833" style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('pairingScreen')} />

      </View>
      {/* 
      <View style={HomeStyle.panel}>
        <View style={HomeStyle.ViewTwo}>
          <View style={HomeStyle.Child_View} >
            <Ionicons style={HomeStyle.search_Icon}
              name="search" size={20} color="gray" />
            <View style={HomeStyle.InputView}>
              <Input
                placeholder="Search here"
                placeholderTextColor="gray"
                style={HomeStyle.Input_style}
                autoCapitalize='none'
                defaultValue={search}
                value={search}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
          <View style={HomeStyle.Mic_View}>
            <Ionicons name="mic" size={20} color='gray' />
          </View>
        </View>

        <View style={{ flex: 1, marginTop: 10 }}>

        </View>

      </View> */}

    </View>
  )
}
export default HomeScreen;
