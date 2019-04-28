import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getSmsCode, toLogin } from '../connect/request';
import { ext } from '../const';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { save, USERINFO, USERJWTTOKEN, MEMERSPACES, SPACES, toastRequestError } from '../../shared';
export default class RegistStore extends BaseStore {
    @observable data = {
        phone: '',
        smsCode: '',
        keyBoardHeight: 0,
        registType: '',
        payPassword: '',
        password: '',
        name: '',
        invitationCode: '',
        xieyi: true,
        localSmsCode: '',
        phoneAdd: '+86'
    };

    @action
    changePhoneAdd(phoneAdd) {
        this.data.phoneAdd = phoneAdd;
    }

    @action
    changeInvitationCode(InvitationCode) {
        this.data.InvitationCode = InvitationCode;
    }

    @action
    changePayPassword(payPassword) {
        this.data.payPassword = payPassword;
    }

    @action
    changeRealName(name) {
        this.data.name = name;
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
    changeEmail(email) {
        this.data.email = email;
    }

    @action
    changePassword(password) {
        this.data.password = password;
    }

    @action
    changekeyBoardHeight(keyBoardHeight) {
        this.data.keyBoardHeight = keyBoardHeight;
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
        param.append('inviteCode', this.data.invitationCode)
        param.append('tel', this.data.phone)
        param.append('userName', this.data.name)
        param.append('password', this.data.password)
        param.append('payPassword', this.data.payPassword)
        toLogin(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                save(USERJWTTOKEN, get(data, 'data.user_id', ''));
                successBack && successBack();
            } else {
                toastRequestError(data);
            }
            // save(USERINFO, get(res, 'data.user', ''));
            // save(MEMERSPACES, get(res, 'data.member_spaces', ''));
            // save(SPACES, get(res, 'data.spaces', ''));
            this.dataSuccess();
        }).catch(() => {
            this.dataSuccess();
        });
    }

    @action
    checkData() {
        if (this.data.name.length === 0) {
            this.showToast(ext('userNameError'));
            return false;
        }
        if (this.data.phone.length < 11) {
            this.showToast(ext('phoneError'));
            return false;
        }
        if (this.data.phone.length < 11) {
            this.showToast(ext('phoneError'));
            return false;
        }
        // if (this.data.smsCode.length === 0) {
        //     this.showToast(ext('plaseInputCode'));
        //     return false;
        // }
        if (this.data.password.length <= 0) {
            this.showToast(ext('passwordError'));
            return false;
        }
        if (this.data.payPassword.length <= 0) {
            this.showToast(ext('payPasswordError'));
            return false;
        }
        if (this.data.InvitationCode.length <= 0) {
            this.showToast(ext('plaseInputInvitationCode'));
            return false;
        }
        if (!this.data.xieyi) {
            this.showToast(ext('pleaseCheckAgreement'));
            return false;
        }
        if (this.data.smsCode != this.data.localSmsCode) {
            console.log('console log for chrom ', this.data.smsCode);
            console.log('console log for chrom ', this.data.localSmsCode);
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
