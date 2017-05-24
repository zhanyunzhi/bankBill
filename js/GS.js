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

export default class GS extends Component {
    constructor(props) {
        super(props);
        let today = Common.formatDateOne(new Date().getTime());         //获取当天的时间，并格式化为yyyy-mm-dd
        this.state={
            gsyezy:'跨行汇款',
            gsinjyje:'1,000.00',
            gsinye:'10,000.00',
            gsoutjyje:'1,000.00',
            gsoutye:'10,000.00',
            gsdfjyzh:'6222 9800 2267 1234',
            gsdfhm:'王老五',

            today: today,
            popValue: '',                                          //弹出框的输入内容
            popTitle: '请输入账号格式为：6222 9800 2267 1234',                      //弹出框的title
            isIncome: true,       //转出和转入切换开关
            isJEBigYE: false,       //转入的时候金额是否大于余额

        }
    }
    componentDidMount(){
        let aList = ['gsyezy','gsinjyje','gsoutjyje','gsoutye','gsinye','gsdfjyzh','gsdfhm'];
        for(let i=0; i<aList.length; i++){
            this.getValue(aList[i],function(){
                //转入的时候，检查转入的时候，余额是否大于转入金额
                if(this.state.isIncome && parseFloat(this.state.gsinye.toString().replace(/,/g, '')) < parseFloat(this.state.gsinjyje.toString().replace(/,/g, ''))){
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
    getValue(k,callBack){
        try {
            AsyncStorage.getItem(k,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        if(result){
                            this.setState({[k]:result},callBack);
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
        let aFormatBankNumForSpace = ['gsdfjyzh'];           //需要格式化银行账号的
        let aFormatBankMoney = ['gsinjyje','gsinye','gsoutjyje','gsoutye'];           //需要验证银行账号位数的
        if(aFormatBankNumForSpace.indexOf(flag) > -1){
            v = Common.formatBankNumForSpace(v) || this.state[flag];
        }
        if(aFormatBankMoney.indexOf(flag) > -1){
            v = Common.formatBankMoney(v) || this.state[flag];
        }
        this.setState({[flag]:v},function(){
            this.saveDataToLocal(flag);             //设置值成功后，保存到AsyncStorage
            //转入的时候，检查转入的时候，余额是否大于转入金额
            if(this.state.isIncome && parseFloat(this.state.gsinye.toString().replace(/,/g, '')) < parseFloat(this.state.gsinjyje.toString().replace(/,/g, ''))){
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
            <ScrollView style={[{backgroundColor:'#F3F3F3'}]}>
                <View>
                    <TouchableHighlight
                        onPress={this.clickJump.bind(this)}
                        >
                        <Image style={[styles.image]} source={require('../images/gs-title.jpg')}></Image>
                    </TouchableHighlight>
                    <View style={[styles.wrap]}>
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易日期</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.today}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：跨行汇款',this.state.gsywzy,'gsywzy')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>业务摘要</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsyezy}</Text>
                        </TouchableOpacity>
                        {this.state.isIncome == true ? (
                        <TouchableOpacity style={[styles.row]} onPress={this.switch.bind(this)} >
                            <Text style={[styles.row_l]}>收支标志</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>收入</Text>
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity style={[styles.row]} onPress={this.switch.bind(this)} >
                            <Text style={[styles.row_l]}>收支标志</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>支出</Text>
                        </TouchableOpacity>
                        )}
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易国家或地区简称</Text>
                            <Text style={[styles.row_m,{marginTop:8}]}>：</Text>
                            <Text style={[styles.row_r,{marginTop:8}]}>CHN</Text>
                        </TouchableOpacity>
                        {this.state.isIncome == true ? (
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易场所</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>--</Text>
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易场所</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>手机银行</Text>
                        </TouchableOpacity>
                        )}
                        {this.state.isIncome == true ? (
                        <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00',this.state.gsinjyje,'gsinjyje')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易金额</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsinjyje}</Text>
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity onPress={()=>this.openPop('格式：1,000.00',this.state.gsoutjyje,'gsoutjyje')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易金额</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsoutjyje}</Text>
                        </TouchableOpacity>
                        )}
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>交易币种</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>人民币</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>记账金额</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>--</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.row]}>
                            <Text style={[styles.row_l]}>记账币种</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>--</Text>
                        </TouchableOpacity>
                        {this.state.isIncome == true ? (
                        <TouchableOpacity onPress={()=>this.openPop('格式：10,000.00',this.state.gsinye,'gsinye')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>余额</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>
                                {this.state.gsinye}
                                {this.state.isJEBigYE == true ? (
                                <Text style={[{color:'red'}]}>“余额”必须大于“交易金额”，请修改“余额”！</Text>
                                ) : (null)}
                            </Text>
                        </TouchableOpacity>
                        ) : (
                        <TouchableOpacity onPress={()=>this.openPop('格式：10,000.00',this.state.gsoutye,'gsoutye')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>余额</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsoutye}</Text>
                        </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={()=>this.openPop('格式：6222980022671234',this.state.gsdfjyzh,'gsdfjyzh')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>对方交易账户</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsdfjyzh}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.openPop('格式：王老五',this.state.gsdfhm,'gsdfhm')} style={[styles.row]}>
                            <Text style={[styles.row_l]}>对方户名</Text>
                            <Text style={[styles.row_m]}>：</Text>
                            <Text style={[styles.row_r]}>{this.state.gsdfhm}</Text>
                        </TouchableOpacity>
                    </View>
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
var baseWidth = 750;

const styles = StyleSheet.create({
    image:{
        width:width,
        height:106*width/baseWidth,
    },
    wrap:{
        marginTop:  5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E3E3E5',
        paddingHorizontal: 22,
        paddingVertical: 11,
        backgroundColor:'#ffffff',
    },
    row:{
        flexDirection: 'row',
    },
    row_l:{
        //marginLeft: 22,
        width: 103,
        //backgroundColor: 'red',
        textAlign: 'right',
        color: '#95ADB7',
        lineHeight: 21,
    },
    row_m:{
        color: '#95ADB7',
        lineHeight: 21,
        //backgroundColor: 'green',
    },
    row_r:{
        flex: 1,
        textAlign: 'left',
        color:'#607483',
        lineHeight: 21,
    }
});

