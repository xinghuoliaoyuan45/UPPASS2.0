import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getAccountInfo } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN, save } from '../../shared';
export default class SegmentedStore extends BaseStore {
    @observable userInfo = {};

    @action
    changeSelect(index) {
        this.selectTab = index;
    }

    getAccountInfo= async()=> {
        let id = await load(USERJWTTOKEN,'');
        let param = new URLSearchParams()
        param.append('id', id)
        getAccountInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.userInfo = get(data, 'data');
                save('payPassword',get(data,'data.payPassword'));
            } else {
                toastRequestError(data);
            }
        }).catch();
    }
}
