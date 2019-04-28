import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    Linking
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { get } from 'lodash';
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel, KBFlatList } from '../../shared';
import GameItems from '../components/GameItems';
import FastImage from 'react-native-fast-image';
import { toJS } from 'mobx';

@inject('rootStore')
@observer
class GameOkScreen extends BaseScreen {

    constructor(props) {
        super(props);
    }

    render() {
        let game = get(this.props, 'navigation.state.params.game', 0);
        console.log('console log for chrom game',toJS(game));
        return (
            <FastImage source={require('../assets/gameresultback.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={{ flex: 1, alignItems: 'center' }}>
                <StatusBar barStyle='light-content' />
                <View style={{
                    width: getPixel(269),
                    marginTop: getTitlePixel(115)
                }}>
                    <Text style={{
                        fontSize: getPixel(12),
                        color: 'white'
                    }}>{ext('jieguorenzhengzhao')}</Text>
                    <FastImage source={{ uri: 'http://47.74.24.151:8080' + game.data.instance.confirmPic }}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={{
                            width: getPixel(269),
                            height: getPixel(147),
                            borderRadius: getPixel(6),
                            borderWidth: 3,
                            borderColor: '#000',
                            marginTop: getPixel(6),
                            backgroundColor: '#38476c'
                        }}>
                    </FastImage>
                    <Text style={{
                        fontSize: getPixel(12),
                        color: 'white',
                        marginTop: getPixel(24)
                    }}>{ext('urladdress')}</Text>
                    <TouchableOpacity onPress={()=>{
                        console.log('console log for chrom aaaaaa',game.data.instance.confirmUrl);
                        Linking.openURL(game.data.instance.confirmUrl);
                    }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.stretch}
                            style={{
                                width: getPixel(269),
                                height: getPixel(52),
                                borderRadius: getPixel(6),
                                borderWidth: 3,
                                borderColor: '#000',
                                marginTop: getPixel(6),
                                backgroundColor: '#38476c',
                                justifyContent: 'center',
                                paddingLeft: getPixel(10)
                            }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'white',
                            }}>{game.data.instance.confirmUrl}</Text>
                        </FastImage>
                    </TouchableOpacity>



                    <Text style={{
                        fontSize: getPixel(12),
                        color: 'white',
                        marginTop: getPixel(44)
                    }}>{ext('jieguorenshuoming')}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.stretch}
                        style={{
                            width: getPixel(269),
                            height: getPixel(147),
                            borderRadius: getPixel(6),
                            borderWidth: 3,
                            borderColor: '#000',
                            marginTop: getPixel(6),
                            backgroundColor: '#38476c',
                            paddingLeft: getPixel(10)
                        }}>
                        <Text style={{
                            fontSize: getPixel(14),
                            color: 'white',
                        }}>{game.data.instance.confirmText}</Text>
                    </FastImage>
                </View>
                <BaseHeader title={ext('queren')} leftPress={this.goBack} />
            </FastImage >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default GameOkScreen;
