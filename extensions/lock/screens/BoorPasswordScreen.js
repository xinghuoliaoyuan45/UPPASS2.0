import React from 'react';

import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {getPixel, screenWidth, getFontPixel, load, USERINFO} from '../../shared';
import NavigationView from '../components/NavigationView';
import {RkStyleSheet} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';

@inject('rootStore')
@observer
export default class BoorPasswordScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {lockStore} = this.props.rootStore.lockStore;
        this.lockStore = lockStore;
    }

    render() {
        return (
            <View style={styles.root}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.headBackImageStyle} source={require('../assets/passwordBack.png')}/>
                        <Text style={styles.titleStyle}>{'您还没有开门密码\n点击下方按钮获取开门密'}</Text>
                        <ImageBackground style={styles.imageStyle} source={require('../assets/Rectangle.png')}>
                            <Text style={styles.passwordStyle}>{
                                this.lockStore.locksPasswordData ? this.lockStore.locksPasswordData : '********'
                            }
                            </Text>
                        </ImageBackground>
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity onPress={this.getLockPassword}>
                                <Text style={styles.buttonTitleStyle}>获取开门密码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.renderStatusView(this.lockStore.screenStatus)}
                <NavigationView title='密码开门' backClick={() => { console.log('返回'); }}/>
            </View>
        );
    }

    getLockPassword=async () => {
        const userInfo = await load(USERINFO, '');
        this.lockStore.getLockPassword({
            'X-space-id': '364',
            user_id: userInfo.id,
        });
    }
}

const styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.loginHeader,
        flex: 1,
        alignItems: 'center',
    },
    headBackImageStyle: {
        width: screenWidth,
        height: screenWidth / 0.94,
        marginBottom: getPixel(8),

    },
    titleStyle: {
        fontSize: getFontPixel(14),
        color: '#474747',
        textAlign: 'center',
    },
    imageStyle: {
        width: getPixel(267),
        height: getPixel(70),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getPixel(14),
        paddingTop: getPixel(10),
    },
    passwordStyle: {
        fontSize: getFontPixel(34),
        color: '#474747',
    },
    buttonStyle: {
        width: screenWidth - getPixel(54),
        height: (screenWidth - getPixel(54)) * 0.15,
        backgroundColor: '#408FFE',
        borderRadius: (screenWidth - getPixel(54)) * 0.15 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getPixel(53),
        marginBottom: getPixel(24),
    },
    buttonTitleStyle: {
        color: '#FFFFFF',
        fontSize: getFontPixel(16),
    },

}));
