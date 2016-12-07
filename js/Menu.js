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
    TouchableHighlight
    } from 'react-native';

import NH from './NH';             //农行
import GF from './GF';             //农行
import JH from './JH';             //建行

export default class Menu extends Component {
    /*constructor(props){
        super(props);
        this.state={
            title :"title哈哈"
        }
    }*/
    componentDidMount(){
        this.clickJump('gf');
    }
    clickJump(index){
        //因为Navigator <Component {...route.params} navigator={navigator} />传入了navigator 所以这里能取到navigator
        const{navigator} = this.props;
        let jumpComponent = NH;
        if(navigator){
            switch(index) {
                case 'nh':
                    jumpComponent = NH;
                    break;
                case 'gf':
                    jumpComponent = GF;
                    break;
                case 'jh':
                    jumpComponent = JH;
                    break;
            }
            navigator.push({
                name : "SecondPageComponent",
                component : jumpComponent,
                params : {
                    title: '标题'
                }
            })
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor="rgb(181, 136, 254)"
                    activeOpacity={0.5}
                    style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
                    onPress={this.clickJump.bind(this,'nh')}
                    >
                    <Text>点击进入农行</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="rgb(181, 136, 254)"
                    activeOpacity={0.5}
                    style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
                    onPress={this.clickJump.bind(this,'gf')}
                    >
                    <Text>点击进入广发银行</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="rgb(181, 136, 254)"
                    activeOpacity={0.5}
                    style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
                    onPress={this.clickJump.bind(this,'jh')}
                    >
                    <Text>点击进入建行</Text>
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
        padding: 85,
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

