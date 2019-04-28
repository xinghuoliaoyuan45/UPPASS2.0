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
import { ext } from '../../auth/const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../../auth/components/RegistInput';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, BaseHeader, getTitlePixel, getPixel, save, initI18nLocale, LANGUAGE } from '../../shared';
import { getCode } from '../connect/request';
import { get } from 'lodash';
import { resetPwd } from '../../auth/connect/request';
@inject('rootStore')
@observer
class SettingPwdScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { ForgetStore } = this.props.rootStore.authStore;
        this.ForgetStore = ForgetStore;
        this.state = {
            show: false
        }
        this.newpwd = '';
        this.oldpwd = '';
        this.querenpwd = '';
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }
    mComponentWillMount = () => {
        this.title = ext('plaseInputPhone');
        this.placeContent = ext('currentpwd');
        this.placeCode = ext('querenpwd');
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
        param.append('mobile', this.ForgetStore.data.phone)
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
        if (this.oldpwd === '') {
            this.showToast(ext('请输入旧密码'));
            return;
        }
        if (this.newpwd === '') {
            this.showToast(ext('请输入新密码'));
            return;
        }
        if (this.querenpwd === '') {
            this.showToast(ext('请确认密码'));
            return;
        }
        if (this.newpwd != this.querenpwd) {
            this.showToast(ext('两次密码输入不一致'));
            return;
        }
        console.log('console log for chrom this.SegmentedStore',
        this.SegmentedStore.userInfo.tel);
        let param = new URLSearchParams()
        param.append('mobile', this.SegmentedStore.userInfo.tel)
        param.append('password', this.newpwd)
        resetPwd(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.showToast('修改成功');
            } else {
                toastRequestError(data);
            }
        }).catch(() => {
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
                            height: getTitlePixel(98),
                            marginBottom: getPixel(20),
                            backgroundColor: RkTheme.currentTheme.colors.gradualEnd
                        }}></View>
                        <LoginInput placeholder={this.placeContent}
                            type={'password'}
                            onChange={(value) => {
                                this.oldpwd = value;
                            }} />
                        <LoginInput placeholder={ext('plaseInputNewPassword')}
                            type={'password'}
                            onChange={(value) => {
                                this.newpwd = value;
                            }} />
                        <LoginInput placeholder={this.placeCode}
                            type={'password'}
                            onChange={(value) => {
                                this.querenpwd = value;
                            }} />
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
                        rightPress={() => {
                            this.setState({
                                show: !this.state.show
                            })
                        }}
                        title={ext('changepwd')}
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
export default SettingPwdScreen;
