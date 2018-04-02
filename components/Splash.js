import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import { Container } from 'native-base';


export default class Splash extends Component {
  render() {
    return (
      <Container style={styles.container}>
      <StatusBar barStyle="light-content" />
        <Image style={styles.logo} source={require('../images/logo.png')}></Image>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2979FF',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        color:'black',
    },
    logo: {
        height: 300,
        width:300
    }
});

