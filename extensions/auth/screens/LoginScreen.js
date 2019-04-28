import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { get } from 'lodash';
import { RkTheme } from 'react-native-ui-kitten';
import LoginHeader from '../components/LoginHeader';
import LoginInput from '../components/LoginInput';
import LoginNext from '../components/LoginNext';
import LoginOther from '../components/LoginOther';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, initI18nLocale, load, save, LANGUAGE, getTitlePixel } from '../../shared';
@inject('rootStore')
@observer
class LoginScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { LoginStore } = this.props.rootStore.authStore;
        this.LoginStore = LoginStore;
        this.state = {
            show: false
        }
    }
    mComponentWillMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidHide);
    }

    _keyboardDidShow = (e) => {
        console.log('console log for chrom e', e);
        this.LoginStore.changekeyBoardHeight(e.endCoordinates.height);
    }
    _keyboardDidHide = () => {
        this.LoginStore.changekeyBoardHeight(0);
    }
    toregister = () => {
        // this.toScreen('Regist');
        this.props.navigation.navigate('Regist', { type: 'phone' });
    }
    getSmsCode = () => {
        return new Promise((RES, REJ) => {
            fetch('http://47.74.24.151:8080/validate_pic', { method: 'POST' }).then(r => {
                return r.blob();
            }).then(blob => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    let images = data.split('base64,')[1];
                    this.LoginStore.data.imageBase = images;
                }
                reader.readAsDataURL(blob);
            }).catch(REJ);
        })
    }

    toBase = (bytes) => {
        var bString = "";

        for (var i = 0, len = bytes.length; i < len; ++i) {

            bString += String.fromCharCode(bytes[i]);

        }

        return btoa(bString);
    }
    login = () => {
        this.LoginStore.login(() => {
            this.toScreen('Main');
        });
    }
    GoEmailLogin = () => {
        this.toScreen('Regist', { type: 'phone' });
    }
    forget = () => {
        this.toScreen('ForgetPwd');
    }
    render() {
        let itemList = [];
        let data = ['中文',
            '한국어'];
        data.forEach((item) => {
            itemList.push(
                <TouchableOpacity onPress={() => {
                    this.setState({
                        show: false
                    }, () => {
                        if (item === '中文') {
                            save(LANGUAGE, 'zh');
                            initI18nLocale('zh');
                            this.toScreen('Splash');
                        } else {
                            save(LANGUAGE, 'en');
                            initI18nLocale('en');
                            this.toScreen('Splash');
                        }
                    });
                }} style={{
                    height: getPixel(40), flex: 1,
                    justifyContent: 'center',
                    paddingLeft: getPixel(10),
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray'
                }}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            );
        });
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <LoginHeader rightPress={() => {
                        this.setState({
                            show: !this.state.show
                        });
                    }} leftType={'none'} rightName={ext('language')} />
                    <View style={{
                        width: getWidth(),
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: getPixel(250),
                            height: getPixel(80),
                            marginTop: getPixel(50),
                            resizeMode: 'stretch'
                        }}
                            source={require('../assets/images/logo.png')}
                        />
                    </View>
                    <LoginInput placeholder={ext('plaseInputPhone')}
                        type='phone'
                        onChange={(text) => {
                            this.LoginStore.changePhone(text);
                        }} />
                    <LoginInput placeholder={ext('plaseInputPassword')}
                        type='password'
                        onChange={(text) => {
                            this.LoginStore.changePassWord(text);
                        }} />
                    {/* <LoginInput placeholder={ext('plaseInputCode')}
                        type='imageCode'
                        onChange={(text) => {
                            this.LoginStore.changeSmsCode(text);
                        }} /> */}
                    <LoginOther type='phone' leftPress={this.GoEmailLogin}
                        rightPress={this.forget} />
                    <LoginNext onPress={this.login} />
                    {this.state.show ? <View style={{
                        position: 'absolute',
                        width: getPixel(120),
                        backgroundColor: 'white',
                        top: getTitlePixel(68),
                        right: getPixel(10),
                        borderRadius: getPixel(4)
                    }}>
                        {itemList}
                    </View> : null}
                    {this.renderStatusView(this.LoginStore.screenStatus)}
                </LinearGradient >
            </TouchableOpacity >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default LoginScreen;
