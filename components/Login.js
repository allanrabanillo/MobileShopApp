

import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView,AsyncStorage,Modal
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Root,Toast, Spinner,Button } from 'native-base';

const ACCESS_TOKEN = 'access-token';
const USER_DATA = 'user-data';

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            showToast: false,
            loading: false,
            username : "dev/arabanillo",
            password: "060101@"
        }
    }


    async storeToken(accessToken){
        try{
            await AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
            this.getToken();
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }

    async storeUserData(data){
        try{
            await AsyncStorage.setItem(USER_DATA,data);
            this.getUserData()
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }

    async getToken(){
        try{
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            //console.log("TOKEN: " +token)
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }

    async getUserData(){
        try{
            let userData = await AsyncStorage.getItem(USER_DATA);
            //console.log("UserDATA: " +userData)
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }

    async removeToken(){
        try{
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.getToken();
        }catch(error){
            console.log("Something went wrong: "+error)
        }
    }



    async onLoginPressed(){
        this.setState({loading:true});
        let url = "https://3f12b147.ngrok.io/MobileShopAPI/auth/login";
        try{
            let response = await fetch(url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Client-Service':'frontend-client',
                    'Auth-Key':'simplerestapi',
                },
                body:JSON.stringify({
                    username: this.state.username,
                    password:this.state.password,
                })
            });
            if(response.status == 200){
                this.setState({loading:false});
                let responseJson = await response.json();
                if(responseJson.status == 200){
                    // this.setState({error:""});
                    
                    let accessToken = responseJson.token;
                    this.storeToken(accessToken);
                    this.storeUserData(JSON.stringify(responseJson));
                    //console.log("Access Token: " + accessToken);
                    this.props.navigation.navigate('Home',responseJson);
                    this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                        NavigationActions.navigate({ routeName: 'Home'})
                        ]
                    }));
                }else{
                    
                    let error = responseJson.message;
                    throw error;
                }
            }else{
                this.setState({loading:false});
                console.log(response);
                let error = response.statusText
                throw error;
            }
            //console.log(responseJson);
        }catch(error){
            this.removeToken();
            Toast.show({
                text: error,
                position: 'top',
                type:'danger',
                buttonText: 'OK',
                duration:5000
              })
            // this.setState({error:error});
            console.log("error "+ error);
        }
        // this.props
        //         .navigation
        //         .dispatch(NavigationActions.reset(
        //             {
        //                 index: 0,
        //                 actions: [
        //                 NavigationActions.navigate({ routeName: 'Home'})
        //                 ]
        //             }));
    }


    render() {
        return (
            
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar barStyle="light-content" />
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
                        
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo}
                                    source={require('../images/logo.png')}>
                                </Image>
                               <Text style={styles.title}>Account Details</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                {/* <Text style={styles.errorMessage}>
                                    {this.state.error}
                                </Text> */}
                                <TextInput style={styles.input}
                                    placeholder="Enter username/email"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={ (text) => this.setState({username: text})}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                                <TextInput style={styles.input} 
                                    placeholder="Enter password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry
                                    autoCorrect={false}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={ (text) => this.setState({password: text})}
                                    onSubmitEditing={this.onLoginPressed.bind(this)}
                                    ref={"txtPassword"}
                                />
                                <Button block style={styles.buttonContainer}
                                onPress={this.onLoginPressed.bind(this)}
                                >
                                    <Text style={styles.buttonText}>SIGN IN</Text>
                                </Button>
                                
                            </View>
                        
                </KeyboardAvoidingView>
        
           
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D47A1',
        
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow:1,
    },
    logo: {
        width: 150,
        height: 100,

    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        // backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color :'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    errorMessage:{
        padding:5,
        textAlign: 'center',
        color :'#ff0033',
        fontWeight: 'bold',
        fontSize: 16
    },
    SpinnerContainer:{
        alignItems:'center',
        flex: 1,
        marginTop:10,
    },
    SpinnerText:{
        color:'rgba(255,255,255,0.8)',
        fontSize:13,
        padding:0,
        margin:0,
    }
})