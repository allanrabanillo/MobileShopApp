import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container } from 'native-base';

import Header from './AppHeader';

export default class Home extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render() {
    return(
        <Header />
    )
  }
}

