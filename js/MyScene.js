/**
 * Created by user on 2016/11/28.
 * 导航菜单
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Navigator,
} from 'react-native';

import launchImage from './public/launchImage';         //模拟启动页
import Menu from './Menu';         //菜单
import Constants from './public/Constants.js';

export default class MyScene extends Component {
    render() {
        let defaultName = '菜单';
        let defaultComponent = Menu;
        if(Constants.PLATFORM == 'android'){
            defaultComponent = launchImage;
        }


        return (
            <Navigator
                styles = {styles.container}
                initialRoute = {{name: defaultName,component : defaultComponent}}
                configureScene = {
                    (route)=>{
                      return Navigator.SceneConfigs.FloatFromRight
                    }
                }
                renderScene = {(route,navigator)=>{
                  let Component = route.component;
                  return <Component {...route.params} navigator={navigator}/>
                }}
                />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    button: {
        padding: 15,
    },
    containView:{
        flex: 1,
        justifyContent: 'center',
    },
    detailContainView:{
        flex:1,
        justifyContent: 'center',
        backgroundColor:'green',
    },
    blackText:{
        fontSize:20,
        textAlign:'center',
    },
});