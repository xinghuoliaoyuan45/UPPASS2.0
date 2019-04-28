import React, {Component} from 'react';
import {
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';

import {getTitlePixel, getPixel} from '../utils/pixel';
import {Svgs} from './Svgs';

export default class MessageToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            translateYValue: new Animated.Value(-getPixel(64)),
        };
    }

    show(text) {
        this.setState({
            isShow: true,
            text,
        });

        this.animation = Animated.timing(
            this.state.translateYValue,
            {
                toValue: 0,
                duration: 200,
            },
        );
        this.animation.start(() => {
            this.isShow = true;
            this.close();
        });
    }

    close() {
        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(
                this.state.translateYValue,
                {
                    toValue: -getPixel(64),
                    duration: 100,
                },
            );
            this.animation.start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, 3000);
    }

    onMsgClick = () => {
        DeviceEventEmitter.emit('clickMsgToast');
    }

    render() {
        return (
            this.state.isShow ?
                <Animated.View style={{
                    width: '100%',
                    height: getTitlePixel(64),
                    backgroundColor: 'white',
                    zIndex: 10000,
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    transform: [{
                        translateY: this.state.translateYValue,
                    }],
                }}>
                    <TouchableWithoutFeedback onPress={this.onMsgClick}>
                        <View

                            style={{
                                width: '100%',
                                height: getPixel(44),
                                paddingBottom: getPixel(10),
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: 'white',
                            }}>
                            {/* <Svgs
                                style={{
                                    marginLeft: getPixel(21),
                                }}
                                icon='icon_hint'
                                size={getPixel(19)}/> */}
                            <Text numberOfLines={1}
                                style={{
                                    width: 0,
                                    flex: 1,
                                    marginLeft: getPixel(6),
                                    marginRight: getPixel(21),
                                    color: 'black',
                                    fontSize: getPixel(16),
                                    fontWeight: '400',
                                }}>{this.state.text}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                : null
        );
    }
}
