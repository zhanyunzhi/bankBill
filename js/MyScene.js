/**
 * Created by user on 2016/11/28.
 * 导航菜单
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableHighlight
    } from 'react-native';

export default class MyScene extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }
    render() {
        return (
            <View>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>点我进入农行</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>点我进入建行</Text>
                </TouchableHighlight>
            </View>
        )
    }
}