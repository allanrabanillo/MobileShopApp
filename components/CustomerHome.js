import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import { Container, Icon } from 'native-base';

import AppHeader from './AppHeader';

export default class CustomerHome extends Component {
    static navigationOptions = {
        drawerIcon:(
            <View><Icon name="home" /></View>
            
        )
      }
  render() {
    let customer = this.props.navigation.state.params
    return (
      <Container style={styles.container}>
       <AppHeader data = {customer} navigation = {this.props.navigation} title='Home'/>
       <StatusBar barStyle="light-content" />
       <Text>{customer.id}</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    title:{
        color:'black',
    },
    logo: {
        height: 300,
        width:300
    }
});

