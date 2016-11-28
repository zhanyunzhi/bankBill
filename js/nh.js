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
    constructor(props) {
        super(props);
        this.state={
        }
    }
    clickJump(){
        const{navigator} = this.props;
        if(navigator){
            //把当前页面pop掉 回到上一个页面
            navigator.pop();
        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.title
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>我是农行{this.state.title}</Text>
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

