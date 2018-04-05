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
  AsyncStorage,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Toast, Container, Header, Left, Button, Right, Icon, Body, Title , Thumbnail, Spinner} from 'native-base';

import AppHeader from './AppHeader';
import MenuItem from './CustomerMenuItem';

const ACCESS_TOKEN = 'access-token';
const USER_DATA = 'user-data';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      token:"",
      columns: 2,
      loading: true,
      userData:"",
    }
    
    // console.log(this.props);
     //console.log(this.props.navigation.state.params.customerAccess);
  }
  static navigationOptions = {
    header:null
  }

  componentDidMount(){
    
    this.getToken();
    this.getUserData();
    this.setState({loading:false})
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

  customerPressed(customer){
    this.props.navigation.navigate('CustomerHome',customer);
  }


  renderCustomerItem = ({item}) => (
    
    <TouchableOpacity onPress={()=>this.customerPressed(item)} >
    
      <MenuItem screenWidth={(SCREEN_WIDTH-30*this.state.columns)/this.state.columns} customerData = {item} />
    
    </TouchableOpacity>
  )
  render() {
    const {columns} = this.state
    return(
      <Container style={styles.container}>
      
       <Header style={styles.headerContainer}>
       <StatusBar barStyle="light-content" />
       
          <Left>
          <Image source={require('../images/logo.png')}
            style={{width:70, height: 70, flex:1}}
            />
          </Left>
          <Body>
            
          </Body>
          <Right />
        </Header>
        <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.loading}
        onRequestClose={()=> {

        }} >
            <View style={styles.SpinnerContainer}>
                <Spinner color="rgba(255,255,255,0.8)" />
                <Text style={styles.SpinnerText}>Loading..</Text>
            </View>
        </Modal>
       <FlatList
       style={styles.flatListContainer}
       numColumns={columns}
       data={this.state.userData.customerAccess}
      //  data={[{id:'218'},{id:'204'}]}
       renderItem={this.renderCustomerItem}
       keyExtractor={(x,i)=>i}
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

