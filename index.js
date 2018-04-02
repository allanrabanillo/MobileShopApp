import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base';
import App from './App';

class Main extends Component {
    

    render(){
        
        return (
            <Root>
            <App /> 
            </Root>
            
        )
    }
}

AppRegistry.registerComponent('JSIMobileShop', () => Main);


