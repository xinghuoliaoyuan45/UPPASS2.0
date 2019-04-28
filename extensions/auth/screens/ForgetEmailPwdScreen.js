import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginHeader from '../components/LoginHeader';
import LoginInput from '../components/LoginInput';
import LoginNext from '../components/LoginNext';
import LinearGradient from 'react-native-linear-gradient';
import { Dialog } from '../../shared/components';
@inject('rootStore')
@observer
class ForgetEmailPwdScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { LoginStore } = this.props.rootStore.authStore;
        this.LoginStore = LoginStore;
    }

    mComponentWillMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
        this.title = ext('forgetPassword');
        this.placeContent = ext('plaseInputEmail');
        this.contentType = 'email';
        this.successContent = ext('forgetPwdSuccess');
    }

    changeEmail = (text) => {
        this.LoginStore.changeForgetEmail(text);
    }


    _keyboardDidShow = (e) => {
        this.LoginStore.changekeyBoardHeight(e.endCoordinates.height);
    }

    _keyboardDidHide = () => {
        this.LoginStore.changekeyBoardHeight(0);
    }

    forgetPWDAction = () => {
        // this.LoginStore.emailForgetPwd(() => {
        //     this.refs.Dialog.frameShow();
        // });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }}
                activeOpacity={1}
                style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <LoginHeader
                        rightName={ext('language')}
                        leftType='back'
                        leftPress={this.goBack} />
                    <LoginInput placeholder={ext('plaseInputPhone')}
                        type={'phone'}
                        onChange={this.changeEmail} />
                    <LoginInput placeholder={ext('plaseInputNewPassword')}
                        type={'password'}
                        onChange={this.changeEmail} />
                    <LoginInput placeholder={ext('plaseInputCode')}
                        type={'smsCode'}
                        onChange={this.changeEmail} />
                    <LoginNext onPress={this.forgetPWDAction} />
                    {this.renderStatusView(this.LoginStore.screenStatus)}
                </LinearGradient >
                <Dialog
                    ref='Dialog'
                    // title='标题'           //弹出框头部内容
                    // content='不再玩会吗'    //弹出框内容
                    // cancel='狠心离开'        //弹出框左侧选项内容
                    // submit='继续'          //弹出框右侧选项内容
                    content={this.successContent}
                    isCancel={false}
                    isSubmit={true}
                    cancelFunc={
                        () => {
                            this.goBack();
                        }
                    }
                    submitFunc={
                        () => {
                            this.goBack();
                        }
                    } />
            </TouchableOpacity >
        );
    }
}
export default ForgetEmailPwdScreen;
