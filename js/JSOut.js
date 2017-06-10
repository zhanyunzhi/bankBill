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
    StatusBar,
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
            seeMore: true,       //查看更多和点击收起切换
            watermark: require('../images/watermark_gray1.png')                       //水印的图片地址
        }
    }
    componentDidMount(){
        if(Constants.IS_ACTIVE==true){
            this.setState({watermark:require('../images/nowatermark.png')});
        }
        let aList = ['jsoutzzje','jsoutskzh','jsoutskzhxm','jsoutskyh','jsoutfkzh','jsoutfkzhye'];
        for(let i=0; i<aList.length; i++){
            this.getValue(aList[i]);
        }
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
                            this.setState({[k]:result});
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
            Constants.BANK_INPUT_TEXT_FLAG = flag;
            this.editView.show();
        });            //设置弹出框的内容
    }
    setPopValue(v){
        v = v || '您没有输入任何内容';
        this.setState({popValue:v});        //保存输入的内容
        let flag = Constants.BANK_INPUT_TEXT_FLAG;         //获取修改的是那个输入框
        let aFormatBankNum = ['jsoutskzh','jsoutfkzh'];           //需要格式化银行账号的
        let aFormatBankMoney = ['jsoutzzje','jsoutfkzhye'];           //需要格式化的金额
        if(aFormatBankNum.indexOf(flag) > -1){
            v = Common.formatBankNum(v) || this.state[flag];
        }
        if(aFormatBankMoney.indexOf(flag) > -1){
            v = Common.formatBankMoney(v) || this.state[flag];
        }
        this.setState({[flag]:v},function(){
            this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
        });
    }
    openMore(){               //改变收入或者支出
        this.setState({seeMore:!this.state.seeMore});
    }

    render(){
        return(
            <ScrollView style={[{backgroundColor:'#ffffff'}]}>
                <StatusBar
                    backgroundColor="#09b6f2"
                    barStyle="light-content"
                    />
                <TouchableHighlight
                    onPress={this.clickJump.bind(this)}
                    >
                    <Image source={require('../images/js-out-title.png')} style={styles.img_title}/>
                </TouchableHighlight>
                <Image style={{width:null,height:null}} source={this.state.watermark}>
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
                </Image>
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
        fontSize: 22,
        color: blue,
        marginTop: 22,
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
        paddingVertical:11,
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

