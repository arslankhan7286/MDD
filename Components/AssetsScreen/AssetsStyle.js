import React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, } from 'react-native'

const IMAGE_SIZE = 200
const styles = StyleSheet.create({
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
        width: 48,
        height: 48,
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
    item: {
        flex: 1,
        marginTop: -25
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
        backgroundColor: 'white',
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
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
        height: Platform.OS === "ios" ? 380 : 300,
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
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    Button_style: {
        width: 30,
        height: 30,
        backgroundColor: 'lightgray',
        marginRight: 10,
        marginTop: 5,
        justifyContent: "center"
    },
    FindTag_button: {
        backgroundColor: '#787878',
        height: 30,
        justifyContent: 'center',
        width: 180
    },
    Key_Button: {
        marginLeft: 10,
        backgroundColor: '#32c904',
        height: 30,
        justifyContent: "space-between",
        width: 70
    },
    Key_text: {
        marginRight: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    car_button: {
        marginLeft: 10,
        backgroundColor: '#787878',
        height: 30,
        justifyContent: "space-between",
        width: 70
    },
    Image_Style: {
        width: "100%",
        height: Platform.OS === "ios" ? 190 : 120,
        marginTop: 0,
        borderRadius: 3,

    }

})
export default styles;