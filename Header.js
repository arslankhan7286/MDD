import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';


function HeaderScreen({ navigation }) {
  return (
    <Container>
    <Header>
      <Left>
        <Button hasText transparent>
          <Text>Back</Text>
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button hasText transparent>
          <Text>Cancel</Text>
        </Button>
      </Right>
    </Header>
  </Container>
  );
}
export default HeaderScreen;