/**
 * from @marongting Tel 13269798391
 * content SelectSpaceScreen
 */
import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
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
import { getHis } from '../connect/request';
const { width } = Dimensions.get('window');
@inject('rootStore')
@observer
class SelectSpaceScreen1 extends BaseScreen {
    @observable data = [];


    mComponentDidMount = () => {
        this.configData();
    }

    configData = async () => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id)
        param.append('transaction_type', 0)
        param.append('trade_direction', 0)
        getHis(param).then((res) => {
            this.data = res.data.data;
        }).catch();
    }

    renderHeader = () => {
        return (
            <View style={{
                width: getWidth(),
                marginHorizontal: getPixel(14),
                marginTop: getPixel(12),
                borderRadius: getPixel(10),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(17),
                        marginTop: getPixel(10),
                    }}>{ext('operation_time')}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(17),
                        marginTop: getPixel(10),
                    }}>{ext('operation_money')}</Text>
                </View>
            </View>
        )
    }
    


    renderItemFunc = item => (
        <SpaceItems rowId={item.index} data={item} />
    )

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
                    <KBFlatList
                        style={{ marginTop: getTitlePixel(60) }}
                        onPullRelease={this.onPullRelease}
                        data={this.data}
                        renderItem={this.renderItemFunc}
                        ListHeaderComponent={this.renderHeader} />
                    <BaseHeader leftType='back' leftPress={this.goBack} title={ext('get_history')} />
                </LinearGradient>
            </View>
        );
    }
}

export default SelectSpaceScreen1;

