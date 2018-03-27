
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Header, Left, Button, Right, Icon, Body, Title } from 'native-base';


export default class AppHeader extends Component {
  render() {
    return (
      <View>
       <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}

