import {
    Platform,
    Dimensions,
    PixelRatio,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;

export {
    screenWidth,
    screenHeight,
};

export function getWidth() {
    return width;
}

export function getHeight() {
    return height;
}


export function getPixel(px) {
    return PixelRatio.roundToNearestPixel(px);
}
export function getFontPixel(px) {
    return getPixel(px);
}
export function getTitlePixel(px) {
    if (Platform.OS === 'android') {
        return getPixel(px);
    }
    if (height >= 812) {
        return getPixel(px + 24);
    }

    return getPixel(px);
}

export function getBottomPixel(px) {
    if (Platform.OS === 'ios') {
        if (height >= 812) {
            return getPixel(px + 27);
        }
    }
    return getPixel(px);
}

export function getVariableHeight(actualW, w, h) {
    return actualW * (h / w);
}
