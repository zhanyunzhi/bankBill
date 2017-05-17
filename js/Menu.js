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
import GF from './GF';             //农行
import JS from './JS';             //建行
import GS from './GS';             //工行

export default class Menu extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows([
                {name: '农业银行', shortName: 'ny', img: require('../images/ny-logo.jpg'), dec: '我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述'},
                {name: '广发银行', shortName: 'gf', img: require('../images/gf-logo.jpg'), dec: '我是描述不可可描述我是描述不可描述'},
                {name: '工商银行', shortName: 'gs', img: require('../images/gs-logo.jpg'), dec: '我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述我是描述不可描述'},
                {name: '建设银行', shortName: 'js', img: require('../images/js-logo.jpg'), dec: '我是描述不可描述我是描述'}
            ])
        }
    }
    componentDidMount(){
        //this.clickJump('ny');
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
                case 'js':
                    jumpComponent = JS;
                    break;
                case 'gs':
                    jumpComponent = GS;
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
                    underlayColor="rgb(181, 136, 254)"
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
        color: '#ff6549',
        fontSize: 14,
    },
    list_dec: {
        flex:1,
        color: '#38adff',
        fontSize: 10,
        width:width - 78,
    }
});

