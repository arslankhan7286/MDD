import React, { useEffect } from 'react';
import { Container, Header, Text, Title, Item, Input, Icon, Left, Body, Button, Right } from 'native-base';
import { View, Platform, StatusBar, ScrollView } from 'react-native'
import DashboardStyles from './DashboardStyle';
function PairingScreen({ navigation }) {

    useEffect(() => {
        // StatusBar.setBarStyle('light-content', true)
        // const statusbar = StatusBar.setBackgroundColor('green')
        // console.log("statusbar", statusbar)
    }, []);
    return (
        <Container>
            <ScrollView style={{ flex: 1 }}>
                <Header style={{ backgroundColor: 'white' }}>
                    <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="light-content" />
                    <Left>
                        <Button transparent onPress={() => navigation.push('Home')}>

                            <Icon name='arrow-back' style={{ color: 'black', fontSize: 20 }} />

                        </Button>
                    </Left>
                    <Body>
                        <Title style={DashboardStyles.Header_Title}>BMW of Minettonka</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={DashboardStyles.DashboardContainer}>
                    <View style={DashboardStyles.DashboardInputsView}>

                        <Item style={DashboardStyles.DashboardInput} regular>
                            <Input placeholder='Asset ID e.g VIN' />
                            <Button iconLeft transparent >
                                <Icon name='ios-camera-sharp' active style={{ color: 'gray', fontSize: 20 }} />
                            </Button>
                        </Item>
                        <Item style={DashboardStyles.DashboardInput} regular>
                            <Input placeholder='Car' />
                            <Button iconLeft transparent >
                                <Icon name='ios-camera-sharp' active style={{ color: 'gray', fontSize: 20 }} />
                            </Button>
                        </Item>

                    </View>
                    <Button light
                        onPress={() => {
                            navigation.navigate('dealership', {
                                itemId: 1,
                                otherParam: 'anything you want here',
                            });
                        }}
                        style={DashboardStyles.dashboardBottomButton}>
                        <Text style={{ paddingLeft: 150, color: 'gray' }}> PAIR </Text>
                    </Button>
                </View>
            </ScrollView>
        </Container>

    )
}
export default PairingScreen;
