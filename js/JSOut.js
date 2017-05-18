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

export default class JSOut extends Component {
    constructor(props) {
        super(props);
        this.state={
            jsoutzzje:'1,000.00',
            jsoutskzh:'6222****5678',
            jsoutskzhxm:'王老五',
            jsoutskyh:'平安银行',
            jsoutfkzh:'6222****1234',
            jsoutfkzhye:'1,000.00',
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            seeMore: true       //查看更多和点击收起切换
        }
    }
    componentDidMount(){
        this.getValue('jsoutzzje');
        this.getValue('jsoutskzh');
        this.getValue('jsoutskzhxm');
        this.getValue('jsoutskyh');
        this.getValue('jsoutfkzh');
        this.getValue('jsoutfkzhye');
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
                                case 'jsoutzzje':
                                    this.setState({jsoutzzje:result})
                                    break;
                                case 'jsoutskzh':
                                    this.setState({jsoutskzh:result})
                                    break;
                                case 'jsoutskzhxm':
                                    this.setState({jsoutskzhxm:result})
                                    break;
                                case 'jsoutskyh':
                                    this.setState({jsoutskyh:result})
                                    break;
                                case 'jsoutfkzh':
                                    this.setState({jsoutfkzh:result})
                                    break;
                                case 'jsoutfkzhye':
                                    this.setState({jsoutfkzhye:result})
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
            case 'jsoutzzje':
                v = Common.formatBankMoney(v) || this.state.jsoutzzje;
                this.setState({jsoutzzje:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jsoutskzh':
                v = Common.formatBankNum(v) || this.state.jsoutskzh;
                this.setState({jsoutskzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jsoutskzhxm':
                this.setState({jsoutskzhxm:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jsoutskyh':
                this.setState({jsoutskyh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jsoutfkzh':
                v = Common.formatBankNum(v) || this.state.jsoutfkzh;
                this.setState({jsoutfkzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'jsoutfkzhye':
                v = Common.formatBankMoney(v) || this.state.jsoutfkzhye;
                this.setState({jsoutfkzhye:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
        }
    }
    openMore(){               //改变收入或者支出
        this.setState({seeMore:!this.state.seeMore});
    }

    render(){
        return(
            <ScrollView style={[{backgroundColor:'#ffffff'}]}>
                <TouchableHighlight
                    onPress={this.clickJump.bind(this)}
                    >
                    <Image source={require('../images/js-out-title.png')} style={styles.img_title}/>
                </TouchableHighlight>
                <View>
                    <Text style={styles.account_t}>转账提交成功</Text>
                    <Text style={styles.account_c}>一般情况下，资金实时转入收款行，实际转入收款账户时间取决于收款行处理情况。如有疑问，请咨询收款行。</Text>
                </View>
                <View style={[styles.input_row]}>
                    <Text style={[styles.input_row_text]}>转账金额</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.jsoutzzje,'jsoutzzje')} style={[styles.input_row_touch]}>
                        <Text style={[styles.input_row_touch_text]}>{this.state.jsoutzzje}元</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.input_row]}>
                    <Text style={[styles.input_row_text]}>收款账户</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>this.openPop('格式：王老五',this.state.jsoutskzhxm,'jsoutskzhxm')} style={[styles.input_row_touch]}>
                            <Text style={[styles.input_row_touch_text,{marginRight:8}]}>{this.state.jsoutskzhxm}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：1234****1234',this.state.jsoutskzh,'jsoutskzh')} style={[styles.input_row_touch]}>
                            <Text style={[styles.input_row_touch_text]}>{this.state.jsoutskzh}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.seeMore == true ? (
                <View style={[styles.input_row]}>
                    <Text style={[styles.input_row_text]}>收款银行</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：农业银行',this.state.jsoutskyh,'jsoutskyh')} style={[styles.input_row_touch]}>
                        <Text style={[styles.input_row_touch_text]}>{this.state.jsoutskyh}</Text>
                    </TouchableOpacity>
                </View>
                ) : ( null )}
                {this.state.seeMore == true ? (
                <View style={[styles.input_row]}>
                    <Text style={[styles.input_row_text]}>付款账户</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1234****1234',this.state.jsoutfkzh,'jsoutfkzh')} style={[styles.input_row_touch]}>
                        <Text style={[styles.input_row_touch_text]}>{this.state.jsoutfkzh}</Text>
                    </TouchableOpacity>
                </View>
                ) : ( null )}
                {this.state.seeMore == true ? (
                <View style={[styles.input_row]}>
                    <Text style={[styles.input_row_text]}>付款账户余额</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.jsoutfkzhye,'jsoutfkzhye')} style={[styles.input_row_touch]}>
                        <Text style={[styles.input_row_touch_text]}>{this.state.jsoutfkzhye}元</Text>
                    </TouchableOpacity>
                </View>
                ) : ( null )}
                {this.state.seeMore == true ? (
                <TouchableHighlight
                    onPress={this.openMore.bind(this)}
                    >
                    <Image source={require('../images/js-out-bottom.png')} style={styles.img_bottom}/>
                </TouchableHighlight>
                ) : (
                <TouchableHighlight
                    onPress={this.openMore.bind(this)}
                    >
                    <Image source={require('../images/js-out-bottom1.png')} style={styles.img_bottom1}/>
                </TouchableHighlight>
                )}
                <EditView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView => this.editView = editView}
                    inputText={this.state.popValue}
                    titleTxt={this.state.popTitle}
                    ensureCallback={popValue => this.setPopValue(popValue)}
                    />
            </ScrollView>
        )
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var baseWidth = 1080;
var blue = '#09b6f2';
var gray6 = '#666666';
var gray3 = '#333333';
var borderColor = '#dddddd';

const styles = StyleSheet.create({
    img_title: {
        width:width,
        height:474*width/baseWidth,
    },
    img_bottom: {
        width:width,
        height:312*width/baseWidth,
        marginTop:14,
    },
    img_bottom1: {
        width:width,
        height:300*width/baseWidth,
        marginTop:12,
    },
    account_t: {
        textAlign: 'center',
        fontSize: 20,
        color: blue,
        marginTop: 20,
        letterSpacing: 5,
    },
    account_c: {
        textAlign: 'left',
        fontSize: 14,
        color: gray6,
        marginTop: 10,
        marginBottom: 20,
        letterSpacing: 5,
        lineHeight: 30,
        marginHorizontal: 26,
    },
    input_row: {
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: borderColor,
        paddingVertical:10,
    },
    input_row_text: {
        color: gray3,
        //width: 100,
    },
    input_row_touch: {
        //flex: 1,
    },
    input_row_touch_text: {
        color: gray6,
    }

});
