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
    AsyncStorage,
    TouchableOpacity
    } from 'react-native';

import Common from './public/Common.js';
import EditView from './public/EditView.js';
import Constants from './public/Constants.js';

export default class GF extends Component {
    constructor(props) {
        super(props);
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        this.state={
            jhzh: '6214****1234',
            jhsr: '1,000.00',
            jhzc: '1,000.00',
            jhdfhm: '张三',
            jhdfzh: '6214850285268888',
            today: today,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            isIncome: true                                          //收入与支出切换
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
                        console.log('存值成功!'+v);
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
    openPop(title, value, flag){
        this.setState({popTitle:title});            //设置弹出框的title
        this.setState({popValue:value},function(){      //setState是异步的
            Constants.bankInputTextFlag = flag;
            this.editView.show();
        });            //设置弹出框的内容
    }
    setPopValue(v){
        v = v || '您没有输入任何内容';
        this.setState({popValue:v});        //保存输入的内容
        let flag = Constants.bankInputTextFlag;         //获取修改的是那个输入框
        switch (flag) {
            case 'jhzh':
                v = Common.formatBankNum(v) || this.state.jhzh;
                this.setState({jhzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jhsr':
                v = Common.formatBankMoney(v) || this.state.jhsr;         //将输入的数字格式化
                this.setState({jhsr:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                })
                break;
            case 'jhzc':
                v = Common.formatBankMoney(v) || this.state.jhzc;          //将输入的数字格式化
                this.setState({jhzc:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                })
                break;
            case 'jhdfhm':
                this.setState({jhdfhm:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                })
                break;
            case 'jhdfzh':
                v = Common.checkBankNum(v) || this.state.jhdfzh;
                this.setState({jhdfzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                })
                break;
        }
    }
    switch(){               //改变收入或者支出
        this.setState({isIncome:!this.state.isIncome});
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
                        <Text style={[styles.top_text]}>第1/1页，共1条符合条件的记录。</Text>
                    </View>
                    <View style={[styles.inputRow,styles.center,{marginBottom:13,borderRadius:5,height:56}]} >
                        <Text style={[styles.text]}>账户</Text>
                        <TouchableOpacity onPress={()=>this.openPop('格式：6214****1234',this.state.jhzh,'jhzh')} style={[styles.text_touch]}>
                            <Text style={[styles.text_touch_text]}>{this.state.jhzh}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
                        <Text style={[styles.text]}>交易日期</Text>
                        <Text style={[styles.text_right]}>{this.state.today}</Text>
                    </View>
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>币种</Text>
                        <Text style={[styles.text_right]}>人民币</Text>
                    </View>
                    {this.state.isIncome == true ? (
                        <View style={[styles.inputRow,styles.center]}>
                            <TouchableOpacity onPress={()=>this.switch()}>
                                <Text style={[styles.text]}>收入</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.jhsr,'jhsr')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text,{color:'#ff0000'}]}>{this.state.jhsr}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.inputRow,styles.center]}>
                            <TouchableOpacity onPress={()=>this.switch()}>
                                <Text style={[styles.text]}>支出</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.jhzc,'jhzc')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text,{color:'#80c797'}]}>{this.state.jhzc}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {this.state.isIncome == true ? (
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>交易渠道</Text>
                            <Text style={[styles.text_right]}>网上支付跨行清算系统</Text>
                        </View>
                    ) : (
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>交易渠道</Text>
                            <Text style={[styles.text_right]}>客户端手机银行渠道</Text>
                        </View>
                    )}
                    {this.state.isIncome == true ? (
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>交易说明</Text>
                            <Text style={[styles.text_right]}>网银入账</Text>
                        </View>
                    ) : (
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>交易说明</Text>
                            <Text style={[styles.text_right]}>网上扣款</Text>
                        </View>
                    )}
                    <View style={[styles.inputRow,styles.center]}>
                        <Text style={[styles.text]}>对方户名</Text>
                        <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.jhdfhm,'jhdfhm')} style={[styles.text_touch]}>
                            <Text style={[styles.text_touch_text]}>{this.state.jhdfhm}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputRow,styles.center,{borderBottomLeftRadius:5,borderBottomRightRadius:5,marginBottom:80}]}>
                        <Text style={[styles.text]}>对方账号</Text>
                        <TouchableOpacity onPress={()=>this.openPop('格式：6214850285268888',this.state.jhdfzh,'jhdfzh')} style={[styles.text_touch]}>
                            <Text style={[styles.text_touch_text]}>{this.state.jhdfzh}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.top_text,{marginBottom:88}]}>第1/1页，共1条符合条件的记录。</Text>
                    </View>
                    <Image style={[styles.image_bottom,{position:'absolute',bottom:0,left:0}]} source={require('../images/gf-bottom.png')}></Image>

                    <EditView
                        // 在组件中使用this.editView即可访拿到EditView组件
                        ref={editView => this.editView = editView}
                        inputText={this.state.popValue}
                        titleTxt={this.state.popTitle}
                        ensureCallback={popValue => this.setPopValue(popValue)}
                        />
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
        //backgroundColor: '#eee',
        fontSize:16,
        paddingLeft:10,
    },
    text_touch:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        paddingRight:10,
    },
    text_touch_text:{
        color: '#848484',
        fontSize:16,
    },
    text_right:{
        color: '#848484',
        fontSize:16,
        paddingRight:10,
    },
    top_text:{
        fontSize:16,
        color:'#0d0d0d',
        marginHorizontal:20,
        marginVertical:28
    }
});

