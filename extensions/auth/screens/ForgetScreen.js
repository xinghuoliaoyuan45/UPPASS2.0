import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    ScrollView
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginHeader from '../components/LoginHeader';
import LoginInput from '../components/RegistInput';
import LoginNext from '../components/LoginNext';
import LoginOther from '../components/RegistOther';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, BaseHeader, getTitlePixel, getPixel, save, initI18nLocale, LANGUAGE } from '../../shared';
import { getCode } from '../connect/request';
import { get } from 'lodash';
import { observable } from 'mobx';
@inject('rootStore')
@observer
class ForgetScreen extends BaseScreen {
    
    @observable showDialog = false;

    constructor(props) {
        super(props);
        const { ForgetStore } = this.props.rootStore.authStore;
        this.ForgetStore = ForgetStore;
        this.state = {
            show: false
        }
    }
    mComponentWillMount = () => {
        this.title = ext('plaseInputPhone');
        this.placeContent = ext('plaseInputPhone');
        this.placeCode = ext('plaseInputCode');
        this.typeContent = 'code';
        this.tyoeCode = 'smsCode';
    }

    changeContent = (text) => {
        this.ForgetStore.changePhone(text);
    }

    changeCode = (text) => {
        this.ForgetStore.changeSmsCode(text);
    }
    getSmsCode = () => {
        // this.ForgetStore.getSmsCode();
        let param = new URLSearchParams()
        param.append('mobile', this.ForgetStore.data.phoneAdd+this.ForgetStore.data.phone)
        getCode(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.ForgetStore.data.localSmsCode = data.data;
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    registBtnAction = () => {
        this.ForgetStore.postRegistInfo(() => {
            this.showToast(ext('resetSuccess'));
            this.toScreen('Login');
        });
    }

    clickServiceAgreement = () => {
        this.toScreen('XieYi');
    }

    clickTermAndConditions = () => {
        this.ForgetStore.data.xieyi = !this.ForgetStore.data.xieyi;
    }

    render() {
        let itemList = [];
        let data = ['中文',
            '한국어.'];
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
        let itemPhoneList = [];
        let phoneList = ['+65', '+60', '+66', '+84',
            '+63', '+62', '+82', '+86'];
        for (let i = 0; i < phoneList.length; i++) {
            itemPhoneList.push(
                <TouchableOpacity onPress={() => {
                    this.showDialog = false;
                    this.ForgetStore.changePhoneAdd(phoneList[i]);
                }} style={{
                    width: getPixel(45),
                    height: getPixel(30),
                    justifyContent: 'center',
                    // alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: RkTheme.currentTheme.fonts.loginInput,
                        color: 'black',
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                    }}>
                        {phoneList[i]}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }}
                activeOpacity={1}
                style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={['white',
                    'white']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            width: getWidth(),
                            height: getTitlePixel(64),
                            marginBottom: getPixel(20),
                            backgroundColor: RkTheme.currentTheme.colors.gradualEnd
                        }}></View>
                        <LoginInput placeholder={this.placeContent}
                            type={'phone'}
                            phoneAdd={this.ForgetStore.data.phoneAdd}
                            callBack={() => { this.showDialog = !this.showDialog }}
                            onChange={this.changeContent} />
                        <LoginInput placeholder={ext('plaseInputNewPassword')}
                            type={'password'}
                            onChange={(text) => {
                                this.ForgetStore.changePassword(text);
                            }} />
                        <LoginInput placeholder={this.placeCode}
                            type={this.tyoeCode}
                            onChange={this.changeCode}
                            getCode={this.ForgetStore.data.phone &&
                                this.ForgetStore.data.phone.length >= 11 ?
                                this.getSmsCode : null} />
                        <View style={{
                            width: getWidth(),
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={this.registBtnAction} style={{
                                width: getPixel(155),
                                height: getPixel(39),
                                backgroundColor: RkTheme.currentTheme.colors.gradualEnd,
                                borderRadius: getPixel(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: getPixel(90)
                            }}>
                                <Text style={{
                                    fontSize: getPixel(13),
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>{ext('success')}</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                    {this.showDialog ? (
                        <View style={{
                            width: getPixel(45),
                            height: getPixel(240),
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: getTitlePixel(144),
                            left: getPixel(50)
                        }}>
                            {itemPhoneList}
                        </View>
                    ) : null}
                    {this.state.show ? <View style={{
                        position: 'absolute',
                        width: getPixel(120),
                        backgroundColor: 'gray',
                        top: getTitlePixel(68),
                        right: getPixel(10),
                        borderRadius: getPixel(4)
                    }}>
                        {itemList}
                    </View> : null}
                    {/* <LoginNext onPress={this.registBtnAction} /> */}
                    <BaseHeader
                        // rightPress={() => {
                        //     this.setState({
                        //         show: !this.state.show
                        //     })
                        // }}
                        // rightName={ext('language')}
                        title={ext('forgetPassword')}
                        leftType='back'
                        leftPress={this.goBack} />
                    {this.renderStatusView(this.ForgetStore.screenStatus)}
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
export default ForgetScreen;
