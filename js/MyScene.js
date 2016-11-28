/**
 * Created by user on 2016/11/28.
 * 导航菜单
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Navigator
} from 'react-native';

import NH from './NH';             //农行
import JH from './JH';             //建行

export default class MyScene extends Component {
    renderNav(route,nav){
        switch (route.id) {
            case 'main':
                return <JH navigator={nav} title="建行" />;
            case 'detail':
                return (<NH navigator={nav} title="农行" />);
        }
    }
    render() {
        return (
            <Navigator
                style = {styles.container}
                initialRoute={{id:"main"}}
                renderScene={this.renderNav}
            />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding: 15,
    },
    containView:{
        flex: 1,
        justifyContent: 'center',
    },
    detailContainView:{
        flex:1,
        justifyContent: 'center',
        backgroundColor:'green',
    },
    blackText:{
        fontSize:20,
        textAlign:'center',
    },
});