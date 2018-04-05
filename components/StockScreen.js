import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { Container,Icon } from 'native-base';

import AppHeader from './AppHeader';

const ACCESS_TOKEN = 'access-token';
const USER_DATA = 'user-data';

export default class StockScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            token:'',
            userData:'',
            stockIndex: []
        }
    }

    static navigationOptions = {
        drawerIcon:(
            <View><Icon name="ios-archive" /></View>
        )
      }
    async getToken(){
        try{
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            //console.log("TOKEN: " +token)
            this.setState({token:token});
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }

    async getUserData(){
        try{
          const userData = await AsyncStorage.getItem(USER_DATA);
          this.setState({userData:JSON.parse(userData)});
        }catch(error){
            console.log("Something went wrong: "+error)
        }
      }

    async fetchAllStockIndex(){
        let url = "https://3f12b147.ngrok.io/MobileShopAPI/stocks/getAvailableStockIndex";
        try{
            let response =  await fetch(url,{
             method:'GET',
             headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Client-Service':'frontend-client',
                'Auth-Key':'simplerestapi',
                'Authorization':this.state.token,
                'User-ID':this.state.userData.username
            },
            });

            let responseJson = await response.json();
            if(response.status == 200){
                console.log(responseJson);
            }else{
                let error = response.text();
                throw error;
            }

        }catch(error){
            console.log(error);
        }
        
        
    }

    componentDidMount(){
        this.getToken();
        this.getUserData();
        this.fetchAllStockIndex();
        alert('loaded');
    }

    

  render() {
      let customer = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
      <AppHeader data = {customer} navigation = {this.props.navigation} title='Stocks' />
      <StatusBar barStyle="light-content" />
       <Text>{customer.customerAlias}</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container:{

    },
    title:{
        color:'black',
    },
    logo: {
        height: 300,
        width:300
    }
});

