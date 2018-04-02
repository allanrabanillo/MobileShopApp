

import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView,AsyncStorage,Modal
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Root,Toast, Spinner } from 'native-base';

const ACCESS_TOKEN = 'access-token';

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

    async getToken(){
        try{
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log("TOKEN: " +token)
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
        let url = "https://36d18cf7.ngrok.io/MobileShopAPI/auth/login";
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
            let responseJson = await response.json();
            if(responseJson.status == 200){
                // this.setState({error:""});
                this.setState({loading:false});
                let accessToken = responseJson.token;
                this.storeToken(accessToken);
                console.log("Access Token: " + accessToken);
                // this.props.navigation.navigate('Home',responseJson);
                this.props
               .navigation
               .dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home', params:responseJson})
                    ]
                  }));
            }else{
                this.setState({loading:false});
                let error = responseJson.message;
                throw error;
            }
            console.log(responseJson);
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
    }


    render() {
        return (
            
            
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.mainContainer}>
                            <Modal
                            transparent={true}
                            animationType={'none'}
                            visible={this.state.loading}>
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
                                    onChangeText={ (text) => this.setState({username: text})}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                                <TextInput style={styles.input} 
                                    placeholder="Enter password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry
                                    autoCorrect={false}
                                    onChangeText={ (text) => this.setState({password: text})}
                                    onSubmitEditing={this.onLoginPressed.bind(this)}
                                    ref={"txtPassword"}
                                />
                                <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.onLoginPressed.bind(this)}
                                >
                                    <Text style={styles.buttonText}>SIGN IN</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
           
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2979FF',
        flexDirection: 'column',
    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginBottom:150
    },
    logo: {
        width: 150,
        height: 90,

    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 250,
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
        backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
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