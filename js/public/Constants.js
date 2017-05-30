/**
 * Created by ZYZ on 2017/5/16.
 * ���ȫ�ֱ������ļ�
 */
import { Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';      //��ȡ�豸��Ϣ�ĵ��������

const Constants = {
    BANK_INPUT_TEXT_FLAG: '',              //������ʶ������������ʱ��ȷ�������Ӧ�ý���Ϣ����δ�
    PLATFORM: Platform,                 //ƽ̨��Ϣ��{ OS: 'android', Version: 23 }{ OS: 'ios' }
    USER_AGENT: DeviceInfo.getUserAgent(),       //�豸user-agent
    DEVICE_ID: DeviceInfo.getUniqueID(),     //�豸uniqueId
    IS_ACTIVE: false,                       //�Ƿ��Ѿ�����
}

export default Constants;