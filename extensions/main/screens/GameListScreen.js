import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel, KBFlatList, Svgs } from '../../shared';
import GameItems from '../components/GameItems';
import { observable, toJS } from 'mobx';
import { USER_STATISTICAL } from '../connect/request';
import { get } from 'lodash';
@inject('rootStore')
@observer
class GameListScreen extends BaseScreen {

    @observable selectItem = 0;
    @observable upDown = 0;
    constructor(props) {
        super(props);
        const { GameStore } = this.props.rootStore.mainStore;
        this.GameStore = GameStore;
    }

    mComponentDidMount = () => {
        this.GameStore.getGameList(this.selectItem, this.upDown);
        this.GameStore.getListTilte();
    }

    renderHeader = () => {
        let activityGame = get(this.GameStore.listTitle, 'activityGame',0)?get(this.GameStore.listTitle, 'activityGame',0):0;
        let userPartInGame = get(this.GameStore.listTitle, 'userPartInGame',0)?get(this.GameStore.listTitle, 'userPartInGame',0):0;
        let userWinUpp = get(this.GameStore.listTitle, 'userWinUpp',0)?get(this.GameStore.listTitle, 'userWinUpp',0):0;
        let userWinUps = get(this.GameStore.listTitle, 'userWinUps',0)?get(this.GameStore.listTitle, 'userWinUps',0):0;

        return (
            <View style={{
                width: getWidth(),
                marginTop: getTitlePixel(64)
            }}>
                <View style={{
                    width: getWidth() - getPixel(20),
                    // marginHorizontal: getPixel(14),
                    // marginTop: getPixel(10),
                    // borderRadius: getPixel(10),
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: getTitlePixel(10),
                    height: getPixel(105),
                    marginLeft: getPixel(10),
                    backgroundColor: '#303e62'
                }}>
                    <View style={{ flex: 1, paddingLeft: getPixel(20) }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14)
                        }}>{ext('jinxingzhongdeyouxi') + ':' + activityGame}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14),
                            marginTop: getPixel(20)
                        }}>{ext('canyuguodeyouxi') + ':' + userPartInGame}</Text>
                    </View>
                    <View style={{ flex: 1, paddingLeft: getPixel(20) }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14)
                        }}>{'WIN'+ ':' + userWinUpp}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14),
                            marginTop: getPixel(20)
                        }}>{'LOSE' + ':' + userWinUps}</Text>
                    </View>
                </View>
                <View style={{
                    width: getWidth(),
                    // marginHorizontal: getPixel(14),
                    // marginTop: getPixel(10),
                    // borderRadius: getPixel(10),
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: getTitlePixel(10)

                }}>
                    <TouchableOpacity onPress={() => {
                        this.selectItem = 0;
                        this.upDown = this.upDown > 0 ? 0 : 1;
                        this.mComponentDidMount();
                    }} style={{
                        width: getWidth() / 4,
                        height: getPixel(27),
                        backgroundColor: '#304065',
                        // marginLeft: getPixel(20),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14)
                        }}>TIME</Text>
                        <View style={{ marginLeft: getPixel(8) }}>
                            <Svgs icon={this.selectItem === 0 && this.upDown === 0 ? 'heishang' : 'baishang'}
                                color={this.selectItem === 0 && this.upDown === 0 ? 'black' : 'white'}
                                size={getPixel(11)} />
                            <Svgs icon={this.selectItem === 0 && this.upDown === 1 ? 'heixia' : 'baixia'}
                                color={this.selectItem === 0 && this.upDown === 1 ? 'black' : 'white'}
                                size={getPixel(11)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.selectItem = 1;
                        this.upDown = this.upDown > 0 ? 0 : 1;
                        this.mComponentDidMount();
                        console.log('console log for chrom this.upDown', this.upDown);
                    }} style={{
                        width: getWidth() / 4,
                        height: getPixel(27),
                        backgroundColor: '#304065',
                        marginLeft: getPixel(20),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14)
                        }}>{ext('canyurenshu')}</Text>
                        <View style={{ marginLeft: getPixel(8) }}>
                            <Svgs icon={this.selectItem === 1 && this.upDown === 0 ? 'heishang' : 'baishang'}
                                color={this.selectItem === 1 && this.upDown === 0 ? 'black' : 'white'}
                                size={getPixel(11)} />
                            <Svgs icon={this.selectItem === 1 && this.upDown === 1 ? 'heixia' : 'baixia'}
                                color={this.selectItem === 1 && this.upDown === 1 ? 'black' : 'white'}
                                size={getPixel(11)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.selectItem = 2;
                        this.upDown = this.upDown > 0 ? 0 : 1;
                        this.mComponentDidMount();
                        console.log('console log for chrom this.upDown', this.upDown);
                    }} style={{
                        width: getWidth() / 4,
                        height: getPixel(27),
                        backgroundColor: '#304065',
                        marginLeft: getPixel(20),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14)
                        }}>{ext('jiaoyijine')}</Text>
                        <View style={{ marginLeft: getPixel(8) }}>
                            <Svgs icon={this.selectItem === 2 && this.upDown === 0 ? 'heishang' : 'baishang'}
                                color={this.selectItem === 2 && this.upDown === 0 ? 'black' : 'white'}
                                size={getPixel(11)} />
                            <Svgs icon={this.selectItem === 2 && this.upDown === 1 ? 'heixia' : 'baixia'}
                                color={this.selectItem === 2 && this.upDown === 1 ? 'black' : 'white'}
                                size={getPixel(11)} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        )
    }

    renderItemFunc = item => (
        <GameItems navigation={this.props.navigation} rowId={item.index} data={item} />
    )

    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    {this.renderHeader()}
                    <KBFlatList
                        // style={{  }}
                        onPullRelease={this.onPullRelease}
                        data={this.GameStore.data}
                        renderItem={this.renderItemFunc}
                    // ListHeaderComponent={this.renderHeader} 
                    />
                    {this.renderStatusView(this.GameStore.screenStatus)}
                    <BaseHeader title='UP&DOWN' leftPress={this.goBack} />
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
export default GameListScreen;
