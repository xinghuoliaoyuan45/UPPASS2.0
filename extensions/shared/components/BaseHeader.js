import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getPixel, getWidth, Svgs, getTitlePixel,save } from '../../shared';
import { RkTheme } from 'react-native-ui-kitten';
import { LANGUAGE, getHeight } from '../utils';
import BaseScreen from '../../BaseScreen';
import { ext } from '../../auth/const';
import RNRestart from 'react-native-restart';

export class BaseHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    leftPress = () => {
        const { leftPress } = this.props;
        if (leftPress) {
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
     * content title:头部文字;leftType:close,back,none左侧按钮显示;rightName:右侧文字显示;
     *         rightPress:右侧按钮点击事件;leftPress:左侧按钮点击事件
     */
    render() {
        let {
            title, leftType, rightName, linearColor, rightType,
            leftColor, leftName
        } = this.props;
        if (linearColor) {
            this.color = linearColor;
        } else {
            this.color = ['#00000000',
                '#00000000'];
        }
        if (!leftColor) {
            leftColor = 'white'
        }
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
                            RNRestart.Restart();
                            // initI18nLocale('zh');
                            // this.toScreen('Splash');
                        } else {
                            save(LANGUAGE, 'en');
                            RNRestart.Restart();
                            // initI18nLocale('en');
                            // this.toScreen('Splash');
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
            <LinearGradient style={{
                overflow: 'visible',
                width: getWidth(),
                height: getTitlePixel(64),
                position: 'absolute',
                justifyContent: 'flex-end',

            }}
                colors={this.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                {/* <View style={{
                    width: getWidth(),
                    height: getPixel(30),
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: getPixel(20),
                }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            show: !this.state.show
                        });
                    }}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.loginHeader,
                            fontSize: RkTheme.currentTheme.fonts.loginHeader,
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{ext('language')}</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{
                    width: getWidth(),
                    height: getPixel(44),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: getPixel(20),
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: RkTheme.currentTheme.fonts.baseHeader,
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                        position: 'absolute',
                        width: getWidth(),
                        textAlign: 'center',
                    }}>{title}
                    </Text>
                    {leftType === 'none' ? <View /> :
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            flexDirection: 'row'
                        }} onPress={this.leftPress}>
                            <Svgs icon={'icon_back'}
                                size={getPixel(19)}
                                color={leftColor} />
                            <Text style={{
                                color: 'white',
                                fontSize: RkTheme.currentTheme.fonts.baseHeader,
                                fontWeight: RkTheme.currentTheme.weight.Regular,
                                marginLeft: getPixel(8)
                            }}>{leftName}
                            </Text>
                        </TouchableOpacity>
                    }
                    {rightType &&
                        <TouchableOpacity onPress={this.rightPress}>
                            <Svgs icon='icon_back'
                                size={getPixel(19)}
                                color={RkTheme.currentTheme.colors.baseHeader} />
                        </TouchableOpacity>
                    }

                    {rightName &&
                        <TouchableOpacity onPress={this.rightPress}>
                            <Text style={{
                                color: 'white',
                                fontSize: RkTheme.currentTheme.fonts.baseHeader,
                                fontWeight: RkTheme.currentTheme.weight.Regular,
                            }}>{rightName}
                            </Text>
                        </TouchableOpacity>
                    }

                </View>
                <StatusBar backgroundColor='transparent' translucent barStyle={'light-content'} />

            </LinearGradient>
        );
    }
}

