/**
 * from @marongting Tel 13269798391
 * content SelectSpaceScreen
 */
import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import LinearGradient from 'react-native-linear-gradient';
import 'url-search-params-polyfill';
import QRCode from 'react-native-qrcode-svg';

import {
    getPixel, getTitlePixel, KBFlatList,
    load, MEMERSPACES, BaseHeader, USERJWTTOKEN,
    getWidth
} from '../../shared';

import SpaceItems from '../components/SpaceItems';
import { observable } from 'mobx';
import { getHis } from '../connect/request';
const { width } = Dimensions.get('window');
@inject('rootStore')
@observer
class ShareScreen extends BaseScreen {
    @observable data = [];

    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: RkTheme.currentTheme.colors.allBackground,

            }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <View style={{
                        width: getWidth(),
                        alignItems: 'center',
                        marginTop: getTitlePixel(110)
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            width: getPixel(274),
                            height: getPixel(297),
                            borderRadius: getPixel(5),
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                marginTop:getPixel(29),
                                marginBottom:getPixel(18),
                                fontSize:getPixel(13),
                                fontWeight:'800',
                                color:'black'
                            }}>{ext('saomiaoqr')}</Text>
                            <QRCode
                                value={'https://fir.im/3l8w'}
                                size={200}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.showToast('保存成功');
                            }}
                            style={{
                                backgroundColor: '#db9831',
                                justifyContent: 'center',
                                width: getPixel(286),
                                height: getPixel(43),
                                alignItems: 'center',
                                marginTop: getPixel(40)
                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'white'
                            }}>
                                {ext('QRcodestorage')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Clipboard.setString('https://fir.im/3l8w')
                                this.showToast('复制成功');
                            }}
                            style={{
                                backgroundColor: '#385893',
                                justifyContent: 'center',
                                width: getPixel(286),
                                height: getPixel(43),
                                alignItems: 'center',
                                marginTop: getPixel(10)
                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'white'
                            }}>
                                {ext('CopyUPPASSdownloadaddress')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <BaseHeader leftType='back'
                        leftPress={this.goBack}
                        title={ext('friendShare')} />
                </LinearGradient>
            </View>
        );
    }
}

export default ShareScreen;

