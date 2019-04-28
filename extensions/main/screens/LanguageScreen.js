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
    TouchableOpacity
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
    getWidth,
    save,
    LANGUAGE
} from '../../shared';

import SpaceItems from '../components/SpaceItems';
import { observable } from 'mobx';
import { getHis, MESSAGE_LIST } from '../connect/request';
const { width } = Dimensions.get('window');
import RNRestart from 'react-native-restart';

@inject('rootStore')
@observer
class LanguageScreen extends BaseScreen {
    @observable data = ['简体中文','한국어'];

    renderHeader = () => {
        return (
            <View  style={{
                width: getWidth(),
                marginHorizontal: getPixel(14),
                marginTop: getPixel(12),
                borderRadius: getPixel(10),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {/* <View style={{ flex: 1, alignItems: 'center' }}>
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
                </View> */}
            </View>
        )
    }


    renderItemFunc = item => {
        console.log('console log for chrom item', item);
        return (<TouchableOpacity onPress={()=>{
            if (item.item === '简体中文') {
                save(LANGUAGE, 'zh');
                RNRestart.Restart();
            } else {
                save(LANGUAGE, 'en');
                RNRestart.Restart();
            }
        }} style={{
            width: getWidth() - getPixel(56),
            height: getPixel(70),
            backgroundColor: '#2d375e',
            borderRadius: getPixel(6),
            marginLeft: getPixel(28),
            marginTop: getPixel(10),
            justifyContent: 'center',
            paddingLeft: getPixel(23)
        }}>
            <Text style={{
                fontSize: getPixel(15),
                color: 'white',
                fontWeight: '600'
            }}>{item.item}</Text>
        </TouchableOpacity>);

    }

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
                        style={{ marginTop: getTitlePixel(98), backgroundColor: 'white' }}
                        onPullRelease={this.onPullRelease}
                        data={this.data}
                        renderItem={this.renderItemFunc}
                        ListHeaderComponent={this.renderHeader} />
                    <BaseHeader leftType='back'
                        leftPress={this.goBack}
                        title={ext('Publicmatters')} />
                </LinearGradient>
            </View>
        );
    }
}

export default LanguageScreen;

