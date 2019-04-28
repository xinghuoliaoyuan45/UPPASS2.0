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
import { getWidth, getPixel, BaseHeader, getTitlePixel, KBFlatList } from '../../shared';
import GameItems from '../components/GameResultItems';
import { get } from 'lodash';
@inject('rootStore')
@observer
class GameResultListScreen extends BaseScreen {

    constructor(props) {
        super(props);
        const { GameStore } = this.props.rootStore.mainStore;
        this.GameStore = GameStore;
    }

    componentDidMount() {
        let game = get(this.props, 'navigation.state.params.game', 0);
        this.GameStore.getGameResultList(game.data.instance.id);
    }

    renderHeader = () => {
        return (
            <View style={{
                width: getWidth(),
                marginHorizontal: getPixel(14),
                marginTop: getPixel(10),
                borderRadius: getPixel(10),
                flexDirection: 'row',
                alignItems: 'center',
            }}>

            </View>
        )
    }

    renderItemFunc = item => {
        let game = get(this.props, 'navigation.state.params.game', 0);
        return (<GameItems game={game} navigation={this.props.navigation}
            rowId={item.index} data={item} />);

    }

    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <KBFlatList
                        style={{ marginTop: getTitlePixel(64) }}
                        onPullRelease={this.onPullRelease}
                        data={this.GameStore.resultList}
                        renderItem={this.renderItemFunc}
                        ListHeaderComponent={this.renderHeader} />
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
export default GameResultListScreen;
