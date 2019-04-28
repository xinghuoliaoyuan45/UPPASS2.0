import {
    DeviceEventEmitter
} from 'react-native';

export function toastRequestError(res) {
    /* eslint-disable max-len */
    if (res && res.rspMsg) {
        DeviceEventEmitter.emit('showToast', res.rspMsg);
    } else {
        DeviceEventEmitter.emit('showToast', '网络请求失败');
    }
}