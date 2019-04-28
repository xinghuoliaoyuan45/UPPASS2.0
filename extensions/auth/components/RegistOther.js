import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import BaseScreen from '../../BaseScreen';
import { getPixel, getWidth, Svgs } from '../../shared';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import { observer,inject } from 'mobx-react';
import { observable } from 'mobx';
@inject('rootStore')
@observer
class RegistOther extends BaseScreen {
    @observable leftName = '';
    @observable rightName = '';
    @observable second = 0;

    constructor(props) {
        super(props);
        const { RegistStore } = this.props.rootStore.authStore;
        this.RegistStore = RegistStore;
    }
    componentWillMount() {
        const { type } = this.props;
        if (type === 'phone') {
            this.leftName = ext('registerNewAccount');
            this.rightName = '';
        } else if (type === 'code') {
            this.leftName = ext('getSmsCode');
            this.rightName = ext('getVoiceCode');
        } else if (type === 'email') {
            this.leftName = ext('codeLogin');
            this.rightName = ext('forgetPassword');
        }
    }

    componentDidMount() {
        this.openInterval();
    }

    changeSecond = () => {
        this.second = this.second - 1;
        this.leftName = `${ext('getSmsCode')}(${this.second}s)`;
        if (this.second <= 0) {
            this.timer && clearInterval(this.timer);
            this.leftName = ext('getSmsCode');
        }
    }

    openInterval = () => {
        const { type } = this.props;
        if (type === 'code') {
            this.second = 60;
            this.timer = setInterval(this.changeSecond, 1000);
        }
    }

    leftPress = () => {
        const { leftPress } = this.props;
        if (leftPress && this.second <= 0) {
            leftPress();
        }
    }

    rightPress = () => {
        const { rightPress } = this.props;
        if (rightPress) {
            rightPress();
        }
    }

    /**
     * from @zhaojian Tel 15147088209
     * content type:手机登录phone  验证码code  邮箱登录email  注册register;
     *         leftPress:左侧按钮点击事件;rightPress右侧按钮点击事件
     */
    render() {
        const { type } = this.props;
        return (
            <View style={{
                width: getWidth(),
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: getPixel(23),
                flexDirection: 'row',
                paddingHorizontal: getPixel(50),
            }}>
                {type === 'register' ? null :
                    <TouchableOpacity onPress={this.leftPress}>
                        <Text style={{
                            color: this.second <= 0 ? RkTheme.currentTheme.colors.loginHeader :
                                RkTheme.currentTheme.colors.whiteTransparent,
                            fontSize: RkTheme.currentTheme.fonts.loginHeader,
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{this.leftName}
                        </Text>
                    </TouchableOpacity>}
                {type === 'register' ? null :
                    <TouchableOpacity onPress={this.rightPress}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.loginHeader,
                            fontSize: RkTheme.currentTheme.fonts.loginHeader,
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{this.rightName}
                        </Text>
                    </TouchableOpacity>
                }
                {type === 'register' ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Svgs onPress={() => {
                            this.rightPress();
                        }} icon={this.RegistStore.data.xieyi?'icon_check':'icon_uncheck'}
                            size={getPixel(13)}
                            color={RkTheme.currentTheme.colors.gradualEnd} />
                        <Text style={{
                            color: RkTheme.currentTheme.colors.gradualEnd,
                            fontSize: RkTheme.currentTheme.fonts.register,
                            fontWeight: RkTheme.currentTheme.weight.Light,
                            marginLeft: getPixel(5),
                        }}>
                            {ext('agree')}《
                            <Text onPress={this.leftPress} style={{ textDecorationLine: 'underline' }}>
                                {ext('kubanAgreement')}
                            </Text>》
                        </Text>
                    </View> : null}
            </View>
        );
    }
}
export default RegistOther;
