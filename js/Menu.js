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
    TouchableHighlight
    } from 'react-native';

import NY from './NY';             //农行
import GF from './GF';             //广发
import JSOut from './JSOut';             //建行转出
import GS from './GS';             //工行
import PA from './PA';             //平安
import WX from './WX';             //微信

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
            ])
        }
    }
    componentDidMount(){
        this.clickJump('wx');
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
                <Text style={styles.title}>银行账单生成</Text>
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

