import { observable, action } from 'mobx';
import { get } from 'lodash';
import BaseStore from '../../mobx/BaseStore';
import { save, USERINFO, USERJWTTOKEN, MEMERSPACES, SPACES,toastRequestError,TELPHONE,NEWTOKEN } from '../../shared';
import { getSmsCode, toLogin, forgetPwd, login, } from '../connect/request';
import { ext } from '../const';
import 'url-search-params-polyfill';
export default class LoginStore extends BaseStore {
    @observable data = {
        phone: '', smsCode: '', keyBoardHeight: 0,
        emali: '', emailPassword: '', imageCode: '',
        passWord: '', imageBase: ''
    };

    @observable forgetEmail = '';

    @action
    changePassWord(passWord) {
        this.data.passWord = passWord;
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
    changekeyBoardHeight(keyBoardHeight) {
        this.data.keyBoardHeight = keyBoardHeight;
    }

    @action
    changeEmail(email) {
        this.data.emali = email;
    }

    @action
    changeEmailPassword(psd) {
        this.data.emailPassword = psd;
    }

    @action
    changeForgetEmail(email) {
        this.forgetEmail = email;
    }

    @action
    getSmsCode(successBack) {
        // if (this.data.phone.length < 11) {
        //     this.showToast(ext('phoneError'));
        //     return;
        // }
        // this.dataLoading();
        getSmsCode().then(() => {
            // this.dataSuccess();
            // successBack && successBack();
        }).catch(() => {
            // this.dataSuccess();
        });
    }

    @action
    login(successBack) {
        if (this.data.phone.length === 0) {
            this.showToast(ext('plaseInputPhone'));
            return;
        }
        if (this.data.passWord.length === 0) {
            this.showToast(ext('passwordError'));
            return;
        }
        this.dataLoading();
        let param = new URLSearchParams()
        param.append('tel', this.data.phone)
        param.append('password', this.data.passWord)
        //param.append('username','admin')
        login(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                save(USERINFO, get(data, 'data', ''));
                save(USERJWTTOKEN, get(data, 'data.id', ''));
                save(TELPHONE,get(data,'data.tel',''));
                save(NEWTOKEN,get(data,'data.app_token'));
                successBack && successBack();
            } else {
                toastRequestError(data);
            }
            this.dataSuccess();
        }).catch(() => {
            this.dataSuccess();
        });
    }
    // @action
    // login(successBack){
    //     this.dataLoading();
    //     let param = new URLSearchParams()
    //     param.append('id',2)
    //     getSession(param).then((res)=>{
    //         successBack && successBack();
    //     }).catch(()=>{
    //         this.dataSuccess();
    //     })
    // }

    @action
    toLogin(successBack) {
        if (this.data.smsCode.length === 0) {
            this.showToast(ext('plaseInputCode'));
            return;
        }
        this.dataLoading();
        toLogin({
            phone_num: this.data.phone,
            sms_code: this.data.smsCode,
        }).then((res) => {
            save(USERINFO, get(res, 'data.user', ''));
            save(USERJWTTOKEN, get(res, 'data.user.jwt_token', ''));
            save(MEMERSPACES, get(res, 'data.member_spaces', ''));
            save(SPACES, get(res, 'data.spaces', ''));
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }
    @action
    emailCheck() {
        const myReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (myReg.test(this.data.emali)) {
            return true;
        }
        return false;
    }
    @action
    forgetEmailCheck() {
        const myReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (myReg.test(this.forgetEmail)) {
            return true;
        }
        return false;
    }

    @action
    emailToLogin(successBack) {
        // 密码6位 邮箱格式
        if (!this.emailCheck()) {
            this.showToast(ext('emailError'));
            return;
        }

        if (this.data.emailPassword.length < 6) {
            this.showToast(ext('passwordError'));
            return;
        }
        this.dataLoading();
        toLogin({
            email: this.data.emali,
            password: this.data.emailPassword,
            way: 'email',
        }).then((res) => {
            save(USERINFO, get(res, 'data.user', ''));
            save(USERJWTTOKEN, get(res, 'data.user.jwt_token', ''));
            save(MEMERSPACES, get(res, 'data.member_spaces', ''));
            save(SPACES, get(res, 'data.spaces', ''));
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }

    @action
    emailForgetPwd(successBack) {
        // 邮箱格式
        if (!this.forgetEmailCheck()) {
            this.showToast(ext('emailError'));
            return;
        }

        this.dataLoading();
        forgetPwd({
            email: this.forgetEmail,
        }).then(() => {
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataError();
        });
    }
}
