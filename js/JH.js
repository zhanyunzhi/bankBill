/**
 * Created by user on 2016/11/28.
 * 建行
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes  } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

export default class NH extends Component {
    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.toDetail}
                    underlayColor="#B5B5B5">
                    <Text style={styles.blackText}>=>详情页</Text>
                </TouchableHighlight>
            </View>
        );
    }
    toDetail = () => {          //必须这样写否则出错
        this.props.navigator.push({id:"detail"});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
