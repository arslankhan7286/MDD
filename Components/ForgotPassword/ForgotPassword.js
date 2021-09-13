import React, { useState } from 'react';
import { View, Image, StatusBar, Platform, Dimensions } from 'react-native';
import { Header, Body, Title, Content, Form, Item, Input, Label, Button, Text, Icon, Left, Right } from 'native-base';
import { StyleSheet } from 'react-native';
const MaxWidth = Dimensions.get('screen').width;
const Maxheight = Dimensions.get('screen').height;

function ForgotPassword({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setName(value)
        console.log("value", name)
    }
    const handleSubmit = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor="#8FC54B" hidden={false} />
            {
                Platform.OS === 'ios' ?
                    (
                        <Header>
                            <Left>
                                <Button transparent onPress={() => navigation.push('Login')}>
                                    {Platform.OS === 'ios' ? (
                                        <Icon name='arrow-back' style={styles.backIcon} />
                                    ) : null}
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.headerTitle}>Forgot Screen</Title>
                            </Body>
                            <Right />
                        </Header>
                    ) : null
            }


            <View style={styles.mainView}>
                <Image source={require('../../Assets/Img/mdd.png')} resizeMode="contain" style={styles.Imagestyle} />
            </View>
            <Content style={{ marginTop: 50 }}>
                <Form style={styles.formContainer}>
                    <Item regular style={{ borderRadius: 5 }}>
                        <Input placeholder='Enter your Email here' style={styles.inputfield}
                            onChangeText={name => setName(name)}
                            defaultValue={name} />
                    </Item>
                    <Button success style={styles.forgotButton} onPress={handleSubmit}>
                        <Text>Continue</Text>
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
        marginHorizontal: '4%',
        marginTop: 10,
    },
    inputfield: {
        backgroundColor: "white",
        borderRadius: 5,
        borderBottomWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
        borderTopWidth: 0.2
    },
    mainView: {
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
                marginHorizontal: 15,
                flex: 1
            },
            android: {

                width: MaxWidth,
                height: Maxheight / 3.2,
                marginHorizontal: 20
            },
        }),
    },
    forgotButton: {
        marginHorizontal: '1%',
        marginTop: 20,
        paddingLeft: '35%',
        width: '96%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    forgotContainer: {
        width: '160%',
        marginTop: 10
    },
    lastContainer: {
        width: '160%',
        marginTop: 40,
    },
    forgotText: {
        marginHorizontal: '35%',
        color: 'gray'
    },
    textLast: {
        fontSize: 14,
        marginHorizontal: '4%',
        color: 'gray'
    },
    textLastTwo: {
        marginHorizontal: '20%',
        fontSize: 14,
        color: 'gray'
    },
    backIcon: {
        color: 'black',
        fontSize: 20
    },
    headerTitle: {
        fontSize: 20,
        width: 270,
        textAlign: 'left'
    },
    Imagestyle: {
        height: "100%",
        width: '90%'
    }
});
export default ForgotPassword;