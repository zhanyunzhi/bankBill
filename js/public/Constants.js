/**
 * Created by ZYZ on 2017/5/16.
 * ���ȫ�ֱ������ļ�
 */
import { Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';      //��ȡ�豸��Ϣ�ĵ��������

const Constants = {
    BANK_INPUT_TEXT_FLAG: '',              //������ʶ������������ʱ��ȷ�������Ӧ�ý���Ϣ����δ�
    PLATFORM: Platform.OS,                 //ƽ̨��Ϣ��{ OS: 'android', Version: 23 }{ OS: 'ios' }
    //USER_AGENT: DeviceInfo.getUserAgent(),       //�豸user-agent
    //DEVICE_ID: DeviceInfo.getUniqueID(),     //�豸uniqueId
    IS_ACTIVE: false,                       //�Ƿ��Ѿ�����
    API_URL: 'http://192.168.31.163/',          //��̨�ӿڵ�ַǰ׺
}
if (Constants.PLATFORM == 'android'){
	Constants.USER_AGENT = DeviceInfo.getUserAgent();
	Constants.DEVICE_ID = DeviceInfo.getUniqueID();
}
if (!__DEV__) {           //�ǿ��������£�ȥ������̨��ӡ���������
    Constants.API_URL = 'http://120.25.58.101:8088/';           //���Ͻӿڵ�ַǰ׺
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
    };
}

export default Constants;