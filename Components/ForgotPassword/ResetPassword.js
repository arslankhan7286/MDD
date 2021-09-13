import React, {useState} from 'react';
import { View , Image, Platform, StatusBar, Dimensions, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header,Body,Title, Content, Form, Item, Input, Label, Button, Text ,Icon, Left, Right } from 'native-base';
import { StyleSheet } from 'react-native';
const MaxWidth = Dimensions.get('screen').width;
const Maxheight =Dimensions.get('screen').height;

function ResetPassword({ navigation }) {
    const [fourDigits, setFourDigits]=useState('');
    const [password, setPassword]=useState('');
    const [conPassword, setConPassword]=useState('');
    const handleChange =(e)=>{
        e.preventDefault();
        const value=e.target.value;
        setName(value)
        console.log("value", name)
    }
    const handleSubmit =()=>{
        navigation.navigate('Login')
    }
  return (

    <View style={{ flex: 1, backgroundColor:'white'}}>
        
    <StatusBar backgroundColor="#8FC54B" hidden={false} />
 
      <Image source={require('../../Assets/Img/Login.png')} resizeMode="cover" style={{height:"60%", width:'100%'}} />
      <Content style={{marginTop:-160}}>
          <Form style={styles.formContainer}>
  
                <Item regular style={{borderRadius:5}}>
                    <Input placeholder='Enter Four Digits Code' style={styles.inputfield}  
                        onChangeText={fourDigits => setFourDigits(fourDigits)}
                        defaultValue={fourDigits}/>
                </Item>
                <Item regular style={{borderRadius:5 , marginTop:10}}>
                    <Input placeholder='New Password' style={styles.inputfield}  
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}/>
                </Item>
                <Item regular style={{borderRadius:5 , marginTop:10}}>
                    <Input placeholder='Confirm Password' style={styles.inputfield}  
                        onChangeText={conPassword => setConPassword(conPassword)}
                        defaultValue={conPassword}/>
                </Item>
      
                <Button rounded success style={styles.forgotButton} onPress={handleSubmit}>
                    <Text>Forgot Password</Text>
                </Button>
          </Form>
          <View style={styles.lastContainer}>
                <Text style={styles.textLast}>By proceeding you also agree to the Terms of Service {'\n'} {"                           "}and Privacy Policy</Text>
                
        </View>


        </Content>
    </View>
  );
}

const styles = StyleSheet.create({
    formContainer: {
        marginHorizontal:'4%',
        marginTop:30
    },
    inputfield:{
        backgroundColor:"white",
        borderRadius:5,
        borderBottomWidth:0.2,
        borderLeftWidth:0.2,
        borderRightWidth:0.2,
        borderTopWidth:0.2,
    },
    mainView:{
        ...Platform.select({
            ios: {
              backgroundColor: 'white',
              marginHorizontal:15
            },
            android: {

              width:MaxWidth,
              height:Maxheight/3.2,
            marginHorizontal:20
            },
      }),

    },
    forgotButton:{
        marginHorizontal:'1%',
        marginTop:20,
        paddingLeft:'30%',
        width:'96%'
    },
    forgotContainer:{
        width:'160%',
        marginTop:10
    },
    lastContainer:{
        width:'160%',
        marginTop:30
    },
    forgotText:{
        marginHorizontal:'35%',
        color:'gray'
    },
    textLast:{
        fontSize:12,
        marginHorizontal:'10%',
        color:'gray'
    },
    textLastTwo:{
        marginHorizontal:'25%',
        fontSize:12,
        color:'gray'
    },

  });   
export default ResetPassword;