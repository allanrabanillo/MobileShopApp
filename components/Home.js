import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Container, Header, Left, Button, Right, Icon, Body, Title , Thumbnail} from 'native-base';

import AppHeader from './AppHeader';
import MenuItem from './CustomerMenuItem';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: 2
    }
    // console.log(this.props);
    // console.log(this.props.navigation.state.params.customerAccess);
  }
  render() {
    const {columns} = this.state
    return(
      <Container style={styles.container}>
       <Header style={styles.headerContainer}>
       <StatusBar barStyle="light-content" />
          <Left />
          <Body>
            <Image source={require('../images/logo.png')}
            style={{width:70, height: 70, flex:1}}
            />
          </Body>
          <Right />
        </Header>
       <FlatList
       style={styles.flatListContainer}
       numColumns={columns}
      //  data={this.props.navigation.state.params.customerAccess}
       data={[{id:'218'},{id:'204'}]}
       renderItem={({item})=><MenuItem screenWidth={(SCREEN_WIDTH-30*columns)/columns} customerData = {item} />}
       keyExtractor={(item)=>item.id}
      //  ItemSeparatorComponent={()=><View style={{height:2,backgroundColor:'#cccccc'}} />}
       />

      
      </Container>
       
    )
  }
}
const styles = StyleSheet.create({
    container:{
      
    },
    flatListContainer:{
      marginTop:10
    },
    headerContainer:{
      backgroundColor: '#0D47A1',
    },
    headerTitle:{
      color:'white',
    }
})

