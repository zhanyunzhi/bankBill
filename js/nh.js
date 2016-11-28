/**
 * Created by user on 2016/11/28.
 * 农业银行支出的页面
 */
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
    TouchableHighlight
    } from 'react-native';

export default class NH extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.toMain}
                    underlayColor="green">
                    <Text style={styles.blackText}>{'主页<='}</Text>
                </TouchableHighlight>
            </View>
        );
    }
    toMain = () => {
        this.props.navigator.pop();
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

