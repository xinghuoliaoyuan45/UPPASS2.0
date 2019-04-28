import React from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {getPixel, screenWidth, getFontPixel} from '../../shared';
import NavigationView from '../components/NavigationView';
import {
    RkTheme,
    RkStyleSheet,
} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import BaseScreen from '../../BaseScreen';

@inject('rootStore')
@observer
export default class QRcodeScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {lockStore} = this.props.rootStore.lockStore;
        this.lockStore = lockStore;
        this.lockStore.getLockQRcode(() => {
            this.startInerval();
        });
    }

    startInerval=() => {
        this.lockStore.timeCutton = 45;
        this.interval = setInterval(() => {
            if (this.lockStore.timeCutton > 1) {
                this.lockStore.timeCutton -= 1;
            } else {
                this.interval && clearInterval(this.interval);
                this.lockStore.getLockQRcode(() => {
                    this.startInerval();
                });
            }
        }, 1000);
    }

    mComponentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    render() {
        return (
            <View style={styles.root}>
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                    RkTheme.currentTheme.colors.gradualEnd]}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                style={{
                    flex: 1,
                    width: screenWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} >
                    <View style={styles.qrViewStyle}>
                        <Text style={styles.titleStyle}>该二维码用于扫码开门</Text>
                        <Image style={{
                            width: screenWidth - getPixel(110),
                            height: screenWidth - getPixel(110),
                        }}
                        source={{uri: (`data:image/png;base64,${this.lockStore.locksQRcodeData}`)}}/>
                        <Text style={styles.alerTitleStyle}>
                            {
                                this.lockStore.locksQRcodeData && `注：请勿泄露给他人，${this.lockStore.timeCutton}s后刷新`
                            }
                        </Text>
                    </View>
                </LinearGradient >
                {this.renderStatusView(this.lockStore.screenStatus)}
                <NavigationView title='二维码开门'
                    titleStyle={{color: 'white'}}
                    backClick={() => { console.log('返回'); }}/>
            </View>
        );
    }
}

const styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.loginHeader,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrViewStyle: {
        width: screenWidth - getPixel(70),
        height: (screenWidth - getPixel(70)) / 0.878,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrImageStyle: {
        width: screenWidth - getPixel(170),
        height: screenWidth - getPixel(170),
        backgroundColor: 'yellow',
    },
    titleStyle: {
        color: '#818386',
        fontSize: getFontPixel(14),
    },
    alerTitleStyle: {
        color: '#FF9926',
        fontSize: getFontPixel(14),
        marginTop: getPixel(5),
    },
}));
