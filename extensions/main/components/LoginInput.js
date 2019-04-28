import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {ext} from '../const';
import {RkTheme} from 'react-native-ui-kitten';
import {getPixel, getWidth, Svgs} from '../../shared';
import BaseScreen from '../../BaseScreen';
@observer
class LoginInput extends BaseScreen {
    @observable value = '';

    @observable keyboardType = '';

    @observable maxLength = '';

    @observable secureTextEntry = '';

    @observable second = 0;
    @observable smsCodeText='';
    onChangeText = (text) => {
        const {onChange} = this.props;
        onChange && onChange(text);
        this.value = text;
    }

    componentWillMount() {
        const {type} = this.props;
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
        const {getCode} = this.props;
        if (!!getCode && this.second <= 0) {
            getCode();
            this.changeText();
        }
    }

    /**
     * from @zhaojian Tel 15147088209
     * content props type:phone,password,code,other;placeholder 占位文字;onChange 文字改变回调
     */
    render() {
        const {type, placeholder} = this.props;
        return (
            <View>
                <View style={{
                    marginTop: getPixel(34),
                    flexDirection: 'row',
                    width: getWidth() - getPixel(27 * 2),
                    alignItems: 'center',
                    marginBottom: getPixel(15),
                    marginLeft: getPixel(27),
                }}>
                    {type === 'phone' ? (
                        <Text style={{
                            fontSize: RkTheme.currentTheme.fonts.loginInput,
                            color: RkTheme.currentTheme.colors.loginHeader,
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                            marginRight: getPixel(21),
                        }}>
                            +86
                        </Text>
                    ) : null}
                    <TextInput
                        style={{
                            width: getWidth() - getPixel(27 * 2) - getPixel(type === 'phone' ? 104 : 60),
                            fontSize: RkTheme.currentTheme.fonts.loginInput,
                            color: RkTheme.currentTheme.colors.loginHeader,
                            fontWeight: this.value ? RkTheme.currentTheme.weight.Semibold
                                : RkTheme.currentTheme.weight.Light,
                                padding:0
                        }}
                        keyboardType={this.keyboardType}
                        selectionColor={RkTheme.currentTheme.colors.loginHeader}
                        placeholder={placeholder}
                        numberOfLines={1}
                        maxLength={this.maxLength}
                        secureTextEntry={this.secureTextEntry}
                        placeholderTextColor={RkTheme.currentTheme.colors.whiteTransparent}
                        value={this.value}
                        onChangeText={this.onChangeText}/>
                    <View style={{
                        position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center',
                    }}>
                        {this.value ? (
                            <TouchableOpacity onPress={() => {
                                this.value = '';
                                this.onChangeText('');
                            }}>
                                <Image source={require('../assets/delete.png')}/>
                            </TouchableOpacity>
                        ) : null}
                        {type === 'password' ? (
                            <TouchableOpacity onPress={() => {
                                this.secureTextEntry = !this.secureTextEntry;
                            }}>
                                <Svgs icon={this.secureTextEntry ? 'icon_hide' : 'icon_show'}
                                    size={getPixel(19)}
                                    style={{marginLeft: getPixel(20)}}
                                    color={RkTheme.currentTheme.colors.loginHeader}/>
                            </TouchableOpacity>
                        ) : null}
                        {type === 'phone' && this.value.length >= 11 ? (
                            <TouchableOpacity>
                                <Svgs icon='icon_check'
                                    size={getPixel(19)}
                                    style={{marginLeft: getPixel(20)}}
                                    color={RkTheme.currentTheme.colors.loginHeader}/>
                            </TouchableOpacity>
                        ) : null}
                        {type === 'smsCode' ? (
                            <TouchableOpacity onPress={this.leftPress}>
                                <Text style={{
                                    color: RkTheme.currentTheme.colors.loginHeader,
                                    fontSize: RkTheme.currentTheme.fonts.loginHeader,
                                    fontWeight: RkTheme.currentTheme.weight.Regular,
                                    marginLeft: getPixel(20),
                                }}>{this.smsCodeText}
                                </Text>
                            </TouchableOpacity>
                        ) : null
                        }
                    </View>

                </View>
                <View style={{
                    width: getWidth() - getPixel(27 * 2),
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: RkTheme.currentTheme.colors.whiteTransparent,
                    position: 'absolute',
                    bottom: 0,
                    left: getPixel(27),
                }}/>
            </View>
        );
    }
}
export default LoginInput;
