/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';

export const MainStack = StackNavigator({
  Login:{
    screen: Login,
  },
  Home:{
    screen: Home,
  }
},{headerMode:'none'})

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentScreen: 'Splash'
    };
    setTimeout(()=>{
        this.setState({ currentScreen : 'Login' });
    },3000);
}

  render() {
    const { currentScreen } = this.state;
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <MainStack />
        return mainScreen;
  }

}

