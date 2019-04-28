import * as Api from './Api';
import {Net} from '../../shared';
export function getMessageList(params) {
    return Net('get', Api.RECEIVED, params);
}

