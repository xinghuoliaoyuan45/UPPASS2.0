import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getSmsCode, toLogin, resetPwd } from '../connect/request';
import { ext } from '../const';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { save, USERINFO, USERJWTTOKEN, MEMERSPACES, SPACES, toastRequestError } from '../../shared';
export default class ForgetStore extends BaseStore {
    @observable data = {
        phone: '',
        smsCode: '',
        password: '',
        localSmsCode: '',
        phoneAdd: '+86'
    };

    @action
    changePhoneAdd(phoneAdd) {
        this.data.phoneAdd = phoneAdd;
    }

    @action
    changePhone(phone) {
        this.data.phone = phone;
    }

    @action
    changeSmsCode(code) {
        this.data.smsCode = code;
    }

    @action
    changePassword(password) {
        this.data.password = password;
    }

    @action
    getSmsCode(successBack) {
        if (this.data.name.length === 0) {
            this.showToast(ext('userNameError'));
            return;
        }
        if (this.data.phone.length < 11) {
            this.showToast(ext('phoneError'));
            return;
        }
        this.dataLoading();
        getSmsCode({ phone_num: this.data.phone }).then(() => {
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }

    @action
    changeRegistType(registType) {
        this.data.registType = registType;
    }

    @action
    postRegistInfo(successBack) {
        if (!this.checkData()) {
            return;
        }
        this.dataLoading();
        let param = new URLSearchParams()
        param.append('mobile', this.data.phone)
        param.append('password', this.data.password)
        resetPwd(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                successBack && successBack();
            } else {
                toastRequestError(data);
            }
            this.dataSuccess();
        }).catch(() => {
            this.dataSuccess();
        });
    }

    @action
    checkData() {
        if (this.data.phone.length < 11) {
            this.showToast(ext('phoneError'));
            return false;
        }
        if (this.data.password.length <= 0) {
            this.showToast(ext('plaseInputNewPassword'));
            return false;
        }
        if(this.data.smsCode!=this.data.localSmsCode||this.data.localSmsCode===''){
            this.showToast(ext('smserror'));
            return false;
        }
        return true;
    }

    @action
    emailCheck() {
        const myReg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (myReg.test(this.data.emali)) {
            return true;
        }
        return false;
    }
}
