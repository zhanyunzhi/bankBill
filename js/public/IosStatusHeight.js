
/**
 * Created by ZYZ on 2017/6/10.
 * 为ios统一加状态栏的高度
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    } from 'react-native';

export default class IosStatusHeight extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {bgColor} = this.props;
        return (
        	<View style={[styles.status,{backgroundColor:bgColor}]}></View>
        )
    }
}

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    status: {
        height:20,
        width:width
    },
    
})