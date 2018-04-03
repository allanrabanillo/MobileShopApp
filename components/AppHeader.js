
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
       <Header style={styles.headerContainer}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle} >Header</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor: '#0D47A1',
  },
  headerTitle:{
    color:'white',
  }
})

