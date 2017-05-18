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
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        this.state={
            painfkr:'王老五',               //平安转入开始
            painfkzh:'6214850285268888',
            painfkh:'农业银行',
            painskr:'张三',
            painskzh:'6222****1234',
            painskh:'平安银行深圳布吉支行',
            painje:'1,000.00',
            painzhye:'10,000.00',
            painzy:'跨行转账',
            painly:'跨行转出',              //平安转入结束
            jsoutfkzhye:'平安银行深圳布吉支行',
            today: today,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            isIncome: true       //转出和转入切换开关
        }
    }
    componentDidMount(){
        this.getValue('painfkr');           //平安转入开始
        this.getValue('painfkzh');
        this.getValue('painfkh');
        this.getValue('painskr');
        this.getValue('painskzh');
        this.getValue('painskh');
        this.getValue('painje');
        this.getValue('painzhye');
        this.getValue('painzy');
        this.getValue('painly');            //平安转入结束
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
                                case 'painfkr':         //平安转入开始
                                    this.setState({painfkr:result})
                                    break;
                                case 'painfkzh':
                                    this.setState({painfkzh:result})
                                    break;
                                case 'painfkh':
                                    this.setState({painfkh:result})
                                    break;
                                case 'painskr':
                                    this.setState({painskr:result})
                                    break;
                                case 'painskzh':
                                    this.setState({painskzh:result})
                                    break;
                                case 'painskh':
                                    this.setState({painskh:result})
                                    break;
                                case 'painje':
                                    this.setState({painje:result})
                                    break;
                                case 'painzhye':
                                    this.setState({painzhye:result})
                                    break;
                                case 'painzy':
                                    this.setState({painzy:result})
                                    break;
                                case 'painly':
                                    this.setState({painly:result})
                                    break;              //平安转入结束
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
            case 'painfkr':           //付款人   平安转入开始
                this.setState({painfkr:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painfkzh':
                v = Common.checkBankNum(v) || this.state.painfkzh;
                this.setState({painfkzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painfkh':
                this.setState({painfkh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painskr':
                this.setState({painskr:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painskzh':
                v = Common.formatBankNum(v) || this.state.painskzh;
                this.setState({painskzh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painskh':
                this.setState({painskh:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painje':
                v = Common.formatBankMoney(v) || this.state.painje;
                this.setState({painje:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                    alert('请修改您的余额，确保您的余额大于本次转入的金额');
                });
                break;
            case 'painzhye':
                v = Common.formatBankMoney(v) || this.state.painzhye;
                this.setState({painzhye:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painzy':
                this.setState({painzy:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
            case 'painly':
                this.setState({painly:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;              //平安转入结束
            case 'jsoutfkzhye':
                v = Common.formatBankMoney(v) || this.state.jsoutfkzhye;
                this.setState({jsoutfkzhye:v},function(){
                    this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
                });
                break;
        }
    }
    switch(){               //改变收入或者支出
        this.setState({isIncome:!this.state.isIncome});
    }

    render(){
        return(
            <View style={[{backgroundColor:'#ffffff'}]}>
                <TouchableHighlight
                    onPress={this.clickJump.bind(this)}
                    >
                    <Image source={require('../images/pa-title.png')} style={styles.img_title}/>
                </TouchableHighlight>
                <ScrollView>
                    <View style={styles.wrap}>
                    <View style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>交易时间：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.today}</Text>
                    </View>
                    <TouchableOpacity onPress={this.switch.bind(this)} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>交易类型：</Text>
                        {this.state.isIncome == true ? (
                        <Text style={[styles.row_text, styles.row_text_r, {color:'#DD5522'}]}>转入</Text>
                        ) : (
                        <Text style={[styles.row_text, styles.row_text_r, {color:'#2C934E'}]}>转出</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：王老五',this.state.painfkr,'painfkr')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>付  款  人：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painfkr}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：6214850285268888',this.state.painfkzh,'painfkzh')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>付款账号：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painfkzh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：农业银行',this.state.painfkh,'painfkh')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>付  款  行：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painfkh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.painskr,'painskr')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>收  款  人：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painskr}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：6222****1234',this.state.painskzh,'painskzh')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>收款账号：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painskzh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：平安银行深圳布吉支行',this.state.painskh,'painskh')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>收  款  行：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painskh}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00',this.state.painje,'painje')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>金        额：</Text>
                        <Text style={[styles.row_text, styles.row_text_r, {color:'#DD5522'}]}>{this.state.painje}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：10,000.00',this.state.painzhye,'painzhye')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>账户余额：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painzhye}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：跨行转账',this.state.painzy,'painzy')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>摘        要：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painzy}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：跨行转出',this.state.painly,'painly')} style={[styles.wrap_row]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>留        言：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painly}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1234****1234',this.state.jsoutfkzh,'jsoutfkzh')} style={[styles.wrap_row,{borderBottomWidth:0}]}>
                        <Text style={[styles.row_text, styles.row_text_l]}>流水号：</Text>
                        <Text style={[styles.row_text, styles.row_text_r]}>{this.state.jsoutfkzh}</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
                <EditView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView => this.editView = editView}
                    inputText={this.state.popValue}
                    titleTxt={this.state.popTitle}
                    ensureCallback={popValue => this.setPopValue(popValue)}
                    />
            </View>
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
        height:152*width/baseWidth,
    },
    wrap: {
        borderWidth: 1,
        borderColor: '#C6C6C6',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 1,
        backgroundColor: '#F8F8F8',
    },
    wrap_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: '#E0E3E4',
        paddingLeft: 10,
        paddingTop: 11,
        paddingBottom: 13,
    },
    row_text : {
        fontSize: 14,
    },
    row_text_l: {
        color: '#4F5257',
    },
    row_text_r: {
        color: '#5F6267',
        marginLeft: 3,
    }

});

