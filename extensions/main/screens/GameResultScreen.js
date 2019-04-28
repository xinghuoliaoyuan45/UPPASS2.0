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
import { getWidth, getPixel, BaseHeader, getTitlePixel, KBFlatList, load, USERJWTTOKEN } from '../../shared';
import GameItems from '../components/GameItems';
import FastImage from 'react-native-fast-image';
import { GAME_RESULT } from '../connect/request';
import { get } from 'lodash';
import { observable } from 'mobx';
@inject('rootStore')
@observer
class GameResultScreen extends BaseScreen {

    @observable data = null;

    constructor(props) {
        super(props);
        this.type = -23001;
        this.canyurenshu = '';
        this.hejifeiyong = '';
        this.winrenshu = '';
        this.downrenshu = '';
        this.downrenshupass = '';
        this.fenpei = '';
        this.losergeshu = '';
        this.pass = '';
        this.beihuishou = '';
    }

    mComponentDidMount = async () => {
        let id = await load(USERJWTTOKEN, '');
        let game = get(this.props, 'navigation.state.params.game', 0);
        let gameid = get(this.props, 'navigation.state.params.id', 0);
        let param = new URLSearchParams()
        param.append('userId', id)
        param.append('gameId', game.data.instance.id)
        param.append('partInId', gameid)
        GAME_RESULT(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.data = null;
                this.data = data.data;
            }
        }).catch();
    }

    render() {
        return (
            <FastImage source={require('../assets/gameresultback.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={{ flex: 1, alignItems: 'center' }}>
                <StatusBar barStyle='light-content' />
                {this.data && <View style={{
                    width: getPixel(269),
                    height: getPixel(430),
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderRadius: getPixel(5),
                    borderWidth: getPixel(5),
                    borderColor: '#000',
                    marginTop: getPixel(140),
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(67)
                    }}>
                        <View style={{
                            width: getPixel(60),
                            height: getPixel(22),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: getPixel(17),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.isWin ? this.data.winNumber :
                                    this.data.loseNumber}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(18),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('activecount')}
                        </Text>
                        <FastImage
                            source={this.data.isWin === 1 ?
                                require('../assets/win.png') :
                                require('../assets/lose.png')}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={{
                                width: getPixel(44),
                                height: getPixel(18),
                            }} />
                        <Text style={{
                            fontSize: getPixel(18),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('le')}
                        </Text>
                    </View>



                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(34)
                    }}>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('allcanyu')}
                        </Text>
                        <View style={{
                            width: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4)
                        }}>
                            <Text style={{
                                fontSize: getPixel(16),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.totalPartInNum}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('ming')}
                        </Text>
                    </View>



                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(6)
                    }}>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('hejifenyong')}
                        </Text>
                        <View style={{
                            paddingHorizontal: getPixel(8),
                            mineWidth: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4),

                        }}>
                            <Text style={{
                                fontSize: getPixel(16),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.totalCost}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('gepass')}
                        </Text>
                    </View>




                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(6)
                    }}>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('wincount')}
                        </Text>
                        <View style={{
                            paddingHorizontal: getPixel(8),
                            mineWidth: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4),

                        }}>
                            <Text style={{
                                fontSize: getPixel(16),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.winNum}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('ming')}
                        </Text>
                    </View>




                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(6)
                    }}>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('downcount')}
                        </Text>
                        <View style={{
                            paddingHorizontal: getPixel(8),
                            mineWidth: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4),

                        }}>
                            <Text style={{
                                fontSize: getPixel(16),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.loseNum}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('ming')}
                        </Text>
                    </View>



                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(6)
                    }}>
                        <Text style={{
                            fontSize: getPixel(14),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('paydown')}
                        </Text>
                        <View style={{
                            paddingHorizontal: getPixel(8),
                            mineWidth: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4),

                        }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.loseCost}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(14),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('gepass')}
                        </Text>
                    </View>




                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getPixel(6)
                    }}>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                        }}>
                            {ext('fenpeigei')}
                        </Text>
                        <View style={{
                            paddingHorizontal: getPixel(8),
                            mineWidth: getPixel(47),
                            height: getPixel(20),
                            backgroundColor: '#0c1731',
                            borderRadius: getPixel(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: getPixel(4),

                        }}>
                            <Text style={{
                                fontSize: getPixel(16),
                                color: 'white',
                                fontWeight: '900'
                            }}>
                                {this.data.winNum}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: getPixel(16),
                            color: 'white',
                            fontWeight: '900',
                            marginLeft: getPixel(4)
                        }}>
                            {ext('shelizhe')}
                        </Text>
                    </View>


                    {
                        this.data.isWin === 1 ? <View /> :
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: getPixel(6)
                            }}>
                                <Text style={{
                                    fontSize: getPixel(16),
                                    color: 'white',
                                    fontWeight: '900',
                                }}>
                                    {ext('losebaifenbi')}
                                </Text>
                                <View style={{
                                    paddingHorizontal: getPixel(8),
                                    mineWidth: getPixel(47),
                                    height: getPixel(20),
                                    backgroundColor: '#0c1731',
                                    borderRadius: getPixel(5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: getPixel(4),

                                }}>
                                    <Text style={{
                                        fontSize: getPixel(16),
                                        color: 'white',
                                        fontWeight: '900'
                                    }}>
                                        {this.data.recoveryPercent}
                                    </Text>
                                </View>
                                <Text style={{
                                    fontSize: getPixel(16),
                                    color: 'white',
                                    fontWeight: '900',
                                    marginLeft: getPixel(4)
                                }}>
                                    %
                            </Text>
                            </View>
                    }
                    <View style={{
                        paddingHorizontal: getPixel(11),
                        mineWidth: getPixel(139),
                        height: getPixel(46),
                        backgroundColor: '#0c1731',
                        borderRadius: getPixel(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: getPixel(8)
                    }}>
                        <Text style={{
                            fontSize: getPixel(30),
                            color: '#e59b2b',
                            fontWeight: '900'
                        }}>
                            {this.data.isWin === 1 ? this.data.winAmount+'UPP' :
                                this.data.loseAmount+'UPS'}
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: getPixel(14),
                        color: 'white',
                        fontWeight: '900',
                        marginTop: getPixel(10)
                    }}>
                        {this.data.isWin === 1 ?
                            ext('yijinghuikuanl') :
                            ext('beihuishou')}
                    </Text>
                </View>}
                <View style={{
                    width: getWidth(),
                    marginTop: getPixel(40),
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => {
                        let game = get(this.props, 'navigation.state.params.game', 0);
                        this.toScreen('GameOk', { game: game });
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
                                fontSize: getPixel(18),
                                color: 'white',
                                fontWeight: 'bold',
                            }}>
                                {ext('queren')}
                            </Text>
                        </FastImage>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.toScreen('GameList');
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
                                fontSize: getPixel(18),
                                color: 'white',
                                fontWeight: 'bold',
                            }}>
                                {ext('tiaozhanqitatuisong')}
                            </Text>
                        </FastImage>
                    </TouchableOpacity>

                </View>
                {this.data && <FastImage
                    source={this.data.isWin === 1 ?
                        require('../assets/youwin.png') :
                        require('../assets/youlose.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={{
                        width: getPixel(229), height: getPixel(94), position: 'absolute',
                        top: getPixel(96)
                    }} />}


                <BaseHeader leftPress={this.goBack} />
            </FastImage >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default GameResultScreen;
