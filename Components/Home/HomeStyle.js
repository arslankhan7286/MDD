import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Dimensions, StatusBar } from 'react-native'
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT_ANDROID = 220;
const CARD_HEIGHT_IOS = 260;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 15;

const IMAGE_SIZE = 200
const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  MapView: {
    height: '55%'
  },
  mapIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 40,
    backgroundColor: "white",
    height: "5%",
    width: "10%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    left: "89%"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  mapIcons1: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: Platform.OS === "ios" ? 85 : 75,
    backgroundColor: "white",
    height: "5%",
    width: "10%",
    left: "89%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5

  },
  mapPlusIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 140,
    height: "8%",
    width: "10%",
    left: "89%"
  },
  Fluxcontainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'column',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
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
    height: Platform.OS === "ios" ? 730 : 600,
    padding: 10,
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
  itemFlat: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5"

  },
  ViewTwo: {
    height: 40,
    backgroundColor: "#ECECE7",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    elevation: 5,
    shadowColor: 'gray',
    paddingTop: Platform.OS === "ios" ? 0 : 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2
  },
  InputView: {
    width: '80%',
    height: 28,
    marginBottom: 5,

  },
  Child_View: {
    flexDirection: "row",
    marginTop: 2,

  },
  search_Icon: {
    marginLeft: 5,
    marginTop: Platform.OS === "ios" ? 5 : -1,
  },
  Input_style: {
    color: 'gray',
    marginLeft: 10,
    fontSize: 14,
    height: 40,
    paddingTop: 0,
    marginTop: 1
  },
  Mic_View: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 40,
    marginTop: Platform.OS === "ios" ? 6 : 1,

  },
  Image_style: {
    width: 120, height: 120, margin: 5,
    backgroundColor: '#f4f4f4'
  },
  Text_style: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 5,
    color: 'black',
    width: "19%",
    fontWeight: '500'
  },
  Des_Text: {
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    marginLeft: 8,
    marginTop: 5,
    fontSize: 10,
    flexDirection: 'column'
  },
  Car_style: {
    // borderWidth: 0.3,
    // borderColor: "lightgray",
    marginLeft: 5
  },
  Key_style: {
    // borderWidth: 0.3,
    // borderColor: "lightgray",
    marginLeft: 10
  }
})
export default HomeStyle;