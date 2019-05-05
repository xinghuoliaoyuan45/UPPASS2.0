import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    Clipboard
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel, load, USERJWTTOKEN } from '../../shared';
import { observable } from 'mobx';
import {get} from 'lodash';
@inject('rootStore')
@observer
class NewDownScreen extends BaseScreen {

    mComponentDidMount = async () => {
        const {state} = this.props.navigation;
        const type = get(state,'params.type','');
       this.UploadStore.getQrCode(type);
    }

    constructor(props) {
        super(props);
        const { UploadStore } = this.props.rootStore.mainStore;
        this.UploadStore = UploadStore;
    }
    copyAddress = ()=>{
        const address = this.UploadStore.qrCode;
        Clipboard.setString(address);
        this.showToast(ext('copySuccess'));
    }

    render() {
        console.log('console log for chrom codeAddress',this.UploadStore.qrCode);
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <View style={{
                        width: getWidth(),
                        alignItems: 'center',
                        marginTop: getTitlePixel(100)
                    }}>
                        <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1 }}>
                        <View style={{
                                backgroundColor: 'white',
                                width: getPixel(274),
                                height: getPixel(297),
                                borderRadius: getPixel(5),
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    marginTop: getPixel(29),
                                    marginBottom: getPixel(18),
                                    fontSize: getPixel(13),
                                    fontWeight: '800',
                                    color: 'black'
                                }}>{ext('saomazhuanru')}</Text>
                                 {
                                 this.UploadStore.qrCode ?
                                 <QRCode
                                    value={this.UploadStore.qrCode}
                                    size={200}/> :null }
                            </View>
                        </ViewShot>
                       
                    </View>
                    <Text style={{
                         width: getWidth() - getPixel(25) * 2,
                         height: getPixel(40),
                         marginLeft: getPixel(25),
                         color: 'white',
                        textAlign: 'center',
                        lineHeight: getPixel(40),
                        fontSize: getPixel(15),
                        marginTop: getPixel(20)
                    }}>{this.UploadStore.qrCode}</Text>
                    <Text onPress={this.copyAddress}style={{
                        width: getWidth() - getPixel(25) * 2,
                        marginLeft: getPixel(25),
                        height: getPixel(40),
                        backgroundColor: 'blue',
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: getPixel(40),
                        fontSize: getPixel(15),
                        marginTop: getPixel(20)
                    }}>{ext('cpoyAddress')}</Text>
                    <BaseHeader title={ext('in')} leftPress={this.goBack}
                        rightName={ext('inHistory')} rightPress={() => {
                            this.toScreen('SelectSpace1');
                        }} />
                </LinearGradient >
            </TouchableOpacity >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default NewDownScreen;
