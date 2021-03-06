/**
 * Created by ZYZ on 2017/5/16.
 * 存放全局变量的文件
 */
import { Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';      //获取设备信息的第三方组件

const Constants = {
    BANK_INPUT_TEXT_FLAG: '',              //用来标识，弹出输入框的时候，确认输入后应该将信息填入何处
    PLATFORM: Platform.OS,                 //平台信息，{ OS: 'android', Version: 23 }{ OS: 'ios' }
    //USER_AGENT: DeviceInfo.getUserAgent(),       //设备user-agent
    //DEVICE_ID: DeviceInfo.getUniqueID(),     //设备uniqueId
    IS_ACTIVE: false,                       //是否已经激活
    API_URL: 'http://192.168.31.163/',          //后台接口地址前缀
}
if (Constants.PLATFORM == 'android'){
	Constants.USER_AGENT = DeviceInfo.getUserAgent();
	Constants.DEVICE_ID = DeviceInfo.getUniqueID();
}
if (!__DEV__) {           //非开发环境下，去掉控制台打印，提高性能
    Constants.API_URL = 'http://120.25.58.101:8088/';           //线上接口地址前缀
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
    };
}

export default Constants;