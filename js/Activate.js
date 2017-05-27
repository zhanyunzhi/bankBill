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
    Clipboard,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    ToastAndroid,
    } from 'react-native';

import Common from './public/Common.js';
import ShowView from './public/ShowView.js';
import Constants from './public/Constants.js';
import Request from './public/Request.js';

export default class Activate extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeNum:'',              //激活码输入提示
            popValue: '购买激活码请加微信客服：clicli168_kf',                                          //弹出框的输入内容
            popTitle: '关于激活码',                      //弹出框的title
        }
    }
    componentDidMount(){
    }
    clickJump(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();    //把当前页面pop掉 回到上一个页面
        }
    }
    openPop(title, value){
        this.setState({popTitle:title});            //设置弹出框的title
        this.setState({popValue:value},function(){
            this.showView.show();
        });            //设置弹出框的内容
    }
    sendMsg(){              //发送激活码
        console.log(this.state.activeNum)
        Request.fetchRequest('thinkphp5.0/public/index/index/rn?id='+this.state.activeNum,'GET','','',10000)
        .then(res => {
                console.log(res);
        })
        .catch((err) => {
                console.log(err);
        });
        console.log("用户点击了激活按钮");
    }
    _setContent(t) {             //设置剪贴板的文本内容
        Clipboard.setString(t);
        ToastAndroid.show('已复制到剪贴板', ToastAndroid.SHORT);
        Clipboard.getString().then(function(msg){
            console.log(msg)
        });
    }
    render(){
        return(
            <View style={styles.wrap}>
                <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                    <Image style={[styles.image]} source={require('../images/wx-title.png')}></Image>
                </TouchableHighlight>
                <TextInput
                        style={styles.inputStyle}
                        placeholder='请输入32位激活码'
                        value={this.state.activeNum}
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({activeNum:text})}
                        />
                <TouchableOpacity
                    onPress={()=>this.sendMsg()}
                    >
                    <Text style={styles.btnBig}>激活</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.openPop('关于激活码','购买激活码请加微信客服：clicli168_kf，点击“确定”可复制微信号')}
                    >
                    <Text style={styles.how_active}>
                        如何激活?
                    </Text>
                </TouchableOpacity>
                <ShowView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={showView => this.showView = showView}
                    inputText={this.state.popValue}
                    titleTxt={this.state.popTitle}
                    ensureCallback={() => this._setContent('clicli168_kf')}
                    />
            </View>
        )
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var baseWidth = 1080;

const styles = StyleSheet.create({
    image:{
        width:width,
        height:540*width/baseWidth,
    },
    wrap:{
        backgroundColor:'#f4f4f4',
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems:'center',
        minHeight:height,
    },
    inputStyle:{
        fontSize:16,
        height:44,
        color:'#000',
        width:width,
        padding:0,
        paddingBottom:10,
        paddingTop:10,
        paddingLeft:10,
        marginTop:20,
        borderBottomWidth:1,
        borderColor:'#d9d9d9',
        backgroundColor:'#ffffff',
    },
    btnBig:{
        fontSize:20,
        width:width-40,
        height:44,
        paddingTop:8,
        marginTop:16,
        textAlign:'center',
        backgroundColor:'#2C934E',
        color:'#ffffff',
        borderRadius:6,
    },
    how_active:{
        marginTop:10,
        color:'#5f8fe8',
        width:width-40,
        textAlign:'right',
    }

});

