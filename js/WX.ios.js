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
import IosStatusHeight from './public/IosStatusHeight.js';      //ios status高度

export default class WX extends Component {
    constructor(props) {
        super(props);
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        let hour = new Date().getHours();
        hour < 10 ? hour = '0' + hour : hour;
        let minutes = new Date().getMinutes();
        minutes < 10 ? minutes = '0' + minutes : minutes;
        let second1 = Common.getRandomNum(1,59);
        let second2 = Common.getRandomNum(1,59);
        let gap = Common.getRandomNum(1,24);
        if(second2 < second1){
            second1 = second2 - gap;
        }
        second1 < 0 ? second1 = 0 : second1;
        second1 < 10 ? second1 = '0' + second1 : second1;
        second2 < 10 ? second2 = '0' + second2 : second2;
        let moneyMark = String.fromCharCode(165);
        this.state={
            wxinje:'1000.00',
            moneyMark:moneyMark,
            today:today,
            hour:hour,
            minutes1:minutes,
            minutes2:minutes,
            second1:second1,
            second2:second2,
            isMinuteError:false,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            watermark: require('../images/watermark_gray1.png')                       //水印的图片地址
        }
    }
    componentDidMount(){
        if(Constants.IS_ACTIVE==true){
            this.setState({watermark:require('../images/nowatermark.png')});
        }
        let aList = ['wxinje'];
        for(let i=0; i<aList.length; i++){
            this.getValue(aList[i],function(){
                //检查转账时间是不是比收钱时间早
                if(parseFloat(this.state.minutes1) > parseFloat(this.state.minutes2)){
                    this.setState({isMinuteError:true});        //转账时间比收钱时间早，提示错误
                }else{
                    this.setState({isMinuteError:false});
                };
            });
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
            Constants.BANK_INPUT_TEXT_FLAG = flag;
            this.editView.show();
        });            //设置弹出框的内容
    }
    setPopValue(v){
        v = v || '您没有输入任何内容';
        this.setState({popValue:v});        //保存输入的内容
        let flag = Constants.BANK_INPUT_TEXT_FLAG;         //获取修改的是那个输入框
        let aFormatWXMoney = ['wxinje'];           //需要格式化的微信金额
        let aFormatWXMinute = ['minutes1','minutes2'];           //需要格式化的分钟
        if(aFormatWXMoney.indexOf(flag) > -1){
            v = Common.formatWXMoney(v) || this.state[flag];
        }
        if(aFormatWXMinute.indexOf(flag) > -1){
            v = Common.formatWXMinute(v) || this.state[flag];
        }
        this.setState({[flag]:v},function(){
            this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
            //检查转账时间是不是比收钱时间早
            if(parseFloat(this.state.minutes1) > parseFloat(this.state.minutes2)){
                this.setState({isMinuteError:true});        //转账时间比收钱时间早，提示错误
            }else{
                this.setState({isMinuteError:false});
            };
        });
    }

    render(){
        return(
            <View style={[{backgroundColor:'#ffffff',height:height}]}>
            <StatusBar
                    barStyle={"light-content"}
                    />
                <View style={[styles.status,{height:3,backgroundColor:'#2e2d33'}]}></View>
                <View style={[styles.status,{height:3.5,backgroundColor:'#2f2e33'}]}></View>
                <View style={[styles.status,{height:0.5,backgroundColor:'#302e33'}]}></View>
                <View style={[styles.status,{height:1,backgroundColor:'#302e34'}]}></View>
                <View style={[styles.status,{height:3,backgroundColor:'#302f34'}]}></View>
                <View style={[styles.status,{height:0.5,backgroundColor:'#303034'}]}></View>
                <View style={[styles.status,{height:0.5,backgroundColor:'#303035'}]}></View>
                <View style={[styles.status,{height:3,backgroundColor:'#313035'}]}></View>
                <View style={[styles.status,{height:0.5,backgroundColor:'#323035'}]}></View>
                <View style={[styles.status,{height:0.5,backgroundColor:'#323036'}]}></View>
                <View style={[styles.status,{height:2,backgroundColor:'#323136'}]}></View>
                <TouchableHighlight
                    onPress={this.clickJump.bind(this)}
                    >
                    <Image style={[styles.image]} source={require('../images/wx-title.png')}></Image>
                </TouchableHighlight>
                <Image style={{width:null,height:null}} source={this.state.watermark}>
                    <TouchableOpacity onPress={()=>this.openPop('格式：1000.00',this.state.wxinje,'wxinje')} style={styles.money}>
                        <Text style={[styles.money_text,{position:'absolute',marginLeft:-30,marginTop:6,}]}>￥</Text>
                        <Text style={[styles.money_text]}>{this.state.wxinje}</Text>
                        <Text style={[styles.money_text,{backgroundColor:'#000000',position:'absolute',width:0,height:0,marginTop:44.5,marginLeft:-57}]}></Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{textAlign:'center',fontSize:14,color:'#808080',marginTop:16}}>
                            <Text style={{color:'#576b95'}}>查看零钱</Text>
                        </Text>
                    </View>
                </Image>
                {this.state.isMinuteError == true ? (
                    <View style={[styles.bottom_time,{bottom:90}]}>
                        <Text style={{color:'#ff0000'}}>怎么搞的，“收钱时间”怎么可能比“转账时间”早呢！</Text>
                    </View>
                ) : (null)}
                <View style={[styles.bottom_time,{bottom:38}]}>
                    <Text style={{color:'#808080',marginRight:8}}>转账时间:</Text>
                    <Text style={{color:'#808080',marginRight:3}}>{this.state.today}</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：数字0-59，只改变分钟数',this.state.minutes1,'minutes1')}>
                        <Text style={{color:'#808080'}}>{this.state.hour}:{this.state.minutes1}:{this.state.second1}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.bottom_time,{bottom:18}]}>
                    <Text style={{color:'#808080',marginRight:8}}>收钱时间:</Text>
                    <Text style={{color:'#808080',marginRight:3}}>{this.state.today}</Text>
                    <TouchableOpacity onPress={()=>this.openPop('格式：数字0-59,只改变分钟数',this.state.minutes2,'minutes2')}>
                        <Text style={{color:'#808080'}}>
                            {this.state.hour}:{this.state.minutes2}:{this.state.second2}
                        </Text>
                    </TouchableOpacity>
                </View>
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
var baseWidth = 750;

const styles = StyleSheet.create({
    image:{
        width:width,
        height:450*width/baseWidth,
    },
    status: {
        width:width,
    },
    money:{
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:28,
        marginTop:4,
    },
    money_text:{
        textAlign:'center',
        fontSize:40,
        color:'#000000',
        marginTop:11,
        fontWeight:'300',
        fontFamily:'Helvetica',
    },
    bottom_time:{
        width:width,
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
    }

});

