import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import { getPixel, getWidth, Svgs } from '../../shared';
import BaseScreen from '../../BaseScreen';
@inject('rootStore')
@observer
class RegistInput extends BaseScreen {

    constructor(props) {
        super(props);
        const { LoginStore } = this.props.rootStore.authStore;
        this.LoginStore = LoginStore;
    }
    @observable value = '';

    @observable keyboardType = '';

    @observable maxLength = '';

    @observable secureTextEntry = '';

    @observable second = 0;
    @observable smsCodeText = '';
    @observable showDialog = false;
    onChangeText = (text) => {
        const { onChange } = this.props;
        onChange && onChange(text);
        this.value = text;
    }

    componentWillMount() {
        const { type } = this.props;
        this.keyboardType = '';
        this.maxLength = 30;
        this.smsCodeText = ext('getCode');
        this.secureTextEntry = false;
        if (type === 'phone' || type === 'code') {
            this.keyboardType = 'numeric';
            this.maxLength = 11;
        } else {
            this.keyboardType = 'email-address';
        }
        if (type === 'password') {
            this.keyboardType = 'default';
            this.secureTextEntry = true;
        }
    }

    changeText = () => {
        this.second = 60;
        this.timer = setInterval(this.changeSecond, 1000);
    }
    changeSecond = () => {
        this.second = this.second - 1;
        this.smsCodeText = `${ext('getSmsCode')}(${this.second}s)`;
        if (this.second <= 0) {
            this.timer && clearInterval(this.timer);
            this.smsCodeText = ext('getSmsCode');
        }
    }


    leftPress = () => {
        const { getCode } = this.props;
        if (!!getCode && this.second <= 0) {
            getCode();
            this.changeText();
        } else {
            this.showToast('请输入手机号');
        }
    }

    /**
     * from @zhaojian Tel 15147088209
     * content props type:phone,password,code,other;placeholder 占位文字;onChange 文字改变回调
     */
    render() {
        
        const { type, placeholder } = this.props;
        let baseImage = `data:image/png;base64,${this.LoginStore.data.imageBase}`;
        console.log('console log for chrom baseImage', baseImage);
        return (
            <View style={{ overflow: 'visible' }}>
                <View style={{
                    marginTop: getPixel(34),
                    flexDirection: 'row',
                    width: getWidth() - getPixel(50 * 2),
                    alignItems: 'center',
                    marginBottom: getPixel(15),
                    marginLeft: getPixel(50),
                }}>
                    {type === 'phone' ? (
                        <Text onPress={() => {
                            this.props.callBack && this.props.callBack();
                        }} style={{
                            fontSize: RkTheme.currentTheme.fonts.loginInput,
                            color: 'black',
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                            marginRight: getPixel(21),
                        }}>
                            {this.props.phoneAdd}
                        </Text>
                    ) : null}
                    <TextInput
                        style={{
                            width: getWidth() - getPixel(50 * 2) - getPixel(type === 'phone' ? 104 : 60),
                            fontSize: getPixel(14),
                            color: '#000000',
                            fontWeight: this.value ? RkTheme.currentTheme.weight.Semibold
                                : RkTheme.currentTheme.weight.Light,
                            padding: 0
                        }}
                        keyboardType={this.keyboardType}
                        selectionColor={'black'}
                        placeholder={placeholder}
                        numberOfLines={1}
                        maxLength={this.maxLength}
                        secureTextEntry={this.secureTextEntry}
                        value={this.value}
                        autoComplete={'password'}
                        placeholderTextColor={'rgba(0,0,0,0.4)'}
                        onChangeText={this.onChangeText} />
                    <View style={{
                        position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center',
                    }}>
                        {this.value ? (
                            <TouchableOpacity onPress={() => {
                                this.value = '';
                                this.onChangeText('');
                            }}>
                                <Image source={require('../assets/images/delete.png')} />
                            </TouchableOpacity>
                        ) : null}
                        {type === 'password' ? (
                            <TouchableOpacity onPress={() => {
                                this.secureTextEntry = !this.secureTextEntry;
                            }}>
                                <Svgs icon={this.secureTextEntry ? 'icon_hide' : 'icon_show'}
                                    size={getPixel(19)}
                                    style={{ marginLeft: getPixel(20) }}
                                    color={RkTheme.currentTheme.colors.gradualEnd} />
                            </TouchableOpacity>
                        ) : null}

                        {type === 'smsCode' ? (
                            <TouchableOpacity onPress={this.leftPress}>
                                <Text style={{
                                    color: RkTheme.currentTheme.colors.gradualEnd,
                                    fontSize: RkTheme.currentTheme.fonts.loginHeader,
                                    fontWeight: RkTheme.currentTheme.weight.Regular,
                                    marginLeft: getPixel(20),
                                }}>{this.smsCodeText}
                                </Text>
                            </TouchableOpacity>
                        ) : null
                        }
                        {type === 'imageCode' ? (
                            <TouchableOpacity onPress={this.leftPress}>
                                <Image style={{
                                    height: getPixel(30),
                                    width: getPixel(70),
                                }} source={{ uri: baseImage }} />
                            </TouchableOpacity>
                        ) : null
                        }
                    </View>

                </View>
                <View style={{
                    width: getWidth() - getPixel(50 * 2),
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: RkTheme.currentTheme.colors.gradualEnd,
                    position: 'absolute',
                    bottom: 0,
                    left: getPixel(50),
                }} />
                

            </View>
        );
    }
}
export default RegistInput;
