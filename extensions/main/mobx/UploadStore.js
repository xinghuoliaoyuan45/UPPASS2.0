
import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getAccountInfo, sendMoney,checkMoney } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN } from '../../shared';
import { ext } from '../const';
export default class UploadStore extends BaseStore {
    @observable money = '';
    @observable account = '';
    @observable blance = '';
    @observable passWord = '';

    @action
    changeAccount(account) {
        console.log('console log for chrom 123', 123);
        this.account = account;
    }

    @action
    changeBlance(blance) {
        this.blance = blance;
    }

    @action
    changePassWord(passWord) {
        this.passWord = passWord;
    }

    @action
    changeMoney(money) {
        this.money = money;
    }

    getAccountInfo = async () => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('id', id)
        getAccountInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.userInfo = get(data, 'data');
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    sendMoney = async successBack => {
        this.dataLoading();
        let id = await load(USERJWTTOKEN, '');
        let paypass = await load('payPassword', '');
        if (paypass != this.passWord) {
            this.showToast('支付密码错误');
            this.dataSuccess();
            return;
        }
        let param = new URLSearchParams()
        param.append('id', id)
        param.append('targetId', this.account)
        param.append('amount', this.blance)
        param.append('money', this.money)
        sendMoney(param).then((res) => {
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
            successBack&&successBack();
        }).catch(()=>{
            this.dataSuccess();
        });
    }
}
