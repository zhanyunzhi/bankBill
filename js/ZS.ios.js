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
    StatusBar,
    AsyncStorage,
    TouchableOpacity
    } from 'react-native';

import Common from './public/Common.js';
import EditView from './public/EditView.js';
import Constants from './public/Constants.js';
import IosStatusHeight from './public/IosStatusHeight.js';      //ios status高度

export default class GF extends Component {
    constructor(props) {
        super(props);
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        this.state={
            zszh: '6214********1234',
            zsincr: '1,000.00',
            zsinye: '1,000.00',
            zsinbz: '张三',
            zsoutzc: '1,000.00',
            zsoutye: '1,000.00',
            zsoutbz: '王老五',
            today: today,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：1234********5678',                      //弹出框的title
            isIncome: true,  
            isCRBigYE: false,       //转入的时候金额是否大于余额                                        //收入与支出切换
            watermark: require('../images/watermark_gray1.png')                       //水印的图片地址
        }
    }
    componentDidMount(){
        if(Constants.IS_ACTIVE==true){
            this.setState({watermark:require('../images/nowatermark.png')});
        }
        let aList = ['zszh','zsincr','zsinye','zsinbz','zsoutzc','zsoutye','zsoutbz'];
        for(let i=0; i<aList.length; i++){
            this.getValue(aList[i],function(){
                //转入的时候，检查转入的时候，余额是否大于转入金额
                if(this.state.isIncome && parseFloat(this.state.zsinye.toString().replace(/,/g, '')) < parseFloat(this.state.zsincr.toString().replace(/,/g, ''))){
                    this.setState({isCRBigYE:true});        //转入的时候交易金额大于余额，要求用户修改余额
                }else{
                    this.setState({isCRBigYE:false});
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
                        console.log('存值成功!'+v);
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
        let aFormatBankNumEight = ['zszh'];           //需要格式化银行账号的
        let aFormatBankMoney = ['zsincr','zsinye','zsoutzc','zsoutye'];           //需要格式化的金额
        if(aFormatBankNumEight.indexOf(flag) > -1){
            v = Common.formatBankNumEight(v) || this.state[flag];
        }
        if(aFormatBankMoney.indexOf(flag) > -1){
            v = Common.formatBankMoney(v) || this.state[flag];
        }
        this.setState({[flag]:v},function(){
            this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
            //转入的时候，检查转入的时候，余额是否大于转入金额
            if(this.state.isIncome && parseFloat(this.state.zsinye.toString().replace(/,/g, '')) < parseFloat(this.state.zsincr.toString().replace(/,/g, ''))){
                this.setState({isCRBigYE:true});        //转入的时候交易金额大于余额，要求用户修改余额
            }else{
                this.setState({isCRBigYE:false});
            };
        });
    }
    switch(){               //改变收入或者支出
        this.setState({isIncome:!this.state.isIncome});
    }

    render(){
        return(
                <View style={[{backgroundColor:'#eaeaea',height:height}]}>
                    <StatusBar
                        barStyle={"light-content"}
                        backgroundColor={'#3a3a3a'}
                        />
                    {Constants.PLATFORM == 'ios' ? (
                        <IosStatusHeight bgColor='#3a3a3a'></IosStatusHeight>
                    ) : (null)}
                    <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                        <Image style={[styles.image_top]} source={require('../images/zs-title.png')}></Image>
                    </TouchableHighlight>
                    <Image style={{width:null,height:null}} source={this.state.watermark}>
                        <View style={[styles.inputRow,styles.center,{marginBottom:10,height:44,marginTop:10,paddingHorizontal:15.5,justifyContent:'flex-start',borderBottomWidth:0}]} >
                            <Text style={[styles.text_right,{marginRight:8}]}>一卡通</Text>
                            <TouchableOpacity onPress={()=>this.openPop('格式：6214****1234,输入您的招行卡号',this.state.zszh,'zszh')} style={{}}>
                                <Text style={[styles.text_right,{marginRight:8}]}>{this.state.zszh}</Text>
                            </TouchableOpacity>
                            <Text style={styles.text_right}>交易明细</Text>
                        </View>
                        <View style={styles.content}>
                            <View style={[styles.inputRow,styles.center]}>
                                <Text style={[styles.text]}>日期</Text>
                                <Text style={[styles.text_right]}>{this.state.today}</Text>
                            </View>
                            <View style={[styles.inputRow,styles.center]}>
                                <Text style={[styles.text]}>类型</Text>
                                <Text style={[styles.text_right]}>客户转账</Text>
                            </View>
                            {this.state.isIncome == true ? (
                                <View style={[styles.inputRow,styles.center]}>
                                    <TouchableOpacity onPress={()=>this.switch()}>
                                        <Text style={[styles.text]}>存入</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.zsincr,'zsincr')} style={[styles.text_touch]}>
                                        <Text style={[styles.text_touch_text]}>{this.state.zsincr}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={[styles.inputRow,styles.center]}>
                                    <TouchableOpacity onPress={()=>this.switch()}>
                                        <Text style={[styles.text]}>支出</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.zsoutzc,'zsoutzc')} style={[styles.text_touch]}>
                                        <Text style={[styles.text_touch_text]}>{this.state.zsoutzc}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.state.isIncome == true ? (
                            <View style={[styles.inputRow,styles.center]}>
                                <Text style={[styles.text]}>余额</Text>
                                <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00您可直接输入1000',this.state.zsinye,'zsinye')} style={[styles.text_touch]}>
                                    <Text style={[styles.text_touch_text]}>
                                        {this.state.zsinye}
                                        {this.state.isCRBigYE == true ? (
                                            <Text style={[{color:'red'}]}>“余额”必须大于“存入”金额，请修改“余额”！</Text>
                                        ) : (null)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            ) : (
                                <View style={[styles.inputRow,styles.center]}>
                                    <Text style={[styles.text]}>余额</Text>
                                    <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.zsoutye,'zsoutye')} style={[styles.text_touch]}>
                                        <Text style={[styles.text_touch_text]}>{this.state.zsoutye}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.state.isIncome == true ? (
                                <View style={[styles.inputRow,styles.center,{borderBottomWidth:0}]}>
                                    <Text style={[styles.text]}>备注</Text>
                                    <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.zsinbz,'zsinbz')} style={[styles.text_touch]}>
                                        <Text style={[styles.text_touch_text]}>跨行转出  {this.state.zsinbz}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={[styles.inputRow,styles.center,{borderBottomWidth:0}]}>
                                    <Text style={[styles.text]}>备注</Text>
                                    <TouchableOpacity onPress={()=>this.openPop('格式：张三',this.state.zsoutbz,'zsoutbz')} style={[styles.text_touch]}>
                                        <Text style={[styles.text_touch_text]}>转账  {this.state.zsoutbz}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View> 
                        <View>
                            <Text style={[styles.top_text,{marginBottom:4}]}>说明:</Text>
                            <Text style={[styles.top_text,{marginBottom:0}]}>1、您可以查询指定账户在一段时间内的所有交易流水。</Text>
                        </View>
                    </Image>
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
Constants.PLATFORM == 'ios' ? baseWidth = 750 : baseWidth = 1080;




const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        justifyContent: 'space-between',
    },
    image_top:{
        width:width,
        height:Constants.PLATFORM == 'ios' ? 88*width/baseWidth : 128*width/baseWidth,
    },
    content:{
        backgroundColor:'#ffffff',
        marginBottom:55.5,
        paddingLeft:15.5,
    },
    inputRow:{
        flexDirection:'row',
        backgroundColor:'#ffffff',
        height:45,
        borderColor:'#e1e1e1',
        borderBottomWidth:1,
    },
    text:{
        width:100,
        textAlign:'left',
        color: '#383838',
        fontSize:16,
    },
    text_touch:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        marginRight:15.5,
    },
    text_touch_text:{
        color: '#383838',
        fontSize:16,
    },
    text_right:{
        color: '#383838',
        fontSize:16,
        marginRight:15.5,
    },
    top_text:{
        fontSize:12,
        color:'#929292',
        marginHorizontal:15.5,
        // marginVertical:28
    }
});

