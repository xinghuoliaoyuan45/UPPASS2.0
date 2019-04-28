import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import {
    Svgs, getPixel, BaseHeader, getTitlePixel,
    KBFlatList, getWidth, save, load, getHeight,
    USERJWTTOKEN, toastRequestError, Dialog
} from '../../shared';
import GameItems from '../components/GameItems';
import FastImage from 'react-native-fast-image';
import { get } from 'lodash';
import { observable, toJS } from 'mobx';
import { getGameInfo, GAME_BET_IN } from '../connect/request';
import Video from 'react-native-video';
import { GAME_INSTANCE_NOT_PART } from '../connect/request';

@inject('rootStore')
@observer
class GameNextScreen extends BaseScreen {
    @observable totle = 0;
    @observable item = {};
    @observable seleted = 'up';
    @observable itemselect = 0;
    @observable showStart = true;
    @observable timeStr = '';
    @observable startToast = '';
    @observable game = null;
    @observable id = '';
    @observable loading = 'LOADING_STATUS';
    constructor(props) {
        super(props);
        const { GameStore } = this.props.rootStore.mainStore;
        this.GameStore = GameStore;
    }

    mComponentDidMount = async () => {
        this.getNext();
    }
    getNext = async () => {
        console.log('console log for chrom getNextgetNextgetNext');
        this.loading = 'LOADING_STATUS';
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id);
        GAME_INSTANCE_NOT_PART(param).then((res) => {
            let data = get(res, 'data', '');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.id = data.data;
                if (this.id) {
                    this.getLoad();
                } else {
                    this.goBack();
                }
            } else {
                toastRequestError(data);
                this.loading = '';
            }
        }).catch();
    }
    getLoad = async () => {
        this.loading = 'LOADING_STATUS';
        let param = new URLSearchParams()
        param.append('id', this.id)
        getGameInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.game = data;
                this.loading = '';
            } else {
                toastRequestError(data);
                this.loading = '';
            }
        }).catch();
    }
    render() {
        console.log('console log for chrom this.game123', toJS(this.game));
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#13213f', }}>
                <FastImage source={require('../assets/gameresultback.png')}
                    style={{
                        position: 'absolute',
                        width: getWidth(),
                        height: getHeight(),
                        alignItems: 'center',
                    }}></FastImage>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <FastImage source={require('../assets/gamenext.png')}
                        style={{
                            width: getPixel(310),
                            height: getPixel(371),
                            alignItems: 'center',
                            marginTop: getTitlePixel(156)
                        }}>
                        <View style={{
                            width: getPixel(224),
                            marginTop: getPixel(166),
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: getPixel(14),
                                color: 'white',
                                fontWeight: 'bold',
                                width: getPixel(202),
                                marginTop: getPixel(15)
                            }}>{get(toJS(this.game), 'data.instance.lotteryTime')}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: getPixel(18),
                                color: 'white',
                                fontWeight: 'bold',
                                width: getPixel(202),
                                marginTop: getPixel(7)
                            }} numberOfLines={2}>{get(toJS(this.game), 'data.instance.gameContent')}</Text>
                        </View>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: getPixel(14),
                            color: 'white',
                            marginTop: getPixel(45)
                        }} numberOfLines={1}>{ext('quedingyidong')}</Text>
                    </FastImage>
                    <View style={{
                        width: getWidth(),
                        marginTop: getPixel(40),
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={() => {
                            // let game = get(this.props, 'navigation.state.params.game', 0);
                            // this.toScreen('GameInfo', { ids: this.id });
                            this.props.navigation.state.params.callBack(this.id);
                            this.goBack();
                        }}>
                            <FastImage
                                source={require('../assets/huangbutton.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: getPixel(142),
                                    height: getPixel(58),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} >
                                <Text style={{
                                    fontSize: getPixel(23),
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}>
                                    YES
                            </Text>
                            </FastImage>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // this.toScreen('GameList');
                            this.goBack()
                        }}>
                            <FastImage
                                source={require('../assets/lanbutton.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: getPixel(142),
                                    height: getPixel(58),
                                    marginLeft: getPixel(13),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} >
                                <Text style={{
                                    fontSize: getPixel(23),
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}>
                                    NO
                            </Text>
                            </FastImage>
                        </TouchableOpacity>

                    </View>
                    {this.renderStatusView(this.loading)}
                    <BaseHeader leftColor='white'
                        leftName={ext('back')}
                        leftPress={this.goBack}
                    />

                </View >

            </ScrollView>

        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default GameNextScreen;
