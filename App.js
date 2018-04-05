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
  View,
  AsyncStorage,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';
import CustomerHome from './components/CustomerHome';
import StockScreen from './components/StockScreen';
import { Container, Header,Body,Thumbnail, Content, Left, Right, Icon } from 'native-base';

const ACCESS_TOKEN = 'access-token';

const CustomerDrawerContentComponent = (props)=> (
  <Container >
    <Header style={{height:230,backgroundColor:'#0D47A1'}}>
    <StatusBar barStyle="light-content" />
      
      <Body style={styles.headerContainer}>
      <Thumbnail  source={{uri: 'https://global.jsilogistics.com/wms/images/wms-customer-'+props.navigation.state.params.id+'.png'}} style={{width:150,height:150,marginTop:10}} />
      
        
        <TouchableOpacity onPress={()=>props.navigation.dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                        NavigationActions.navigate({ routeName: 'Home'})
                        ]
                    }))} style={styles.customerSelectionBtn}><View style={styles.goBackBtn}><Icon name="apps" style={{color:'white'}}/><Text style={styles.customerTitle}>Customer Selection</Text></View></TouchableOpacity>
      
      </Body>
      
    </Header>
    <Content>
        <DrawerItems {...props} />
    </Content>
  </Container>
)

export const CustomerDrawer = DrawerNavigator({
  Home:{
    screen: CustomerHome,
  },
  Stocks:{
    screen:StockScreen,
  }
},{
  initialRouteName:'Home',
  contentComponent:CustomerDrawerContentComponent,
  drawerOpenRoute:'DrawerOpen',
  drawerClosedRoute:'DrawerClosed',
  drawerToggleRoute:'DrawerToggle',
})

export const HomeStack = StackNavigator({
  Home:{
    screen: Home,
    
  },
  CustomerHome:{
    screen: CustomerDrawer,
  }
},{mode:'modal',headerMode:'none'})

export const MainStack = StackNavigator({
  Login:{
    screen: Login,
  },
  Home:{
    screen: HomeStack,
  }
},{headerMode:'none'})


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentScreen: 'Splash',
        token:''
    };
    this.getToken();
    console.log(this.state.token);
    setTimeout(()=>{
        this.setState({ currentScreen : 'Login' });
    },3000);
}

async getToken(){
  try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.setState({token:token})
  }catch(error){
      console.log("Something went wrong: "+error)
  }
}


  render() {
    const { currentScreen } = this.state;
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <MainStack />
        return mainScreen;
  }

}

const styles = StyleSheet.create({
  headerContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  customerTitle:{
    color:'white',
    fontSize:16,
    marginLeft:10
  },
  customerSelectionBtn:{
    padding:10,
  },
  goBackBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  }
})

