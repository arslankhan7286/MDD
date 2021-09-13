import React from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { markers, mapDarkStyle, mapStandardStyle } from './model/mapArray';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import {
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
  } from "react-native";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const MapModal = () => {

    const initialMapState = {
        markers,
        categories: [
          { 
            name: 'Fastfood Center', 
            icon: <Ionicons style={styles.chipsIcon} name="car" size={18} />,
          },
          {
            name: 'Restaurant',
            icon: <Ionicons name="car-sharp" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Dineouts',
            icon: <Ionicons name="car-sport" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Snacks Corner',
            icon: <Ionicons name="car-sharp" style={styles.chipsIcon} size={18} />,
          },
          {
            name: 'Hotel',
            icon: <Ionicons name="car-sport-sharp" style={styles.chipsIcon} size={15} />,
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


  const renderItem = ({ item }) => (
    <Container style={{backgroundColor:'red', flex:1}}>
 
    <Content style={{backgroundColor:'blue', height:'100%'}}>
      <Card >
     
        <CardItem cardBody>
          {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/> */}
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  </Container>
    //   <Container style={styles.ScrollView}>

    //     {state.markers.map((marker, index) =>(
    //       <Card key={index}>

    //         <View style={{flexDirection:'row', paddingTop:10, paddingLeft:10}}>
    //         <View style={{flexDirection:'column'}}>

    //             <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
    //             <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
    //         </View>
    //         <Ionicons name="ios-close-circle-outline" style={{paddingLeft:85}} size={30} color="gray"/>

      
    //         </View>
         
    //         <View style={styles.textContent}>
             
    //           <View style={styles.button}>
    //             <TouchableOpacity
    //               onPress={() => {}}
    //               style={[styles.signIn, {
    //                 borderColor: '#8CC641',
    //                 borderWidth: 1
    //               }]}
    //             >
    //               <Text style={[styles.textSign, {
    //                 color: 'white'
    //               }]}>Stop Scanning for Beacon</Text>
    //             </TouchableOpacity>
    //           </View>
    //           <Image 
    //           source={marker.image}
    //           style={{height:100, width:150}}
    //           resizeMode='center'
    //         />
    //         </View>
    //       </Card>
    //     ))}

    // </Container>
     
  );

  return (
    <SafeAreaView style={styles.Mapcontainer}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Mapcontainer: {
    flex: 1,
    
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  ScrollView:{
      height:300,
      width:'60%'
  
  },
    card:{

        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 1,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        // height: %',
        width: '100%',

    }
});

export default MapModal;