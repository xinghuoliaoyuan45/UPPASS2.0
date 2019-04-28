
// Lottie.js
import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {getPixel} from '../utils/pixel.js';
const {width, height} = Dimensions.get('window');

export class Lottie extends Component {
    render() {
        const {
            sourceJson, isAuto, isLoop, anotherStyle,
        } = this.props;
        return (
            <View style={styles.content}>
                <LottieView
                    source={sourceJson || require('../assets/loading.json')}
                    autoPlay={isAuto === undefined ? true : isAuto}
                    colorFilter='#000'
                    loop={isLoop === undefined ? true : isLoop}
                    style={[styles.container, anotherStyle]}/>
            </View>

        );
    }
}
// undefined.null.false.0

const styles = StyleSheet.create({
    content: {
        width,
        height,
        backgroundColor: '#00000000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    container: {
        width: getPixel(100),
        height: getPixel(100),
        backgroundColor: '#00000000',
    },
});
