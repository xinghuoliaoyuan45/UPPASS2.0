import * as Api from './Api';
import {Net} from '../../shared';

export function getLocksData(params) {
    return Net('get', Api.apiLocks, params);
}

export function getLocksPassword(params) {
    return Net('get', Api.apiUserInfo, params);
}

export function getLocksQRcode() {
    return Net('get', Api.apiQRcode, {});
}

