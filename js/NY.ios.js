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

export default class NY extends Component {
    constructor(props) {
        super(props);
        this.state={
            nhfkzh:'6228****1234',
            nhskzh:'6222****5678',
            nhskr:'张三',
            nhskyh:'平安银行',
            nhzzje:'1,000.00',
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234****5678',                      //弹出框的title
            watermark: require('../images/watermark_gray1.png')                       //水印的图片地址
        }
    }
    componentDidMount(){
        if(Constants.IS_ACTIVE==true){
            this.setState({watermark:require('../images/nowatermark.png')});
        }
        let aList = ['nhfkzh','nhskzh','nhskr','nhskyh','nhzzje'];
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
        let aFormatBankNum = ['nhfkzh','nhskzh'];           //需要格式化银行账号的
        let aFormatBankMoney = ['nhzzje'];           //需要格式化的金额
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

    render(){
        return(
            <ScrollView style={[{backgroundColor:'#f2f2f2'}]}>
                <View style={[{backgroundColor:'#ffffff'}]}>
                    {Constants.PLATFORM == 'ios' ? (
                        <IosStatusHeight></IosStatusHeight>
                    ) : (
                        <StatusBar
                            backgroundColor={'black'}
                            />
                    )}
                    <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                        <Image style={[styles.image]} source={require('../images/nh-title.png')}></Image>
                    </TouchableHighlight>
                    <Image style={{width:null,height:null}} source={this.state.watermark}>
                        <View style={styles.border_b}></View>
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>付款账户：</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：1234****1234',this.state.nhfkzh,'nhfkzh')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text]}>{this.state.nhfkzh}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>收款账户：</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：1234****5678',this.state.nhskzh,'nhskzh')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text]}>{this.state.nhskzh}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>收款人：</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.nhskr,'nhskr')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text]}>{this.state.nhskr}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.inputRow,styles.center]}>
                            <Text style={[styles.text]}>收款银行：</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：平安银行',this.state.nhskyh,'nhskyh')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text]}>{this.state.nhskyh}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.inputRow,styles.center,{borderBottomColor:'transparent'}]}>
                            <Text style={[styles.text]}>转账金额：</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.nhzzje,'nhzzje')} style={[styles.text_touch]}>
                                <Text style={[styles.text_touch_text,{color:'#ff6549'}]}>{this.state.nhzzje}元</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.border_b,{borderBottomWidth:1.5}]}></View>
                    </Image>
                </View>
                {Constants.PLATFORM == 'android' ? (
                <TouchableHighlight underlayColor="#ffffff" >
                    <Text style={{color:'#ff6549',marginHorizontal:17,marginTop:13,marginBottom:16,fontSize:13}}>您的资金已汇出，实际到账时间取决于收款行系统</Text>
                </TouchableHighlight>
                ) : (
                    <Text style={{color:'#ff6549',marginHorizontal:17,marginTop:39}}></Text>
                )}
                <View style={{flex:1,flexDirection:'row',marginHorizontal:17}}>
                    <TouchableHighlight underlayColor="#38adff" style={{flex:1}}>
                        <View style={[styles.btn,styles.center,{backgroundColor: '#dddddd'}]}>
                            <Text style={{color:'#fff',fontSize:18}}>继续转账</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#38adff"  style={{flex:1,marginLeft:12}}>
                        <View style={[styles.btn,styles.center]}>
                            <Text style={{color:'#fff',fontSize:18}}>完成</Text>
                        </View>
                    </TouchableHighlight>
                </View>

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
Constants.PLATFORM == 'ios' ? baseWidth = 750 : baseWidth = 1080;

const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        justifyContent: 'center',
    },
    image:{
        width:width,
        height:Constants.PLATFORM == 'ios' ? 416*width/baseWidth : 586*width/baseWidth,
    },
    inputRow:{
        height:52.5,
        flexDirection:'row',
        borderWidth:1,
        borderColor: 'transparent',
        borderBottomColor:'#e5e5e5',
        marginLeft: 17,
        //backgroundColor: '#ffffff'
    },
    text:{
        width:84,
        textAlign:'left',
        color: '#535353',
        fontSize:16
    },
    text_touch:{
        flex:1,
        alignItems:'flex-start',
        marginRight: 17,
        marginLeft: 4,
    },
    text_touch_text:{
        fontSize:16,
        color: '#535353',
    },
    border_b:{
        borderBottomColor:'#e5e5e5',
        borderBottomWidth: 1
    },
    btn:{
        height:47,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#ffa900',
        borderRadius: 5
    }
});

