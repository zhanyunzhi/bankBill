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

export default class NH extends Component {
    constructor(props) {
        super(props);
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        let hour = new Date().getHours();
        hour < 10 ? hour = '0' + hour : hour;
        let minutes = new Date().getMinutes();
        minutes < 10 ? minutes = '0' + minutes : minutes;
        let moneyMark = String.fromCharCode(165);
        this.state={
            activeNum:'',              //激活码输入提示
        }
    }
    componentDidMount(){
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
            Constants.bankInputTextFlag = flag;
            this.editView.show();
        });            //设置弹出框的内容
    }
    setPopValue(v){
        v = v || '您没有输入任何内容';
        this.setState({popValue:v});        //保存输入的内容
        let flag = Constants.bankInputTextFlag;         //获取修改的是那个输入框
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
            <View style={styles.wrap}>
                <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                    <Image style={[styles.image]} source={require('../images/wx-title.png')}></Image>
                </TouchableHighlight>
                <TextInput
                        style={styles.inputStyle}
                        placeholder='请输入32位激活码'
                        value={this.state.activeNum}
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({activeNum:text})}
                        />
            </View>
        )
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var baseWidth = 1080;

const styles = StyleSheet.create({
    image:{
        width:width,
        height:540*width/baseWidth,
    },
    wrap:{
        backgroundColor:'#f4f4f4',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    inputStyle:{
        fontSize:20,
        height:44,
        lineHeight:44,
        color:'#000',
        width:width,
        padding:0,
        paddingBottom:10,
        paddingTop:10,
        paddingLeft:10,
        marginTop:20,
        borderBottomWidth:1,
        borderColor:'#d9d9d9',
        backgroundColor:'#ffffff',
    }

});

