import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import MapModal from './MapModal';
import MapStyle from './MapStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { markers, mapDarkStyle, mapStandardStyle } from './model/mapArray';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT_ANDROID = 220;
const CARD_HEIGHT_IOS = 260;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 15;
const ExploreScreen = () => {
  const initialMapState = {
    markers,
    categories: [
      { 
        name: 'Toyota', 
        icon: <Ionicons style={MapStyle.chipsIcon} name="car" size={18} />,
      },
      {
        name: 'Honda',
        icon: <Ionicons name="car-sharp" style={MapStyle.chipsIcon} size={18} />,
      },
      {
        name: 'BMW',
        icon: <Ionicons name="car-sport" style={MapStyle.chipsIcon} size={18} />,
      },
      {
        name: 'Mercedes',
        icon: <Ionicons name="car-sharp" style={MapStyle.chipsIcon} size={18} />,
      },
  
  ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);


  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
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


  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <KeyboardAvoidingView
    behavior= 'padding'
  >
    <View >
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={MapStyle.container}
        // provider={PROVIDER_GOOGLE}
        customMapStyle={ mapStandardStyle}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[MapStyle.markerWrap]}>
                <Animated.Image
                  source={require('../../Assets/Img/marker.png')}
                  style={[MapStyle.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

      {/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={MapStyle.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={MapStyle.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}


      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 300}
        snapToAlignment='start'
        // style={MapStyle.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? -10 : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {state.markers.map((marker, index) =>(
          <View style={MapStyle.card} key={index}>
            <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
            <View style={{flexDirection:'column'}}>
                <Text numberOfLines={1} style={MapStyle.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={MapStyle.cardDescription}>{marker.description}</Text>
            </View>
            <TouchableOpacity>
            <Ionicons name="ios-close-circle-outline" style={{paddingLeft:85}} size={30} color="gray"/>
            </TouchableOpacity>
      
            </View>
            <View style={MapStyle.textContent}>
              <View style={MapStyle.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[MapStyle.signIn, {
                    borderColor: '#8CC641',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[MapStyle.textSign, {
                    color: 'white'
                  }]}>Stop Scanning for Beacon</Text>
                </TouchableOpacity>
              </View>
              <Image
              source={marker.image}
              style={MapStyle.cardImage}
              resizeMode="cover"
            />
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
    </KeyboardAvoidingView>
  );
};
export default ExploreScreen;
