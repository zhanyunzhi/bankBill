/**
 * Created by ZYZ on 2017/5/16.
 * 存放全局变量的文件
 */
import { Platform } from 'react-native';
const Constants = {
    bankInputTextFlag: '',              //用来标识，弹出输入框的时候，确认输入后应该将信息填入何处
    platform: Platform,                 //平台信息，{ OS: 'android', Version: 23 }{ OS: 'ios' }
}

export default Constants;