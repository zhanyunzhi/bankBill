/**
 * Created by ZYZ on 2017/5/16.
 * 网上找的loading组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Modal
    } from 'react-native';

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        const {text} = this.props;
        return(
            <Modal
                transparent = {true}
                onRequestClose={()=> this.onRequestClose()}
                >
                <View style={styles.loadingBox}>
                    <ActivityIndicator color="#2C934E" size="large"style={{marginTop: 200}}/>
                    <Text style={{color:'#2C934E',marginTop:10}}>{text}</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    loadingBox: { // Loading居中
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'rgba(0, 0, 0, 0.8)', // 半透明
    }
})