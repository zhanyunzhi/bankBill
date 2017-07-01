/**
 * Created by ZYZ on 2017/5/16.
 * 网上找的loading组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Modal
    } from 'react-native';

import Menu from '../Menu';         //菜单
export default class launchImage extends Component {
    componentDidMount() {
        //定时：隔2s切换到Menu
        setTimeout(()=>{
            this.props.navigator.replace({
                component:Menu,
            });
        },1500);
    }

    render() {
        return(
            <View>
                <StatusBar
                    backgroundColor={'#00cc66'}
                    />
                <Image style={[styles.launch_image]} source={require('../../images/launch_image.png')}></Image>
            </View>

        );
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var baseWidth = 1080;
const styles = StyleSheet.create({
    launch_image: {
        width:width,
        height:1920*width/baseWidth,
    }
})