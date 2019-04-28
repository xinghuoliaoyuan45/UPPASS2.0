import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,

} from 'react-native';

import {observer} from 'mobx-react';
import {screenWidth, getPixel, getFontPixel} from '../../shared';

@observer
export default class BluetoothCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationWidth: new Animated.Value((screenWidth - getPixel(40)) * 0.214 - getPixel(14)),
            leftAnim: new Animated.Value(getPixel(14)),
            topAnim: new Animated.Value(getPixel(7)),
            heightAnim: new Animated.Value((screenWidth - getPixel(40)) * 0.214 - getPixel(14)),
            fadeAnim: new Animated.Value(1),
        };
        this.startFadeAnim = true;
    }
    render() {
        const {itemData, onPress} = this.props;
        return (
            <TouchableOpacity style={styles.cellStyle}
                activeOpacity={1}
                onPressIn={() => {
                    if (itemData.type === 1) {
                        this.startAnimation();
                    }
                }}
                onPress={() => {
                    if (itemData.type === 1) {
                        onPress();
                    }
                }}>
                <Animated.View
                    style={[styles.animationCircleStyle, {
                        width: this.state.animationWidth,
                        height: this.state.heightAnim,
                        left: this.state.leftAnim,
                        top: this.state.topAnim,
                        opacity: this.state.fadeAnim,
                        backgroundColor: this.getTypeProgressColor(itemData.type),
                    }]}/>
                <View style={styles.circleStyle}>
                    <Image style={{width: getPixel(15), height: getPixel(19), backgroundColor: 'white'}}/>
                </View>
                <View style={{paddingLeft: getPixel(14)}}>
                    <Text style={[styles.titleStyle,
                        {color: this.getTypeTitleColor(itemData.type)}]}>
                        {itemData.name}
                    </Text>
                    <Text style={[
                        styles.subTitleStyle,
                        {color: this.getTypeTitleColor(itemData.type)}]}>
                        {this.getTypeStr(itemData.type)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    startAnimation=() => {
        this.animationWidth = (screenWidth - getPixel(40));
        this.startFadeAnim = true;
        Animated.timing(
            this.state.animationWidth,
            {
                toValue: this.animationWidth * 0.7 - getPixel(14),
                duration: 500,
            },
        ).start(() => {
            this.fadeAnimation();
        });
    }

    fadeAnimation=() => {
        Animated.sequence([
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0.6,
                    duration: 500,
                },
            ),
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 500,
                },
            ),
        ]).start(() => {
            this.startFadeAnim && this.fadeAnimation();
        });
    }


    finishAnimation=() => {
        this.animationWidth = (screenWidth - getPixel(40));
        this.startFadeAnim = false;
        Animated.parallel([
            Animated.timing(
                this.state.animationWidth,
                {
                    toValue: this.animationWidth,
                    duration: 500,
                },
            ),
            Animated.timing(
                this.state.leftAnim,
                {
                    toValue: 0,
                    duration: 500,
                },
            ),
            Animated.timing(
                this.state.topAnim,
                {
                    toValue: 0,
                    duration: 500,
                },
            ),
            Animated.timing(
                this.state.heightAnim,
                {
                    toValue: (screenWidth - getPixel(40)) * 0.214,
                    duration: 500,
                },
            ),

        ]).start();
    }

    getTypeStr=(type) => {
        switch (type) {
            case 2:
                return '开门中';
            case 3:
                this.finishAnimation && this.finishAnimation();
                return '开门成功';
            case 4:
                this.finishAnimation && this.finishAnimation();
                return '开门失败';
            case 5:
                this.finishAnimation && this.finishAnimation();
                return '开门失败';
            default:
                return '点击开门';
        }
    }
    getTypeTitleColor=(type) => {
        switch (type) {
            case 1:
                return '#1C1C1C';
            case 2:
                return '#1C1C1C';
            default:
                return '#FFFFFF';
        }
    }

    getTypeProgressColor=(type) => {
        switch (type) {
            case 3:
                return '#28C97C';
            case 4:
                return '#FF5A5F';
            case 5:
                return '#FF5A5F';
            default:
                return '#FFEB4B';
        }
    }
}

const styles = StyleSheet.create({

    cellStyle: {
        alignItems: 'center',
        width: screenWidth - getPixel(40),
        height: (screenWidth - getPixel(40)) * 0.214,
        backgroundColor: '#FFFFFF',
        paddingLeft: getPixel(14),
        flexDirection: 'row',
        borderRadius: (screenWidth - getPixel(40)) * 0.214 / 2,
        marginBottom: getPixel(16),
        overflow: 'hidden',
    },
    animationCircleStyle: {
        width: (screenWidth - getPixel(40)) * 0.214 - getPixel(14),
        height: (screenWidth - getPixel(40)) * 0.214 - getPixel(14),
        borderRadius: ((screenWidth - getPixel(40)) * 0.214 - getPixel(14)) / 2,
        backgroundColor: '#FFEB4B',
        left: getPixel(14),
        top: getPixel(7),
        position: 'absolute',
    },
    circleStyle: {
        width: (screenWidth - getPixel(40)) * 0.214 - getPixel(14),
        height: (screenWidth - getPixel(40)) * 0.214 - getPixel(14),
        borderRadius: ((screenWidth - getPixel(40)) * 0.214 - getPixel(14)) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: getFontPixel(19),
        color: '#1C1C1C',
    },
    subTitleStyle: {
        fontSize: getFontPixel(12),
        color: '#1C1C1C',
        marginTop: getPixel(6),
    },

});
