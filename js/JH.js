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
} from 'react-native';

export default class NH extends Component {
    clickJump(){
        const{navigator} = this.props;
        if(navigator){
            //把当前页面pop掉 回到上一个页面
            navigator.pop();
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>我是建行</Text>
                <TouchableHighlight
                    underlayColor="rgb(181, 136, 254)"
                    activeOpacity={0.5}
                    style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
                    onPress={this.clickJump.bind(this)}
                    >
                    <Text>点击返回菜单</Text>
                </TouchableHighlight>
            </View>
        )
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
