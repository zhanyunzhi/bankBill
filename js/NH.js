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
    TextInput,
    AsyncStorage
    } from 'react-native';

import Constants from './public/Constants.js';

export default class NH extends Component {
    constructor(props) {
        super(props);
        this.state={
            nhfkzh:'6228****1234',
            nhskzh:'6222****5678',
            nhskr:'张三',
            nhskyh:'平安银行',
            nhzzje:'1,000.00元',
        }
    }
    componentDidMount(){
        console.log(Constants.bankInputTextFlag);
        this.getValue('nhfkzh');
        this.getValue('nhskzh');
        this.getValue('nhskr');
        this.getValue('nhskyh');
        this.getValue('nhzzje');
    }
    clickJump(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();    //把当前页面pop掉 回到上一个页面
        }
    }
    saveDataToLocal(index){
        let k = index;
        let v = this.state[index];
        //let v = this.refs[index]._lastNativeText||this.refs[index].props.defaultValue;
        this.saveData(k, v);
    }
    saveData(k, v){
        try {
            AsyncStorage.setItem(k, v,
                (error)=>{
                    if (error){
                        console.log('存值失败:',error);
                    }else{
                        console.log('存值成功!');
                    }
                }
            );
        } catch (error){
            console.log('失败'+error);
        }
    }
    getValue(k){
        try {
            AsyncStorage.getItem(k,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        if(result){
                            switch (k) {
                                case 'nhfkzh':
                                    this.setState({nhfkzh:result})
                                    break;
                                case 'nhskzh':
                                    this.setState({nhskzh:result})
                                    break;
                                case 'nhskr':
                                    this.setState({nhskr:result})
                                    break;
                                case 'nhskyh':
                                    this.setState({nhskyh:result})
                                    break;
                                case 'nhzzje':
                                    this.setState({nhzzje:result})
                                    break;
                            }
                        }
                    }
                }
            )
        }catch(error){
            console.log('失败'+error);
        }
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
                        <TextInput style={styles.input} ref='nhfkzh' onBlur={()=>this.saveDataToLocal('nhfkzh')} onChangeText={(nhfkzh)=>this.setState({nhfkzh})} value={this.state.nhfkzh} underlineColorAndroid='transparent' placeholder="格式:6228****1234" keyboardType='numeric'/>
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款账户：</Text>
                        <TextInput style={styles.input} ref='nhskzh' onBlur={()=>this.saveDataToLocal('nhskzh')} onChangeText={(nhskzh)=>this.setState({nhskzh})} value={this.state.nhskzh} underlineColorAndroid='transparent' placeholder="格式:6222****5678" keyboardType='numeric'/>
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款人：</Text>
                        <TextInput style={styles.input} ref='nhskr' onBlur={()=>this.saveDataToLocal('nhskr')} onChangeText={(nhskr)=>this.setState({nhskr})} value={this.state.nhskr} underlineColorAndroid='transparent' placeholder="如:张三" />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收款银行：</Text>
                        <TextInput style={styles.input} ref='nhskyh' onBlur={()=>this.saveDataToLocal('nhskyh')} onChangeText={(nhskyh)=>this.setState({nhskyh})} value={this.state.nhskyh} underlineColorAndroid='transparent' placeholder="如:平安银行"/>
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderBottomColor:'transparent'}]}>
                        <Text style={[styles.text]}>转账金额：</Text>
                        <TextInput style={[styles.input,{color:'#ff6549'}]} ref='nhzzje' onBlur={()=>this.saveDataToLocal('nhzzje')} onChangeText={(nhzzje)=>this.setState({nhzzje})} value={this.state.nhzzje} underlineColorAndroid='transparent' placeholder="格式:1,000.00元" />
                    </View>
                    <View style={styles.border_b}></View>
                </View>
                <TouchableHighlight underlayColor="#ffffff" >
                    <Text style={{color:'#ff6549',marginHorizontal:17,marginTop:13,marginBottom:16,fontSize:13}}>您的资金已汇出，实际到账时间取决于收款行系统</Text>
                </TouchableHighlight>
                <View style={{flex:1,flexDirection:'row',marginHorizontal:17}}>
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
var baseWidth = 1080;

const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        justifyContent: 'center',
    },
    image:{
        width:width,
        height:586*width/baseWidth,
    },
    inputRow:{
        height:51,
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
        color: '#535353',
        fontSize:16
    },
    input:{
        flex:1,
        alignItems:'flex-start',
        marginRight: 17,
        color: '#535353',
        fontSize:16
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

