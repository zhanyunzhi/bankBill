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
        let palsh = Common.getPAFlowNum();
        this.state={
            painfkr:'王老五',               //平安转入开始
            painfkzh:'6214850285268888',
            painfkh:'中国农业银行股份有限公司',
            painskr:'张三',
            painskzh:'6222****1234',
            painskh:'平安银行深圳布吉支行',
            painje:'1,000.00',
            painzhye:'10,000.00',
            painzy:'跨行转账',
            painly:'跨行转出',              //平安转入结束

            paoutfkr:'张三',               //平安转出开始
            paoutfkzh:'6222****1234',
            paoutfkh:'平安银行深圳布吉支行',
            paoutskr:'王老五',
            paoutskzh:'6214850285268888',
            paoutskh:'中国农业银行股份有限公司',
            paoutje:'1,000.00',
            paoutzhye:'10,000.00',
            paoutzy:'网银转账',
            paoutly:'网银贷记',              //平安转出结束

            palsh: palsh,

            today: today,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            isIncome: true,       //转出和转入切换开关
            isJEBigYE: false,       //转入的时候金额是否大于余额
        }
    }
    componentDidMount(){
        let aList = ['painfkr','painfkzh','painfkh','painskr','painskzh','painskh','painje','painzhye','painzy','painly',           //平安转入
            'paoutfkr', 'paoutfkzh','paoutfkh','paoutskr','paoutskzh','paoutskh','paoutje','paoutzhye','paoutzy','paoutly'];        //平安转出
        for(let i=0; i<aList.length; i++){
            this.getValue(aList[i],function(){
                //转入的时候，检查转入的时候，余额是否大于转入金额
                if(this.state.isIncome && parseFloat(this.state.painzhye.toString().replace(/,/g, '')) < parseFloat(this.state.painje.toString().replace(/,/g, ''))){
                    this.setState({isJEBigYE:true});        //转入的时候交易金额大于余额，要求用户修改余额
                }else{
                    this.setState({isJEBigYE:false});
                };
            });
        };
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
    getValue(k,callback){
        try {
            AsyncStorage.getItem(k,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        if(result){
                            this.setState({[k]:result},callback);
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
        let aCheckBankNum = ['painfkzh','paoutskzh'];           //需要验证银行账号位数的
        let aFormatBankNum = ['painskzh','paoutfkzh'];           //需要格式化银行账号的
        let aFormatBankMoney = ['painje','painzhye','paoutje','paoutzhye'];           //需要格式化的金额
        if(aCheckBankNum.indexOf(flag) > -1){
            v = Common.checkBankNum(v) || this.state[flag];
        }
        if(aFormatBankNum.indexOf(flag) > -1){
            v = Common.formatBankNum(v) || this.state[flag];
        }
        if(aFormatBankMoney.indexOf(flag) > -1){
            v = Common.formatBankMoney(v) || this.state[flag];
        }
        this.setState({[flag]:v},function(){
            this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
            //转入的时候，检查转入的时候，余额是否大于转入金额
            if(this.state.isIncome && parseFloat(this.state.painzhye.toString().replace(/,/g, '')) < parseFloat(this.state.painje.toString().replace(/,/g, ''))){
                this.setState({isJEBigYE:true});        //转入的时候交易金额大于余额，要求用户修改余额
            }else{
                this.setState({isJEBigYE:false});
            };
        });
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
                {this.state.isIncome == true ? (                //转入开始
                <ScrollView>
                    <View style={styles.wrap}>
                        <View style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>交易时间：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.today}</Text>
                        </View>
                        <TouchableOpacity onPress={this.switch.bind(this)} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>交易类型：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, {color:'#DD5522'}]}>转入</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：王老五',this.state.painfkr,'painfkr')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付  款  人：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painfkr}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：6214850285268888',this.state.painfkzh,'painfkzh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付款账号：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.painfkzh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：中国农业银行股份有限公司',this.state.painfkh,'painfkh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付  款  行：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, styles.add_ellipsis]} numberOfLines={1}>{this.state.painfkh}</Text>
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
                            <Text style={[styles.row_text, styles.row_text_r, styles.add_ellipsis]} numberOfLines={1}>{this.state.painskh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00',this.state.painje,'painje')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>金        额：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, {color:'#DD5522'}]}>{this.state.painje}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：10,000.00',this.state.painzhye,'painzhye')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>账户余额：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>
                                {this.state.painzhye}
                                {this.state.isJEBigYE == true ? (
                                    <Text style={[{color:'red'}]}>“账户余额”必须大于“金额”，请修改“账户余额”！</Text>
                                ) : (null)}
                            </Text>
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
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.palsh}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                ) : (               //转出开始
                <ScrollView>
                    <View style={styles.wrap}>
                        <View style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>交易时间：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.today}</Text>
                        </View>
                        <TouchableOpacity onPress={this.switch.bind(this)} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>交易类型：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, {color:'#2C934E'}]}>转出</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.paoutfkr,'paoutfkr')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付  款  人：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutfkr}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：6222****1234',this.state.paoutfkzh,'paoutfkzh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付款账号：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutfkzh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：平安银行深圳布吉支行',this.state.paoutfkh,'paoutfkh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>付  款  行：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, styles.add_ellipsis]} numberOfLines={1}>{this.state.paoutfkh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：王老五',this.state.paoutskr,'paoutskr')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>收  款  人：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutskr}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：6214850285268888',this.state.paoutskzh,'paoutskzh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>收款账号：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutskzh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：中国农业银行股份有限公司',this.state.paoutskh,'paoutskh')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>收  款  行：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, styles.add_ellipsis]} numberOfLines={1}>{this.state.paoutskh}</Text>
                        </TouchableOpacity>
                        <View style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>币        种：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>人民币</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00',this.state.paoutje,'paoutje')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>金        额：</Text>
                            <Text style={[styles.row_text, styles.row_text_r, {color:'#DD5522'}]}>{this.state.paoutje}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：10,000.00',this.state.paoutzhye,'paoutzhye')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>账户余额：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutzhye}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：跨行转账',this.state.paoutzy,'paoutzy')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>摘        要：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutzy}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：跨行转出',this.state.paoutly,'paoutly')} style={[styles.wrap_row]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>留        言：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.paoutly}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：1234****1234',this.state.jsoutfkzh,'jsoutfkzh')} style={[styles.wrap_row,{borderBottomWidth:0}]}>
                            <Text style={[styles.row_text, styles.row_text_l]}>流水号：</Text>
                            <Text style={[styles.row_text, styles.row_text_r]}>{this.state.palsh}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                )}
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
    },
    add_ellipsis: {
        width:width - 140,
    }

});

