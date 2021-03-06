import React from 'react';
import {StyleSheet, Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT_ANDROID = 220;
const CARD_HEIGHT_IOS = 260;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 15;


const MapStyle = StyleSheet.create({
  container: {
    // flex: 4,
    height:'60%',
    marginHorizontal:-10
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,

    top:Platform.OS ==='android' ? 445 :550,
    paddingVertical: 5,
    // marginTop:Platform.OS ==='android' ? '120%':'140%',
    paddingLeft:-50
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: Platform.OS === 'android' ? CARD_HEIGHT_ANDROID : CARD_HEIGHT_IOS,
    width: CARD_WIDTH,
    overflow: "hidden",
    padding:2


  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: "bold",
    width:"40%"
  },
  cardDescription: {
    fontSize: 13,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor:'#8CC641',
      marginBottom:20
  },
  textSign: {
      fontSize: 16,
      fontWeight: 'bold'
  }
})
export default MapStyle;