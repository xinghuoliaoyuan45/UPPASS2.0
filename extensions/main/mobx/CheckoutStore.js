import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getAccountInfo, sendMoney,checkMoney } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN } from '../../shared';
import { ext } from '../const';
export default class CheckoutStore extends BaseStore {
    @observable blance = '';
    @observable passWord = '';

    @action
    changeBlance(blance) {
        this.blance = blance;
    }

    @action
    changePassWord(passWord) {
        this.passWord = passWord;
    }

    checkMoney = async () => {
        this.dataLoading();
        let id = await load(USERJWTTOKEN, '');
        let paypass = await load('payPassword', '');
        if (paypass != this.passWord) {
            this.showToast(ext('pwd_error'));
            this.dataSuccess();
            return;
        }
        let param = new URLSearchParams()
  
        param.append('id', id)
        param.append('amount', this.blance)
        checkMoney(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                // this.userInfo = get(data, 'data');
                this.showToast(ext('success'));
                this.dataSuccess();
            } else {
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(()=>{
            this.dataSuccess();
        });
    }
}