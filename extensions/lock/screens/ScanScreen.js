import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {getPixel, getFontPixel, screenWidth} from '../../shared';
import NavigationView from '../components/NavigationView';
import {SafeAreaView} from 'react-navigation';
import {RkStyleSheet} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import {RNCamera} from 'react-native-camera';

@inject('rootStore')
@observer
export default class ScanScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            flashMode: RNCamera.Constants.FlashMode.off,
            ready: false,
            animatedValue: new Animated.Value(0),
        };
    }

    componentWillMount() {
        console.log('出现了');
    }
    render() {
        const {
            flashMode, ready, animatedValue,
        } = this.state;
        return (
            <View style={styles.root}>
                <View style={{flex: 1, backgroundColor: 'black'}}>
                    <RNCamera
                        ref='camera'
                        style={{flex: 1}}
                        flashMode={flashMode}
                        permissionDialogTitle='访问相机'
                        permissionDialogMessage='访问相机'
                        pendingAuthorizationView={null}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                        onBarCodeRead={this.onBarCodeRead}
                        onCameraReady={this.onCameraReady}/>
                    <View style={styles.bodyLeft}/>
                    <View style={styles.body}>
                        <View style={styles.header}>
                            <SafeAreaView forceInset={{top: 'always', bottom: 'never'}}/>
                            <View style={styles.headerContent}/>
                        </View>
                        <View style={styles.viewpoint}>
                            <View style={styles.cornerTopLeft}/>
                            <View style={styles.cornerTopRight}/>
                            <View style={styles.cornerBottomLeft}/>
                            <View style={styles.cornerBottomRight}/>
                            <View style={styles.cornerBottomRight}/>
                            {ready && <Animated.View style={[styles.scanBar, {
                                transform: [{
                                    translateY: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [4, 270 - 4 - 2],
                                    }),
                                }],
                            }]}/>}
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.hintText}>
                                {'提示'}
                            </Text>
                            <View style={styles.torchPlaceholder}>
                                <TouchableWithoutFeedback onPress={this.toggleFlash}>
                                    <View style={styles.torchIconView}>
                                        <View style={{width: 25, height: 30, backgroundColor: 'white'}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <SafeAreaView forceInset={{top: 'never', bottom: 'always'}}/>
                        </View>
                    </View>
                    <View style={styles.bodyRight}/>
                </View>
                <NavigationView title='扫码开门'
                    titleStyle={{color: 'white'}}
                    backClick={() => { console.log('返回'); }}
                    renderRight={this.renderNavigationRightButtom}/>
            </View>

        );
    }

    onBarCodeRead=(data) => {
        console.log(data);
    }

    onCameraReady=() => {
        this.setState({ready: true});
        this.startAnimation();
    }
    startAnimation() {
        const {animatedValue} = this.state;
        animatedValue.setValue(0);
        this.animation = Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        this.animation.start(({finished}) => {
            if (finished) {
                this.startAnimation();
            }
        });
    }
    toggleFlash = () => {
        let {flashMode} = this.state;
        flashMode = flashMode === RNCamera.Constants.FlashMode.off
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off;
        this.setState({flashMode});
    };

    renderNavigationRightButtom=() => (
        <TouchableOpacity style={{paddingRight: getPixel(14)}}
            accessible={1} >
            <Text style={{color: 'white', fontSize: getFontPixel(16)}}>开门记录</Text>
        </TouchableOpacity>
    )
}

const styles = RkStyleSheet.create(theme => ({

    root: {
        flex: 1,
        color: theme.colors.loginHeader,
    },
    bodyLeft: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: (screenWidth + getPixel(270)) / 2,
    },

    bodyRight: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: (screenWidth + getPixel(270)) / 2,
        right: 0,
    },

    body: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: (screenWidth - getPixel(270)) / 2,
        right: (screenWidth - getPixel(270)) / 2,
    },

    header: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },

    headerContent: {
        height: getPixel(44) + getPixel(105),
    },

    viewpoint: {
        height: getPixel(270),
    },

    cornerTopLeft: {
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        width: getPixel(30),
        height: getPixel(30),
        position: 'absolute',
        top: 0,
        left: 0,
    },
    cornerTopRight: {
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 2,
        borderRightWidth: 2,
        width: getPixel(30),
        height: getPixel(30),
        position: 'absolute',
        top: 0,
        right: 0,
    },
    cornerBottomLeft: {
        borderBottomColor: 'white',
        borderLeftColor: 'white',
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        width: getPixel(30),
        height: getPixel(30),
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    cornerBottomRight: {
        borderBottomColor: 'white',
        borderRightColor: 'white',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        width: getPixel(30),
        height: getPixel(30),
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    scanBar: {
        opacity: 0.8,
        borderBottomColor: '#00A699',
        borderBottomWidth: getPixel(2),
        marginLeft: getPixel(4),
        marginRight: getPixel(4),
    },

    footer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },

    hintText: {
        fontSize: getPixel(13),
        textAlign: 'center',
        lineHeight: getPixel(18),
        color: 'rgba(255,255,255,0.7)',
        margin: getPixel(15),
    },

    torchPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    torchIconView: {
        padding: getPixel(10),
        alignItems: 'center',
    },

    torchIcon: {
        width: getPixel(21),
        height: getPixel(32),
        fontSize: getPixel(32),
        color: 'white',
    },
}));
