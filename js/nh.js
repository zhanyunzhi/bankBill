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
    TouchableHighlight,
    ScrollView,
    TextInput
    } from 'react-native';

export default class NH extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    clickJump(){
        console.log(1)
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
            <ScrollView style={[{backgroundColor:'#f7f3f7'}]}>
                <View style={[{backgroundColor:'#ffffff'}]}>
                    <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                        <Image style={[styles.image]} source={require('../images/nh-title.png')}></Image>
                    </TouchableHighlight>
                    <View style={styles.border_b}></View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>付款账户：</Text>
                        <TextInput style={styles.input} underlineColorAndroid='transparent' placeholder="请输入付款账户" value='45122'/>
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款账户：</Text>
                        <TextInput style={styles.input} underlineColorAndroid='transparent' placeholder="请输入收款账户" />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款人：</Text>
                        <TextInput style={styles.input} underlineColorAndroid='transparent' placeholder="请输入收款人" />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款银行：</Text>
                        <TextInput style={styles.input} underlineColorAndroid='transparent' placeholder="请输入收款银行" />
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderBottomColor:'transparent'}]}>
                        <Text style={[styles.text]}>转账金额：</Text>
                        <TextInput style={styles.input} underlineColorAndroid='transparent' placeholder="请输入转账金额" />
                    </View>
                    <View style={styles.border_b}></View>
                </View>
                <View>
                    <Text style={{color:'#ff6549',marginLeft:17,marginRight:17,marginTop:13,marginBottom:16,fontSize:13}}>您的资金已汇出，实际到账时间取决于收款行系统</Text>
                </View>
                <View style={{flex:1,flexDirection:'row', marginLeft:17,marginRight:17}}>
                    <TouchableHighlight underlayColor="#38adff" style={{flex:1}}>
                        <View style={[styles.btn,styles.center,{backgroundColor: '#dddddd'}]}>
                            <Text style={{color:'#fff',fontSize:16}}>继续转账</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#38adff"  style={{flex:1,marginLeft:12}}>
                        <View style={[styles.btn,styles.center]}>
                            <Text style={{color:'#fff',fontSize:16}}>完成</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        justifyContent: 'center',
    },
    image:{
        width:width,
        height:586*width/1080,
    },
    inputRow:{
        height:50,
        flexDirection:'row',
        borderWidth:1,
        borderColor: 'transparent',
        borderBottomColor:'#e5e5e5',
        marginLeft: 17,
        //backgroundColor: '#ffffff'
    },
    text:{
        width:80,
        textAlign:'left',
        color: '#535353'
    },
    input:{
        flex:1,
        alignItems:'flex-start',
        marginRight: 17,
        color: '#535353',
        fontSize:14
    },
    border_b:{
        borderBottomColor:'#e5e5e5',
        borderBottomWidth: 1
    },
    btn:{
        height:45,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#ffa900',
        borderRadius: 5
    }
});

