import React, { useState } from 'react'
import {
    Image,
    StyleSheet,
    View,
    Text,
    FlatList, TouchableOpacity,
    Animated
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons//Feather'
import MapView, { PROVIDER_GOOGLE, Geojson, Marker, PROVIDER_DEFAULT } from "react-native-maps";
import styles from './AssetsStyle'
import { Button } from 'native-base'
import markers from './MapArray'
// const region = {
//     latitude: 44.972795,
//     longitude: -93.479389,
//     latitudeDelta: 0.04864195044303443,
//     longitudeDelta: 0.040142817690068,
// }
const AssetsScreen = ({ navigation, route }) => {
    const { itemId } = route.params;
    const { otherParam } = route.params;

    const [state, setState] = React.useState(region);
    const [asset, setAsses] = React.useState(otherParam)
    const [region, setRegion] = React.useState(asset.location.coordinates)
    console.log("region", region)
    const [latitude, setLatitude] = React.useState(asset.location.coordinates.lat)
    console.log("latitude", latitude)



    const [longitude, setLongitude] = React.useState(asset.location.coordinates.lon)
    console.log("longitude", longitude)

    const DeltaRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,

    }

    console.log("asset", asset)
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text numberOfLines={1} style={{
                        fontSize: 14,
                        marginTop: 15,
                        fontWeight: 'bold'
                    }} >{asset && asset.title}</Text>
                    <Button rounded style={styles.Button_style}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Ionicons name="close" color='gray' size={15} />
                    </Button>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, marginHorizontal: 3 }}>{asset && asset.subtitles[0].value} | </Text>
                    <Text style={{ fontSize: 12, marginHorizontal: 3 }}>{asset && asset.subtitles[1].value} | </Text>
                    <Text style={{ fontSize: 12, marginHorizontal: 3 }}>{asset && asset.subtitles[2].value} | </Text>
                    <Text style={{ fontSize: 12, marginHorizontal: 3 }}>{asset && asset.subtitles[3].value}</Text>

                </View>


                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <Button style={styles.FindTag_button} >
                        <Text style={{ color: "white" }} >Find- Scan for tag</Text>
                    </Button>
                    <Button style={styles.Key_Button}>
                        <Ionicons name="key" size={20} color='gray' style={{ marginLeft: 5 }} />
                        <Text style={styles.Key_text} >KEY</Text>
                    </Button>
                    <Button style={styles.car_button}>
                        <Ionicons name="car" size={20} color='black' style={{ marginLeft: 5 }} />
                        <Text style={{ marginRight: 10, fontWeight: 'bold' }} >CAR</Text>
                    </Button>
                </View>
                {console.log("image", asset.image)}
                <Image
                    source={asset.image
                        ? { uri: asset.image.replace('http', 'https') }
                        : require('../../Assets/Img/mdd.png')}
                    style={styles.Image_Style} />
            </View>
        </View>
    )
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} onPress={() => this.bs.current.snapTo(1)} />
            </View>
        </View>
    )
    const bs = React.createRef();
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={Platform.OS === "ios" ? [385, 385, 385] : [300, 300, 300]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                enabledInnerScrolling
            />
            <MapView
                initialRegion={DeltaRegion}
                style={styles.MapView}

                // mapType="standard"
                zoomEnabled={true}
            // pitchEnabled={true}
            // showsUserLocation={true}
            // followsUserLocation={true}
            // showsCompass={true}
            // showsBuildings={true}
            // showsTraffic={true}
            // showsIndoors={true}
            >
                <Marker coordinate={{ latitude: DeltaRegion.latitude, longitude: DeltaRegion.longitude }}>
                    {/* <FontAwesome name="car" size={40} color="red" /> */}
                    <Animated.View style={[styles.markerWrap]}>
                        <FontAwesome name="car" size={20} color="red" style={styles.marker} />
                    </Animated.View>
                </Marker>
            </MapView>
            <View style={styles.mapIcons} >
                <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('Profile')} />
            </View>
            <View style={styles.mapIcons1}>
                <Feather name="navigation" size={20} color="blue" />
            </View>
        </View >
    )
}
export default AssetsScreen;

