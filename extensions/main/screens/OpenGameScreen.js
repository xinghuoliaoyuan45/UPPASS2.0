import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { get } from 'lodash';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import LinearGradient from 'react-native-linear-gradient';

import CommunityRow from '../components/CommunityRow';
import CommunitySpace from '../components/CommunitySpace';
import {
    Svgs, getPixel, getTitlePixel, getWidth, remove, USERJWTTOKEN,
    BaseHeader,
    load,
    USERINFO,
    save
} from '../../shared';
import { ext } from '../const';
import { getAccountInfo } from '../connect/request';
import OpenItem from '../components/OpenItem';
@inject('rootStore')
@observer
class OpenGameScreen extends BaseScreen {

    @observable user = { name: '', tel: '' };

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }

    getAccountInfo = async () => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('id', id)
        getAccountInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.user = { name: data.data.userName, tel: data.data.tel };
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    mComponentDidMount = () => {
        this.getAccountInfo();
    }

    render() {
        return (
            <LinearGradient
                colors={['#E3E5E8',
                    '#E3E5E8']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{ flex: 1 }} >
                <StatusBar barStyle='light-content' />
                <ScrollView style={{
                    flex: 1
                }}>
                    <View style={{
                        width: getWidth(),
                        height: getPixel(265),
                        backgroundColor: '#022047',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: getPixel(90),
                            height: getPixel(90),
                            backgroundColor: 'white',
                            borderRadius: 100,
                            borderColor: '#f0a100',
                            borderWidth: 1,
                            position: 'absolute',
                            bottom: getPixel(57),
                        }}>
                        </View>

                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(16),
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                            position: 'absolute',
                            bottom: getPixel(20),
                        }}>{this.user.name}
                        </Text>
                    </View>
                    <OpenItem id={get(this.props, 'navigation.state.params.id', 0)} navigation={this.props.navigation} />
                </ScrollView>
                <BaseHeader leftType='back' leftPress={this.goBack}
                    title={ext('lotteryResults')} />
            </LinearGradient>
        );
    }
}

export default OpenGameScreen;
