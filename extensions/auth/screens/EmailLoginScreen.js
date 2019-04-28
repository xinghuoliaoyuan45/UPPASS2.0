import React from 'react';

import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {RkTheme} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import BaseScreen from '../../BaseScreen';
import {ext} from '../const';
import LoginHeader from '../components/LoginHeader';
import LoginInput from '../components/LoginInput';
import LoginNext from '../components/LoginNext';
import LoginOther from '../components/LoginOther';
@inject('rootStore')
@observer
class EmailLoginScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {LoginStore} = this.props.rootStore.authStore;
        this.LoginStore = LoginStore;
    }

     mComponentWillMount = () => {
         this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
         this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
     }

    _keyboardDidShow = (e) => {
        this.LoginStore.changekeyBoardHeight(e.endCoordinates.height);
    }

    _keyboardDidHide = () => {
        this.LoginStore.changekeyBoardHeight(0);
    }

    toregister = () => {
        // this.toScreen('Regist');
        this.props.navigation.navigate('Regist', {type: 'email'});
    }
    goPhoneLogin = () => {
        this.toScreen('Login');
    }
    emailToLogin = () => {
        this.LoginStore.emailToLogin(() => {
            this.toScreen('Login');
        });
    }
    forgetPwd = () => {
        this.toScreen('ForgetPwd');
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} style={{flex: 1}} activeOpacity={1}>
                <StatusBar barStyle='light-content'/>
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                    RkTheme.currentTheme.colors.gradualEnd]}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                style={{flex: 1}}>
                    <LoginHeader leftPress={this.goBack}
                        leftType='back'
                        rightPress={this.toregister}
                        rightName={ext('registerNewAccount')}/>
                    <LoginInput placeholder={ext('plaseInputEmail')}
                        onChange={(text) => {
                            this.LoginStore.changeEmail(text);
                        }}/>
                    <LoginInput placeholder={ext('plaseInputPassword')}
                        type='password'
                        onChange={(text) => {
                            this.LoginStore.changeEmailPassword(text);
                        }}/>
                    <LoginOther type='email' leftPress={this.goPhoneLogin} rightPress={this.forgetPwd}/>
                    <LoginNext onPress={this.emailToLogin}/>
                    {this.renderStatusView(this.LoginStore.screenStatus)}
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

export default EmailLoginScreen;
