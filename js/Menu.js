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
    ListView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    BackAndroid,
    ToastAndroid
    } from 'react-native';

import NY from './NY';             //农行
import GF from './GF';             //广发
import JSOut from './JSOut';             //建行转出
import GS from './GS';             //工行
import PA from './PA';             //平安
import WX from './WX';             //微信
import Activate from './Activate';             //激活页面
import Loading from './public/Loading';             //loading页
import Request from './public/Request.js';          //封装过的fetch
import Constants from './public/Constants.js';

export default class Menu extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows([
                {name: '农业银行', shortName: 'ny', img: require('../images/ny-logo.jpg'), dec: '农业银行转账给他人的结果页'},
                {name: '广发银行', shortName: 'gf', img: require('../images/gf-logo.jpg'), dec: '广发银行转账记录，可以切换收入和支出'},
                {name: '工商银行', shortName: 'gs', img: require('../images/gs-logo.jpg'), dec: '工商银行的转账结果页，可以切换收入和支出'},
                {name: '建设银行', shortName: 'jsOut', img: require('../images/js-logo.jpg'), dec: '建设银行转账给他人的页面'},
                {name: '平安银行', shortName: 'pa', img: require('../images/pa-logo.jpg'), dec: '平安银行交易详情，可以切换转入和转出'},
                {name: '微信收款', shortName: 'wx', img: require('../images/wx-logo.jpg'), dec: '微信转账收钱页面'},
            ]),
            visible: false
        }
    }
    componentWillMount(){
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        else{
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackAndroid.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    };
    componentDidMount(){
        //执行验证当前设备是否已经激活过
        let deviceID = Constants.DEVICE_ID;        //设备uniqueId
        let reqUrl = 'thinkphp5.0/public/index/active/is_active?device_id='+deviceID;
        Request.fetchRequest(reqUrl,'GET','','',10000)
            .then(res => {
                if(res.code == '0000'){
                    Constants.IS_ACTIVE = true;         //已激活
                }else if(res.code == '1000'){
                    Constants.IS_ACTIVE = false;        //未激活
                }else{
                    Constants.IS_ACTIVE = false;        //服务器返回错误
                }
                this.setState({visible:true});
            })
            .catch((err) => {
                Constants.IS_ACTIVE = false;        //服务器返回错误
                this.setState({visible:true});
            });
    }
    clickJump(index){
        //因为Navigator <Component {...route.params} navigator={navigator} />传入了navigator 所以这里能取到navigator
        const{navigator} = this.props;
        let jumpComponent = NY;
        if(navigator){
            switch(index) {
                case 'ny':
                    jumpComponent = NY;
                    break;
                case 'gf':
                    jumpComponent = GF;
                    break;
                case 'jsOut':
                    jumpComponent = JSOut;
                    break;
                case 'gs':
                    jumpComponent = GS;
                    break;
                case 'pa':
                    jumpComponent = PA;
                    break;
                case 'wx':
                    jumpComponent = WX;
                    break;
                case 'activate':
                    jumpComponent = Activate;
                    break;
            }
            navigator.push({
                name : "SecondPageComponent",
                component : jumpComponent,
                params : {
                    title: '标题'
                }
            })
        }
    }
    render(){
        return(
            <View style={styles.wrap}>
                {this.state.visible == false ? (
                    <Loading text='正在验证权限...'/>
                ) : (null)}
                <View style={{flexDirection:'row',justifyContent:'space-between',width:width,borderBottomWidth:1,borderColor:'#dddddd'}}>
                    <TouchableOpacity onPress={this.onBackAndroid.bind(this,'')}>
                        <Text style={[styles.title,{color:'#999999',width:50,textAlign:'center'}]}>退出</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>银行账单{Constants.IS_ACTIVE==true?'(已激活)':'(未激活)'}</Text>
                    {Constants.IS_ACTIVE == false ? (
                    <TouchableOpacity onPress={this.clickJump.bind(this,'activate')}>
                        <Text style={[styles.title,{color:'#2C934E',width:50,textAlign:'center'}]}>激活</Text>
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity>
                        <Text style={[styles.title,{color:'#ff6549',width:50,textAlign:'center'}]}></Text>
                    </TouchableOpacity>
                    )}
                </View>
                <ListView style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <CELL   name={rowData.name}
                                                    dec={rowData.dec}
                                                    img={rowData.img}
                                                    jumpCallback={this.clickJump.bind(this,rowData.shortName)}>
                                            </CELL>
                                        }
                    />
            </View>
        )
    }
}

class CELL extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {jumpCallback, name, shortName, dec, img} = this.props;
        return(
            <TouchableHighlight
                underlayColor="rgb(238, 238, 238)"
                activeOpacity={0.5}
                onPress={() => {jumpCallback(shortName)}}
                >
                <View  style={styles.list}>
                    <Image style={styles.list_image} source={img}></Image>
                    <View style={styles.list_view}>
                        <Text style={styles.list_title}>{name}</Text>
                        <Text style={styles.list_dec} numberOfLines={2}>{dec}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        height: 30,
        color: '#ff6549',
        marginTop: 14,
        fontSize: 16,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        //backgroundColor: '#ffff00',
        marginHorizontal: 10,
        paddingVertical: 10,
        //height: 56,
    },
    list_image: {
        width: 50,
        height: 50,
    },
    list_view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    list_title: {
        flex:1,
        color: '#666666',
        fontSize: 14,
    },
    list_dec: {
        flex:1,
        color: '#999999',
        fontSize: 10,
        width:width - 78,
    }
});

