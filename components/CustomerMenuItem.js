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
import { Container,Thumbnail,Content,Card ,CardItem, Body} from 'native-base';
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
  render() {
    let customer = this.props.customerData;
    const {screenWidth} = this.props;
    return(
      <Container style={styles.container}>
        <Content>
        <TouchableWithoutFeedback onPressIn={()=>this.animateIn()} onPressOut={()=>this.animateOut()} >
        <Animated.View style={{width:screenWidth,height:200,transform:[{
          scale:this.state.animatePress
        }]
        }}>
          <Card>
            <CardItem>
            <Image source={{uri: 'https://global.jsilogistics.com/wms/images/wms-customer-'+customer.id+'.png'}}
            style={{width: screenWidth, height: 130, flex:1}} />
            </CardItem>
            <CardItem style={{backgroundColor:'#f7c744'}}>
            <Body>
            <Text style={styles.textTitle}>{customer.id}</Text>
            </Body>
            </CardItem>
          </Card>
          </Animated.View>
        </TouchableWithoutFeedback>
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

