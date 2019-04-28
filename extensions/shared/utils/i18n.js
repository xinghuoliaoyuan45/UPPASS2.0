import {DeviceEventEmitter} from 'react-native';
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.locale = 'zh';
export {I18n};

export function initI18nLocale(localeStr) {
    I18n.locale = localeStr;
}

export function setI18nLocale(localeStr = defaultLocale) {
    I18n.locale = localeStr;
    DeviceEventEmitter.emit('upload');
}

export function getI18n(translation, str, params) {
    I18n.translations = translation;
    if (params) {
        return I18n.t(str, params);
    }
    return I18n.t(str);
}
