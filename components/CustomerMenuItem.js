import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { Toast,Container,Thumbnail,Content,Card ,CardItem, Body} from 'native-base';
export default class CustomerMenuItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      animatePress : new Animated.Value(1),
    }
    // console.log(this.props);
    // console.log(this.props.params);
  }
  animateIn(){
    Animated.timing(this.state.animatePress, {
      toValue:0.6,
      duration:500,
    }).start()
  }

  animateOut(){
    Animated.timing(this.state.animatePress, {
      toValue:1,
      duration:500,
    }).start()
  }

  itemPressed(){
    let customer = this.props.customerData;
    Toast.show({
      text: customer.id,
      position: 'bottom',
      type:'success',
      buttonText: 'OK',
      duration:5000
    })
   
  }

  render() {
    let customer = this.props.customerData;
    const {screenWidth} = this.props;
    return(
      <Container style={styles.container}>
        <Content>
       
        <View style={{width:screenWidth,height:200
        }}>
          <Card>
            <CardItem>
            <Image source={{uri: 'https://global.jsilogistics.com/wms/images/wms-customer-'+customer.id+'.png'}}
            style={{width: screenWidth, height: 130, flex:1}} />
            </CardItem>
            <CardItem style={{backgroundColor:'#f7c744'}}>
            <Body>
            <Text style={styles.textTitle}>{customer.customerAlias}</Text>
            </Body>
            </CardItem>
          </Card>
          </View>
       
        </Content>
       
       {/* <View style={{backgroundColor:'#f7c744',width:screenWidth}}>
            <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{customer.id}</Text>
            </View>
            
       </View> */}
       
      </Container>
       
    )
  }
}
const styles = StyleSheet.create({
    container:{
      margin:15,
      height:200,
    },
    titleContainer:{
        padding:5,
        
    },
    textTitle:{
        color:'black',
    }
})

