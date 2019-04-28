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
    Platform
} from 'react-native';
import { WebView } from 'react-native';

import { observer, inject } from 'mobx-react';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import LinearGradient from 'react-native-linear-gradient';
import 'url-search-params-polyfill';

import {
    getPixel, getTitlePixel, KBFlatList,
    load, MEMERSPACES, BaseHeader, USERJWTTOKEN,
    getWidth
} from '../../shared';

import SpaceItems from '../components/SpaceItems';
import { observable } from 'mobx';
import { get } from 'lodash';
import { getHis, MESSAGE_LIST, GET_MESSAGE } from '../connect/request';
const { width } = Dimensions.get('window');
@inject('rootStore')
@observer
class BecarefulScreen extends BaseScreen {
    @observable html = '';
    @observable data = null;
    mComponentDidMount = () => {
        let param = new URLSearchParams()
        param.append('id', get(this.props, 'navigation.state.params.id', 0))
        GET_MESSAGE(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.html = '<div style="height:600px;color:white">'
                    + data.data.content
                    + '</div>';
                this.data = data.data;
            }
        }).catch();
    }

    render() {
        const baseSource = {
            html: this.html,
        };
        if (Platform.OS === 'android') {
            baseSource.baseUrl = '';
        }
        return (
            <View style={{
                flex: 1, backgroundColor: '#192b4f',
                paddingTop: getPixel(108)
            }}>
                <StatusBar barStyle='light-content' />
                <Text style={{
                    fontSize: getPixel(14),
                    color: 'white',
                    marginTop: getPixel(62),
                    marginLeft: getPixel(34)
                }}>{get(this.data,'title','')}</Text>
                <Text style={{
                    fontSize: getPixel(10),
                    color: 'white',
                    marginTop: getPixel(62),
                    marginLeft: getPixel(34),
                    marginTop: getPixel(10)
                }}>{get(this.data, 'createdAt', '')}</Text>
                <View style={{
                    height: 1,
                    width: getWidth() - getPixel(36),
                    marginLeft: getPixel(18),
                    backgroundColor: 'white',
                    marginTop: getPixel(12)
                }}></View>
                <WebView
                    style={{
                        marginTop: getTitlePixel(20),
                        backgroundColor: '#00000000',
                        width: getWidth() - getPixel(36),
                        marginLeft: getPixel(18)
                        
                    }}
                    ref='webs'
                    javaScriptEnabled={true}
                    source={baseSource} />
                <BaseHeader leftType='back'
                    leftPress={this.goBack}
                    title={ext('message')} />
            </View>
        );
    }
}

export default BecarefulScreen;

