import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import { getPixel, getWidth, Svgs } from '../../shared';
import { ext } from '../const'
import { observer, inject } from 'mobx-react';
import {
    RkTheme,
} from 'react-native-ui-kitten';
@inject('rootStore')
@observer
class LoginNext extends BaseScreen {
    constructor(props) {
        super(props);
        const { LoginStore } = this.props.rootStore.authStore;
        this.LoginStore = LoginStore;
    }
    nextPress = () => {
        const { onPress } = this.props;
        onPress && onPress();
    }



    render() {
        console.log('console log for chrom renderrenderrender');
        let bottom = 0;
        if (this.LoginStore.data.keyBoardHeight === 0) {
            bottom = getPixel(54);
        } else {
            bottom = this.LoginStore.data.keyBoardHeight + getPixel(20);
        }
        return (
            <TouchableOpacity activeOpacity={1}
                onPress={this.nextPress}
                style={{ position: 'absolute', right: getPixel(27), bottom: bottom }}>
                <Svgs icon={'icon_next'} size={getPixel(64)}
                    color={RkTheme.currentTheme.colors.loginHeader} />
            </TouchableOpacity>
        );
    }
}
export default LoginNext;
