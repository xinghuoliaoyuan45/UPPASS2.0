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
class PhoneCodeScreen extends BaseScreen {
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

    }

    toLogin = () => {
        this.LoginStore.toLogin(() => {
            this.toScreen('SelectSpace');
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                    RkTheme.currentTheme.colors.gradualEnd]}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                style={{flex: 1}} >
                    <LoginHeader leftType='back' rightPress={this.toregister} leftPress={this.goBack}/>
                    <LoginInput placeholder={ext('plaseInputCode')}
                        type='code'
                        onChange={(text) => {
                            this.LoginStore.changeSmsCode(text);
                        }}/>
                    <LoginOther type='code'/>
                    <LoginNext onPress={this.toLogin}/>
                    {this.renderStatusView(this.LoginStore.screenStatus)}
                </LinearGradient >
            </TouchableOpacity >
        );
    }
}
export default PhoneCodeScreen;
