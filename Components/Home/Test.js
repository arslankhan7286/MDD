import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , FlatList, Image, Platform , Modal, TouchableOpacity} from 'react-native';
import { Input, Button, Left } from 'native-base';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, {PROVIDER_GOOGLE, Geojson} from "react-native-maps";
import HomeStyle from './HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CarsData from './CarsData';
import styles from '../Auth/auth';
import SearchCarStyle from '../SearchCar/SearchCarStyle'; 

const region={
    latitude: 22.62938671242907,
    longitude: 88.4354486029795, 
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  }
  const DATA = [
    {
      id: "1",
      Image:"data:image/jpeg;base64,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",
      model:'2013 Mercedes Benz',
      name:"GLK 350 Pre-Owned",
      stock:'8n175a', 
      milage:'70,000',
      retail:'$14,700',
      bestPrice:'$17,913',
      color:'gray',
      exterior:'Mars red',
      interior:'Almomd/Mocha'
  },
    {
      id: "2",
      Image:"https://cdn.pixabay.com/photo/2021/06/29/18/55/mountain-slope-6374980__340.jpg",
      model:'2014 Toyota',
      name:'Senna Limited AWD Pre Owned',
      stock:'8n175a',
      milage:'80,000 ',
      retail:'$12,000',
      bestPrice:'$20,000',
      color:'red',
      exterior:'Bizzars Pearl',
      interior:'LightGray'
    },
      {
      id: "3",
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-yoLvSxv24RswCXBe9DmzcMKe4UVbwCHGA&usqp=CAU",
      model:'2016 Toyota',
      name:'RAV4 SE AWD Pre-Owned',
      stock:'8n175a',
      milage:'20,000 ',
      retail:'$13,000',
      bestPrice:'$15,000',
      color:'blue',
      exterior:'black',
      interior:'black'
    },
    {
      id: "4",
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-yoLvSxv24RswCXBe9DmzcMKe4UVbwCHGA&usqp=CAU",
      model:'2012 Toyota',
      name:'RAV4 SE AWD Pre-Owned',
      stock:'8n175a',
      milage:'20,000 ',
      retail:'$8000',
      bestPrice:'$11,000',
      color:'purple',
      exterior:'yellow',
      interior:'gray'
    },
    {
      id: "5",
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-yoLvSxv24RswCXBe9DmzcMKe4UVbwCHGA&usqp=CAU",
      model:'2012 Toyota',
      name:'RAV4 SE AWD Pre-Owned',
      stock:'8n175a',
      milage:'20,000 ',
      retail:'$8000',
      bestPrice:'$11,000',
      color:'green',
      exterior:'brown',
      interior:'gray'
    },
  ];
  const RenderItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[SearchCarStyle.item,]}>
   
         <Image source={{uri:item.Image}} style={{marginHorizontal:'0%', width:90, height:80, backgroundColor:'blue'}} />
          <View style={SearchCarStyle.textContainer}>
                  <Text style={{fontSize:12, color:'gray', marginHorizontal:10, marginBottom:10}}>{item.model}</Text>
                      <Text style={{fontSize:13, color:'black', marginHorizontal:10, marginBottom:2, fontWeight:'bold'}}>{item.name}</Text>
                          <Text style={{fontSize:10, color:'gray', marginHorizontal:10, marginBottom:2}}>
                              <Ionicons name="ellipse" size={10} color={item.color}/>
                              Exterior : {item.exterior}
                          </Text>
                          <Text style={{fontSize:10, color:'gray', marginHorizontal:10, marginBottom:2}}>
                              <Ionicons name="ellipse" size={10} color={item.interior}/>
                              Interior : {item.interior}
                          </Text>
                      <Text style={{fontSize:10, color:'gray', marginHorizontal:10, marginBottom:2}}>Milage : {item.milage}</Text>
                      <View style={{
                        borderBottomWidth:0.2,
                        borderBottomColor:'gray',
                        width:'65%',
                        marginHorizontal:5,
                        marginTop:8,
                        marginBottom:15
                      }}>
                      </View>

                  <Text style={{fontSize:10, fontWeight:'bold', marginLeft:5 , marginHorizontal:15}}>
                    <Ionicons name="help-circle" size={12} color='black' style={{fontWeight:'bold'}}/> 
                    Details
                  </Text>
  
                  <View style={{flexDirection:'row', justifyContent:'space-between', width:'67%', marginHorizontal:8}}>
                      <Text style={{fontSize:10,color:'gray'}}>KBB Retail</Text>
                      <Text style={{fontSize:10,color:'gray'}}>{item.retail}</Text>
                  </View>
  
                  <View style={{flexDirection:'row', justifyContent:'space-between', width:'67%', marginTop:5, marginHorizontal:8}}>
                      <Text style={{fontSize:10,color:'gray'}}>Our Best Price</Text>
                      <Text style={{fontSize:10,color:'black',fontWeight:'700' }}>{item.bestPrice}</Text>
                  </View>
          </View>
    </TouchableOpacity>
  );
export default function App({ navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
    const Item = ({ item }) => (
        <View style={HomeStyle.item}>
           <Image onPress={()=>navigation.navigate('Login')} source={{uri:item.Image}} style={{marginHorizontal:'0%', width:60, height:60}} />
           <Text style={{marginTop:10}}>{item.number}</Text>
        </View>
      );

 
  const sheetRef = React.useRef(null);
 
  return (
    <>
        <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)
                }}
                presentationStyle='formSheet'
     
            >
            <View style={styles.DashboardContainer}>
            <View style={styles.SearchFieldInputView}>
                {/* <Item style={styles.SearchcarsInput} regular> 
                 <Icon name='search' active style={{color:'gray', fontSize:0}}/>
                  
                    <Input placeholder='Use BMW 3 Series' style={{fontSize:12,paddingLeft:-20,height:20 }}/>
                    {
                        Platform.OS === 'ios' ?
                        (
                            <>
                            <Button iconLeft transparent onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name='close' active style={{color:'gray'}} />
                            </Button>
                            <Button close transparent > 
                                <Icon name='mic' active style={{color:'gray'}}/>
                            </Button>
                            </>
                        ):(
                            <>
                            <Button iconLeft transparent onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name='close' active height={10} style={{color:'gray'}} />
                            </Button>
                            <Button close transparent >
                                <Icon name='mic' active style={{color:'gray'}}/>
                            </Button>
                            </>
                        )}
                </Item> */}
                {
                  Platform.OS === 'ios' ? (
                
                    <View style={{height:80, width:'100%', backgroundColor:'white', marginLeft:12}}>
                    <View style={{
                      marginTop:5,
                       padding:0,
                        height:35,
                        backgroundColor:"#ECECE7",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        elevation:5,
                        borderRadius:10,


                    }}>
                      <View style={{
                          flexDirection:"row",
                          marginTop:2
                      }} >
                      <Ionicons style={{
                          marginLeft:5,
                          marginTop:5
                      }}
                      
                      name="search" size={20} color="gray"/>
                      <View style={{width:'80%', height:38,marginBottom:20}}> 
                          <Input 
                          placeholder="Search" 
                          placeholderTextColor="gray" 
                          style={{color:'gray', marginLeft:10, fontSize:14}}
                          
                      /> 
                      </View>
                      
                      </View>
                      <View style={{
                          flexDirection:"row",
                          justifyContent:"space-around",
                          width:40,
                          margin:6
                      }}>
                          <Entypo name="circle-with-cross" size={20} color='black' onPress={() => setModalVisible(false)} />
                      <Ionicons name="mic" size={20} color='gray' />
                    
                      </View>
                      
                    </View>
                    <Text style={{padding:10, color:'gray', fontWeight:'bold', fontSize:14}}>Search Result</Text>
                    </View>

                  ) : (

                    <View style={{height:80, width:'100%', backgroundColor:'white'}}>
                    <View style={{
                      marginTop:5,
                       padding:0,
                        height:35,
                        backgroundColor:"#ECECE7",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        elevation:5,
                        borderRadius:10,


                    }}>
                      <View style={{
                          flexDirection:"row",
                          marginTop:2
                      }} >
                      <Ionicons style={{
                          marginLeft:5,
                          marginTop:5
                      }}
                      
                      name="search" size={20} color="gray"/>
                      <View style={{width:'80%', height:38,marginBottom:20}}> 
                          <Input 
                          placeholder="Search" 
                          placeholderTextColor="gray" 
                          style={{color:'gray', marginLeft:10, fontSize:14}}
                          
                      /> 
                      </View>
                      
                      </View>
                      <View style={{
                          flexDirection:"row",
                          justifyContent:"space-around",
                          width:40,
                          margin:6
                      }}>
                          <Entypo name="circle-with-cross" size={20} color='black' onPress={() => setModalVisible(false)} />
                      <Ionicons name="mic" size={20} color='gray' />
                    
                      </View>
                      
                    </View>
                    <Text style={{padding:10, color:'gray', fontWeight:'bold', fontSize:14}}>Search Result</Text>
                    </View>
           
                  )
                }
            </View>
            <View style={{marginTop:10}}>
            <FlatList
                data={DATA && DATA}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
      
      />
      </View>
        </View>
            
         </Modal>
      <View
        style={{
         height:800,
         width:'100%',
          backgroundColor: 'papayawhip',
       
        }}
      >
             <MapView
              initialRegion={region}
              style={HomeStyle.MapView}
              onPress={() => sheetRef.current.snapTo(0)}
              // provider={PROVIDER_GOOGLE}
             
              // customMapStyle={ mapStandardStyle}
            
            >
     
        </MapView>
        <View style={HomeStyle.mapIcons} >
              <Ionicons name="ios-information-circle-outline" size={20} color="blue"  onPress={()=>navigation.navigate('dealership')}/>
              
             </View>
             <View style={HomeStyle.mapIcons1} >
             <FontAwesome name="location-arrow" size={20} color="blue" />
              
             </View>

             <View style={HomeStyle.mapPlusIcon} >
             <AntDesign name="pluscircle" size={40} color="#8AC833"  onPress={()=>navigation.navigate('dashboard')}/>
              
             </View>
        {/* <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
         <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        /> */}
           <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
        
        <View style={{height:700, backgroundColor:'white',borderTopRightRadius:25,borderTopLeftRadius:25}}>
                  <Entypo name="minus" size={35} style={{color:'gray',marginLeft:"44%",marginTop:-35,}} />
                    <View style={{height:80, width:'100%',}}>
                    <View style={{
                       padding:0,
                        height:35,
                        backgroundColor:"#ECECE7",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        elevation:5,
                        borderRadius:10,
                        width:'90%',
                        marginHorizontal:20
                    }}>
                      <View style={{
                          flexDirection:"row",
                          marginTop:2
                      }} >
                      <Ionicons style={{
                          marginLeft:5,
                          marginTop:5
                      }}
                      
                      name="search" size={20} color="gray"/>
                      <View style={{width:'80%', height:38,marginBottom:20}}> 
                          <Input 
                          placeholder="Search" 
                          placeholderTextColor="gray" 
                          style={{color:'gray', marginLeft:10, fontSize:14}}
                          
                      /> 
                      </View>
                      
                      </View>
                      <View style={{
                          flexDirection:"row",
                          justifyContent:"space-around",
                          width:40,
                          margin:6
                      }}>

                      <Ionicons name="mic" size={20} color='gray' />
                      </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{paddingTop:10,paddingLeft:30, color:'gray', fontWeight:'bold', fontSize:12}}>Recents Search </Text>
                    <Button  
                  onPress={() => setModalVisible(true)}
                    transparent style={{paddingRight:30}}><Text style={{color:'#3db2d9', fontSize:10,marginTop:-5}}>See All</Text></Button>
                    </View>
                    </View>
                    <View style={{ height:270}}>
                   {Platform.OS ==="android" ?(
                         <FlatList
                         data={CarsData}
                        //  data={new Array(10).fill(0).map((item, index) => index)}
                         renderItem={Item}
                         keyExtractor={item => item.id}
                         horizontal
                         scrollEnabled
                         showsHorizontalScrollIndicator={false}                    
                 
                       />
                   ):(
                    <FlatList
                    data={CarsData}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}                    
            
                  />

                   )}
             
                    <Text style={{marginHorizontal:20,fontSize:14, marginTop:20}}>Feature</Text>
                    {
                      Platform.OS ==="android" ?(
                        <FlatList
                        data={FeatureData}
                        renderItem={Item}
                        keyExtractor={item => item.id}
                        horizontal
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}      
                
                      />

                      ):(
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
   
    </View>
      </View>
      {/* <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      /> */}
    </>
  );
}