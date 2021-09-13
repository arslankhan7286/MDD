import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList, TouchableOpacity
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import HomeStyle from '../Home/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FeatureData from '../Home/FeatureData'
import MapView, { PROVIDER_GOOGLE, Geojson } from "react-native-maps";
import SearchCarStyle from './SearchCarStyle'
import { Input, } from 'native-base'
const region = {
  latitude: 22.62938671242907,
  longitude: 88.4354486029795,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
}
const SearchCar = () => {
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{
        height: 35,
        backgroundColor: "#ECECE7",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        width: '100%',
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

      <FlatList
        data={FeatureData}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} onPress={() => this.bs.current.snapTo(1)} />
      </View>
    </View>
  )

  const bs = React.createRef()

  const RenderItem = ({ item, onPress, backgroundColor, textColor }) => (

    <TouchableOpacity onPress={onPress} style={SearchCarStyle.item}>

      <Image source={{ uri: item.Image }} style={{ width: 120, height: 120, margin: 5, backgroundColor: 'blue' }} />
      <View style={{ flexDirection: 'column', }}>

        <Text numberOfLines={1} style={{
          backgroundColor: '#5484ff',
          fontSize: 16,
          marginTop: 5,
          marginLeft: 5,
          borderWidth: 1, color: 'white',
          width: "19%",
          fontWeight: 'bold'
        }} > Header Place Holder </Text>
        <Text numberOfLines={3} style={{ width: '19%', color: 'white', backgroundColor: 'lightgray', borderWidth: 1, marginLeft: 5, marginTop: 5 }} >
          {item.Des}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 15, }}>
          <Ionicons name="car" size={20} color='gray' style={{ borderWidth: 1, borderColor: "#ffc054", marginLeft: 5 }} />
          <Ionicons name="key" size={20} color='gray' style={{ borderWidth: 1, borderColor: "#ffc054", marginLeft: 15 }} />
        </View>
      </View>



    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>

      <BottomSheet
        ref={bs}
        snapPoints={[800, 400, 400]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledInnerScrolling
      />

      <MapView
        initialRegion={region}
        style={HomeStyle.MapView}
        onPress={() => sheetRef.current.snapTo(0)}
      // provider={PROVIDER_GOOGLE}

      // customMapStyle={ mapStandardStyle}

      >

      </MapView>
      <View style={HomeStyle.mapIcons} >
        <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('dealership')} />

      </View>
      <View style={HomeStyle.mapIcons1}>
        <FontAwesome name="location-arrow" size={20} color="blue" />
      </View>
      <View style={HomeStyle.mapPlusIcon} >
        {/* <AntDesign name="pluscircle" size={40} color="#8AC833" onPress={() => navigation.navigate('pairingScreen')} /> */}

      </View>

    </View>
  )

}
export default SearchCar;
const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  search: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 800,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    paddingTop: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 3,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
})