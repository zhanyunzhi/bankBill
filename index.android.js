/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    } from 'react-native';
import MyScene from './js/MyScene';   //导航菜单
/*import NH from './js/NH';             //农行
import JH from './js/JH';             //建行*/

export default class bankBill extends Component {
  render() {
    return (
        <MyScene />
    )
  }
}
let Dimensions = require('Dimensions');
let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bankBill', () => bankBill);
