/**
 * from @marongting Tel 13269798391
 * content SelectSpaceScreen
 */
import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import LinearGradient from 'react-native-linear-gradient';
import 'url-search-params-polyfill';
import QRCode from 'react-native-qrcode-svg';

import {
    getPixel, getTitlePixel, KBFlatList,
    load, MEMERSPACES, BaseHeader, USERJWTTOKEN,
    getWidth,
    getHeight, Svgs, save, TELPHONE
} from '../../shared';
import { get } from 'lodash';
import SpaceItems from '../components/SpaceItems';
import { observable } from 'mobx';
import { getHis, ADD_USER_RETURN_VISIT } from '../connect/request';
import { getCode } from '../../auth/connect/request';
const { width } = Dimensions.get('window');
@inject('rootStore')
@observer
class ContactScreen extends BaseScreen {
    @observable data = [];
    @observable savephone = ext('nocontact');
    constructor(props) {
        super(props);
        this.phone = '';
        this.sms = '';
        this.localSmsCode = false;
        this.state = {
            show: false
        }
    }

    mComponentDidMount=async()=>{
        let phone = load(TELPHONE,'');
        if(phone){
            this.savephone = ext('entryphone');
        }
    }

    onChangeText = (value) => {
        this.phone = value
    }

    onChangeSMS = (value) => {
        this.sms = value
    }
    sendSms = () => {
        if (this.phone === '') {
            this.showToast(ext('plaseinputphone'));
            return;
        }
        // this.RegistStore.getSmsCode();
        let param = new URLSearchParams()
        param.append('mobile', this.phone)
        getCode(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.showToast(ext('sendsuccess'));
                this.localSmsCode = data.data;
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    saveData = () => {
        if (this.phone === '') {
            this.showToast(ext('plaseinputphone'));
            return;
        }
        if (!this.localSmsCode) {
            this.showToast(ext('plasesendsms'));
            return;
        }
        if (this.sms === '') {
            this.showToast(ext('plaseinoutsms'));
            return;
        }
        if (this.sms != this.localSmsCode) {
            this.showToast(ext('smserror'));
            return;
        }
        let param = new URLSearchParams()
        param.append('tel', this.phone)
        ADD_USER_RETURN_VISIT(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.showToast(ext('savesuccess'));
                save(TELPHONE, this.phone);
                this.savephone = ext('entryphone');
            } else {
                toastRequestError(data);
            }
        }).catch();
    }
    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: RkTheme.currentTheme.colors.allBackground,

            }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <View style={{
                        width: getWidth(),
                        alignItems: 'center',
                        marginTop: getTitlePixel(98)
                    }}>
                        <View
                            style={{
                                backgroundColor: '#db9831',
                                justifyContent: 'center',
                                width: getPixel(260),
                                height: getPixel(28),
                                alignItems: 'center',
                                marginTop: getPixel(40)
                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(12),
                                color: 'white'
                            }}>
                                {this.savephone}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    show: true
                                });
                            }}
                            style={{
                                backgroundColor: '#385893',
                                justifyContent: 'center',
                                width: getPixel(160),
                                height: getPixel(38),
                                alignItems: 'center',
                                marginTop: getPixel(30)
                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(12),
                                color: 'white'
                            }}>
                                {ext('Contactus')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.show ? <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    show: false
                                });
                            }}
                            style={{
                                width: getWidth(),
                                height: getHeight(),
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                position: 'absolute',
                                alignItems: 'center'
                            }}>
                            <View style={{
                                width: getPixel(308),
                                height: getPixel(285),
                                backgroundColor: 'rgba(0, 0, 0, 0.44)',
                                marginTop: getPixel(240),
                                borderRadius: getPixel(7)
                            }}>
                                <View style={{
                                    width: getPixel(308),
                                    height: getPixel(52),
                                    paddingHorizontal: getPixel(20),
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'white',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        fontSize: getPixel(16),
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>
                                        {ext('identityauthentication')}
                                    </Text>
                                    <Svgs
                                        onPress={() => {
                                            this.setState({
                                                show: false
                                            });
                                        }}
                                        icon={'icon_close'}
                                        size={getPixel(17)}
                                        color={'white'} />
                                </View>
                                <Text style={{
                                    fontSize: getPixel(14),
                                    color: 'white',
                                    marginLeft: getPixel(20),
                                    marginTop: getPixel(12)
                                }}>
                                    {ext('Phonenumber')}
                                </Text>
                                <View style={{
                                    marginTop: getPixel(11),
                                    flexDirection: 'row',
                                    width: getPixel(267),
                                    alignItems: 'center',
                                    marginLeft: getPixel(20),
                                }}>
                                    <TextInput
                                        style={{
                                            borderRadius: getPixel(6),
                                            width: getPixel(267),
                                            fontSize: RkTheme.currentTheme.fonts.loginInput,
                                            color: RkTheme.currentTheme.colors.loginHeader,
                                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                                            padding: 0,
                                            backgroundColor: '#55647f',
                                            paddingLeft: getPixel(5),
                                            height: getPixel(30)
                                        }}
                                        selectionColor={RkTheme.currentTheme.colors.loginHeader}
                                        numberOfLines={1}
                                        maxLength={11}
                                        onChangeText={this.onChangeText} />
                                    <TouchableOpacity onPress={() => {
                                        this.sendSms();
                                    }} style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        width: getPixel(90),
                                        height: getPixel(30),
                                        backgroundColor: '#152645',
                                        borderRadius: getPixel(6),
                                        position: 'absolute', right: 0,
                                    }}>
                                        <Text style={{
                                            color: RkTheme.currentTheme.colors.loginHeader,
                                            fontSize: RkTheme.currentTheme.fonts.loginHeader,
                                            fontWeight: RkTheme.currentTheme.weight.Regular,
                                        }}>{ext('sendsms')}
                                        </Text>
                                    </TouchableOpacity>


                                </View>
                                <Text style={{
                                    fontSize: getPixel(14),
                                    color: 'white',
                                    marginLeft: getPixel(20),
                                    marginTop: getPixel(30)
                                }}>
                                    {ext('Certificatenumber')}
                                </Text>
                                <View style={{
                                    marginTop: getPixel(11),
                                    flexDirection: 'row',
                                    width: getPixel(267),
                                    alignItems: 'center',
                                    marginLeft: getPixel(20),
                                }}>
                                    <TextInput
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#686775',
                                            borderRadius: getPixel(6),
                                            width: getPixel(267),
                                            fontSize: RkTheme.currentTheme.fonts.loginInput,
                                            color: 'white',
                                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                                            padding: 0,
                                            height: getPixel(30)
                                        }}
                                        selectionColor={RkTheme.currentTheme.colors.loginHeader}
                                        numberOfLines={1}
                                        maxLength={11}
                                        placeholderTextColor={'#686775'}
                                        placeholder={ext('inoutcode')}
                                        onChangeText={this.onChangeSMS} />
                                </View>

                                <TouchableOpacity onPress={() => {
                                    this.saveData();
                                }} style={{
                                    width: getPixel(194),
                                    height: getPixel(34),
                                    borderRadius: getPixel(6),
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    marginTop: getPixel(18),
                                    marginLeft: getPixel(57),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: getPixel(12)
                                    }}>
                                        {ext('CertificateNumberCheck')}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity> : null
                    }
                    <BaseHeader leftType='back'
                        leftPress={this.goBack}
                        title={ext('contact')} />
                </LinearGradient>
            </View>
        );
    }
}

export default ContactScreen;

