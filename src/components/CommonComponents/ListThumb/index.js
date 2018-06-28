import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Button,
  Icon
} from 'native-base';
import { observer, inject } from 'mobx-react/native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import IconMI from 'react-native-vector-icons/MaterialIcons';

@inject("view.app", "domain.user", "app", "routerActions")
class ListThumb extends Component {
  render() {
    const navigation = this.props.navigation;
    var thumbWidth = deviceWidth/2;
    var thumbHeight = (deviceHeight/2)-5;
  
    
    return (
      <View style={{height: thumbHeight, width: thumbWidth}}>
        <Card style={{ shadowOpacity: 0, margin:0}}>
          <CardItem button onPress={() => navigation.navigate("ProductPage",{
            sku : this.props.productSku
          })} style={{flex: 1, flexDirection: 'column',padding:0}}>
            <Image style={{flex: 3,resizeMode: 'contain', height:100, width:100}} source={{uri: "https://www.sandler.com/sites/default/files/styles/large/public/Rules%20book%20301Wx197H.png"}}/>
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10,  width: thumbWidth}}>
              <View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: thumbWidth, marginTop: 10}}>
                  <Text style={{fontSize: 13, fontWeight: '300', color: '#555'}}>{this.props.brand}</Text>
                  <Button transparent>
                    <IconMI style={{color:'#696D79', fontSize: 24, marginTop: -20, marginRight: 4}} name='bookmark-border'/>
                  </Button>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{fontSize: 13, fontWeight: '500', color: '#555'}}>{this.props.discountedPrice}</Text>
                  <Text style={{fontSize: 11, fontWeight: '300', color: '#888', marginLeft: 2, textDecorationLine: 'line-through'}}>{this.props.price}</Text>
                  <Text style={{fontSize: 11, fontWeight: '300', color: '#7468C5', marginLeft: 2}}>{this.props.discount} Off</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{fontSize: 11, fontWeight: '300', color: '#888', marginBottom: 4}} numberOfLines={1} ellipsizeMode='tail'>{this.props.description}</Text>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }
}
export default ListThumb;
