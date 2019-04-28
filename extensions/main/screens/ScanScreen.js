import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    Animated,
    StyleSheet
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import QRCode from 'react-native-qrcode-svg';

import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel } from '../../shared';
@inject('rootStore')
@observer
class ScanScreen extends BaseScreen {

    constructor(props) {
        super(props);
        const { UploadStore } = this.props.rootStore.mainStore;
        this.UploadStore = UploadStore;
        console.log('console log for chrom this.UploadStore', this.UploadStore);
    }

    onBarCodeRead = (result) => {
        console.log('console log for chrom result', result);
        this.toScreen('Upload', { id: result.data });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Text style={styles.rectangleText}>{ext('san_tips')}</Text>
                    </View>
                </RNCamera>
            </View >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default ScanScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});