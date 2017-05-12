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

export default class GF extends Component {
    constructor(props) {
        super(props);
        this.state={
            jhzh:'6214****1234',
            jhsr:'1,000.00',
            jhzc:'1,000.00',
            jhdfhm:'张三',
            jhdfzh:'6214850285268888',
        }
    }
    componentDidMount(){
        this.getValue('jhzh');
        this.getValue('jhsr');
        this.getValue('jhzc');
        this.getValue('jhdfhm');
        this.getValue('jhdfzh');
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
                                case 'jhzh':
                                    this.setState({jhzh:result})
                                    break;
                                case 'jhsr':
                                    this.setState({jhsr:result})
                                    break;
                                case 'jhzc':
                                    this.setState({jhzc:result})
                                    break;
                                case 'jhdfhm':
                                    this.setState({jhdfhm:result})
                                    break;
                                case 'jhdfzh':
                                    this.setState({jhdfzh:result})
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
            <ScrollView style={[{backgroundColor:'#f1f1f1'}]}>
                <View style={[{backgroundColor:'#f1f1f1'}]}>
                    <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                        <Image style={[styles.image_top]} source={require('../images/gf-title.png')}></Image>
                    </TouchableHighlight>
                    <View>
                        <Text style={[styles.top_text]}>第1/1页，共1条符合条件的记录</Text>
                    </View>
                    <View style={[styles.inputRow,styles.center,{marginBottom:13,borderRadius:5,height:56}]} >
                        <Text style={[styles.text]}>账户</Text>
                        <TextInput style={styles.input} ref='jhzh' onEndEditing={()=>this.saveDataToLocal('jhzh')} onChangeText={(jhzh)=>this.setState({jhzh})} value={this.state.jhzh} underlineColorAndroid='transparent' placeholder="格式:6228****1234" keyboardType='numeric'/>
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
                        <Text style={[styles.text]}>交易日期</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>币种</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' value={'人民币'} />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>收入</Text>
                        <TextInput style={[styles.input,{color:'#ff0000'}]} ref='jhsr' onEndEditing={()=>this.saveDataToLocal('jhsr')} onChangeText={(jhsr)=>this.setState({jhsr})} value={this.state.jhsr} underlineColorAndroid='transparent' placeholder="格式:6222****5678" keyboardType='numeric'/>
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>支出</Text>
                        <TextInput style={[styles.input,{color:'#80c797'}]} ref='jhzc' onEndEditing={()=>this.saveDataToLocal('jhzc')} onChangeText={(jhzc)=>this.setState({jhzc})} value={this.state.jhzc} underlineColorAndroid='transparent' placeholder="如:张三" />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>交易渠道</Text>
                        <Text style={[styles.text]}>交易渠道</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' value={'网上支付跨行清算'} />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>交易渠道</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' value={'客户端手机银行渠道'} />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>交易说明</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' value={'网银入账'} />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>交易渠道</Text>
                        <TextInput style={styles.input}  underlineColorAndroid='transparent' value={'网上扣款'} />
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>对方户名</Text>
                        <TextInput style={styles.input} ref='jhdfhm' onEndEditing={()=>this.saveDataToLocal('jhdfhm')} onChangeText={(jhdfhm)=>this.setState({jhdfhm})} value={this.state.jhdfhm} underlineColorAndroid='transparent' placeholder="如:平安银行"/>
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderBottomLeftRadius:5,borderBottomRightRadius:5,marginBottom:80}]}>
                        <Text style={[styles.text]}>对方账号</Text>
                        <TextInput style={[styles.input]} ref='jhdfzh' onEndEditing={()=>this.saveDataToLocal('jhdfzh')} onChangeText={(jhdfzh)=>this.setState({jhdfzh})} value={this.state.jhdfzh} underlineColorAndroid='transparent' placeholder="格式:1,000.00元" />
                    </View>
                    <View>
                        <Text style={[styles.top_text,{marginBottom:88}]}>第1/1页，共1条符合条件的记录</Text>
                    </View>
                    <Image style={[styles.image_bottom,{position:'absolute',bottom:0,left:0}]} source={require('../images/gf-bottom.png')}></Image>
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
        justifyContent: 'space-between',
    },
    image_top:{
        width:width,
        height:151*width/baseWidth,
    },
    image_bottom:{
        width:width,
        height:180*width/baseWidth,
    },
    inputRow:{
        height:45,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        marginHorizontal:10,
        //backgroundColor: '#ffffff'
    },
    text:{
        width:100,
        textAlign:'left',
        color: '#0d0d0d',
        fontSize:16,
        paddingLeft:10,
    },
    input:{
        flex:1,
        textAlign:'right',
        alignItems:'flex-start',
        color: '#848484',
        //backgroundColor: '#656478',
        paddingRight:10,
        fontSize:16,
        borderStyle:'solid',
        borderColor:'red',
        borderWidth:1,
    },
    top_text:{
        fontSize:16,
        color:'#0d0d0d',
        marginHorizontal:20,
        marginVertical:28
    }
});

