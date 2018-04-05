
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

import { Header, Left, Button, Right, Icon, Body, Title, Thumbnail } from 'native-base';


export default class AppHeader extends Component {
  constructor(props){
    super(props)

  }


  render() {
    let customer = this.props.data;
    let title = this.props.title;
    return (
      <View>
       <Header style={styles.headerContainer}>
          <Left>
            {/* <TouchableOpacity onPress={()=>this.goBackToCustomerSelection()}>
            <View style={styles.goBackBtn}>
            
            <Icon name="arrow-back" style={{color:'white',marginRight:5}}/>
              <Thumbnail  source={{uri: 'https://global.jsilogistics.com/wms/images/wms-customer-'+customer.id+'.png'}} style={{width:50,height:50}} />
            </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{color:'white'}}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.headerTitle} >{title}</Title>
          </Body>
          <Right>
          {/* <TouchableOpacity onPress={()=>this.goBackToCustomerSelection()}>
              <Icon name="menu" style={{color:'white'}}/>
            </TouchableOpacity> */}
          </Right>
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
  },
  goBackBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  }
})

