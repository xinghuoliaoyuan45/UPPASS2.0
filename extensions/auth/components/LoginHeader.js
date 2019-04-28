import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import BaseScreen from '../../BaseScreen';
import { getPixel, getWidth, Svgs, getTitlePixel } from '../../shared';
import { ext } from '../const'
import {
    RkTheme,
} from 'react-native-ui-kitten';
class LoginHeader extends BaseScreen {

    leftPress = () => {
        const { leftPress } = this.props;
        if (leftPress) {
            leftPress();
            return;
        }
    }

    rightPress = () => {
        const { rightPress } = this.props;
        if (rightPress) {
            rightPress();
            return;
        }
    }
    /**
     * from @zhaojian Tel 15147088209
     * content title:头部文字;leftType:close,back,none左侧按钮显示;rightName:右侧文字显示;
     *         rightPress:右侧按钮点击事件;leftPress:左侧按钮点击事件
     */
    render() {
        const { title, leftType, rightName } = this.props;
        return (
                <View style={{
                    width: getWidth(), height: getPixel(44), justifyContent: 'space-between',
                    alignItems: 'center', marginTop: getTitlePixel(20),
                    flexDirection: 'row', paddingHorizontal: getPixel(20)
                }}>
                    {leftType === 'none' ? <View /> :
                        <TouchableOpacity onPress={this.leftPress}>
                            <Svgs icon={leftType === 'back' ? 'icon_back' : 'icon_close'} size={getPixel(19)}
                                color={RkTheme.currentTheme.colors.loginHeader} />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={this.rightPress}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.loginHeader,
                            fontSize: RkTheme.currentTheme.fonts.loginHeader,
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{rightName ? rightName : ''}</Text>
                    </TouchableOpacity>
                </View>

        );
    }
}
export default LoginHeader;
