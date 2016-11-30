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
    AsyncStorage
} from 'react-native';

export default class NH extends Component {
    clickJump(){
        const{navigator} = this.props;
        if(navigator){
            //把当前页面pop掉 回到上一个页面
            navigator.pop();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.saveData} style={styles.welcome}>
                    存值:key='key',存shaoting
                </Text>
                <Text onPress={this.getValue} style={styles.welcome}>
                    取值
                </Text>
                <Text onPress={this.removeData} style={styles.welcome}>
                    删除数据
                </Text>
            </View>
        );
    }
    saveData(){
        try {
            AsyncStorage.setItem(
                'key',
                'shaoting',
                (error)=>{
                    if (error){
                        alert('存值失败:',error);
                    }else{
                        alert('存值成功!');
                    }
                }
            );
        } catch (error){
            alert('失败'+error);
        }
    }
    getValue(){
        try {
            AsyncStorage.getItem(
                'key',
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }else{
                        alert('取值成功:'+result);
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
    }
    removeData(){
        try {
            AsyncStorage.removeItem(
                'key',
                (error)=>{
                    if(!error){
                        alert('移除成功');
                    }
                }
            )
        }catch (error){
            alert('失败',+error);
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
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
