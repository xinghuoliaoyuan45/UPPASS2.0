import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    Linking
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

@inject('rootStore')
@observer
class GameInfoScreen extends BaseScreen {
    @observable totle = 0;
    @observable item = {};
    @observable seleted = 'up';
    @observable itemselect = 0;
    @observable showStart = true;
    @observable timeStr = '';
    @observable startToast = '';
    @observable game = null;
    @observable loading = 'LOADING_STATUS';
    constructor(props) {
        super(props);
        const { GameStore } = this.props.rootStore.mainStore;
        this.GameStore = GameStore;
    }

    mComponentDidMount = async (ids) => {
        let index = get(this.props, 'navigation.state.params.index', 0);
        this.GameStore.getGameList(0,0,() => {
            if (ids) {
                console.log('console log for chrom 1111');
                let list = toJS(this.GameStore.data);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].instance.id === ids) {
                        this.item = list[i];
                    }
                }
            } else {
                console.log('console log for chrom toJS(this.GameStore.data)', toJS(this.GameStore.data));
                this.item = toJS(this.GameStore.data)[index];
                this.getLoad();
            }

        });

    }
    ShowCountDown = () => {
        let jztime = get(this.item, 'instance.lotteryTime', '');
        var now = new Date();
        var datess = jztime;
        datess = datess.substring(0, 19);
        datess = datess.replace(/-/g, '/');
        var endDate = new Date(datess);
        var leftTime = endDate.getTime() - now.getTime();
        var leftsecond = parseInt(leftTime / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        if (day1 < 10) { day1 = day1; }
        if (hour < 10) { hour = "0" + hour; }
        if (minute < 10) { minute = "0" + minute; }
        if (second < 10) { second = "0" + second; }
        if (day1 < 0) {
            this.timer && clearInterval(this.timer);
            this.timeStr = ext('game_over');
            this.showStart = false;
            this.startToast = ext('game_over');
        } else {
            this.timeStr = day1 + ext('day') + '  ' + hour + ':' + minute + ':' + second;
        }
    }
    getLoad = async () => {
        this.loading = 'LOADING_STATUS';
        let oldData = await load('gameinfo' +
            get(toJS(this.item), 'instance.id', ''), null);
        console.log('console log for chrom oldData', oldData);
        if (oldData) {
            this.seleted = oldData.seleted;
            this.itemselect = oldData.itemselect;
            this.showStart = true;
            this.startToast = ext('you_have_already');
        }
        let param = new URLSearchParams()
        param.append('id', get(toJS(this.item), 'instance.id', ''))
        getGameInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.game = data;
                console.log('console log for chrom this.game', this.game);
                this.timer = setInterval(this.ShowCountDown,
                    1000);
                this.loading = '';
            } else {
                toastRequestError(data);
                this.loading = '';
            }
        }).catch();
    }
    xiazhu = async () => {
        if (this.totle === 0) {
            this.showToast(ext('qingyazhu'));
            return;
        }
        this.refs.Dialog.frameShow();
        return;


    }

    xiazhuok = async () => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id)
        param.append('gameId', this.game.data.instance.id)
        param.append('partInAmount', this.totle)
        param.append('userChoice', this.seleted === 'up' ? 1 : 0)
        GAME_BET_IN(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                let index = get(this.props, 'navigation.state.params.index', 'nodata');
                save('gameinfo' + get(toJS(this.item), 'instance.id', ''), {
                    seleted: this.seleted,
                    itemselect: this.itemselect
                });
                this.toScreen('GameNext', {
                    callBack: (id) => {
                        this.mComponentDidMount(id);
                    }
                });
                this.mComponentDidMount();
            } else {
                toastRequestError(data);
            }
        }).catch();


    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.backTimer && clearTimeout(this.backTimer);
    }
    getNumberView = () => {
        if (!this.game) {
            return null;
        }
        let itemList = [];
        let money = get(this.game, 'data.jackpotAmount', '0000');
        money = money + '';
        if (money == 'null') {
            money = '0000';
        }
        for (let i = 0; i < money.length; i++) {
            itemList.push(
                <View style={{
                    width: getPixel(24),
                    height: getPixel(30),
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    marginHorizontal: getPixel(3),
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: getPixel(25),
                        fontWeight: 'bold',
                        color: '#e69c2b'
                    }}>{money.substring(i, i + 1)}</Text>
                </View>
            );
        }
        return itemList;
    }
    getNowMonth = () => {
        var date = new Date();
        var month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        return month;
    }
    getNowDay = () => {
        var date = new Date();
        var strDate = date.getDate();
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return strDate;
    }
    render() {
        let length = 3;
        let itemListData = [];
        let itemList = [];
        let items = get(toJS(this.item), 'instance.betGear', '').split(',');
        if (items.length < 3) {
            length = items.length;
        }
        if (items[0] === '') {
            items.splice(0, 1);
        }
        for (let i = 0; i < length; i++) {
            if (i === 0) {
                itemListData.push({
                    name: items[i],
                    selectImage: require('../assets/cicel_xiao.png'),
                });
            } else if (i === 1) {
                itemListData.push({
                    name: items[i],
                    selectImage: require('../assets/cicel_zhong.png'),
                });
            } else {
                itemListData.push({
                    name: items[i],
                    selectImage: require('../assets/cicel_da.png'),
                });
            }
        }
        for (let i = 0; i < itemListData.length; i++) {
            itemList.push(<TouchableOpacity
                onPress={() => {
                    this.totle = this.totle + parseInt(itemListData[i].name);
                }}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    width: getPixel(50),
                    height: getPixel(24),
                }}>
                <Text style={{
                    fontSize: getPixel(15),
                    color: '#022047',
                    fontWeight: RkTheme.currentTheme.weight.Semibold,
                    width: getPixel(50)
                }} numberOfLines={1} >{itemListData[i].name}</Text>
            </TouchableOpacity>);
        }
        // console.log('console log for chrom dizhi',
        //     'http://47.74.24.151:8080' +
        //     get(this.game, 'data.instance.describe'));
        let dizhi = 'http://47.75.98.154:8080/' +
            get(this.game, 'data.instance.describe');
        let showType = 'image';
        if (dizhi.indexOf('.mp4') >= 0) {
            showType = 'video';
        }
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#13213f', }}>
                <FastImage source={require('../assets/gameinfoback.png')}
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
                    <TouchableOpacity onPress={() => {
                        let describUrl = get(toJS(this.item), 'instance.describUrl', '')
                        if (describUrl) {
                            Linking.openURL(describUrl + '');
                        }

                    }} style={{
                        width: getWidth(),
                        marginTop: getTitlePixel(64)
                    }}>
                        {showType === 'video' ? <Video
                            source={{ uri: dizhi }}
                            resizeMode='contain'
                            muted={true}
                            repeat={true}
                            style={{
                                width: getWidth(),
                                height: getPixel(204)
                            }} /> : <FastImage
                                source={{ uri: dizhi }}
                                style={{
                                    width: getWidth(),
                                    height: getPixel(204),
                                    backgroundColor: 'white',

                                }}></FastImage>}
                    </TouchableOpacity>


                    <View style={{
                        marginTop: getPixel(10),
                        width: getPixel(97),
                        height: getPixel(28),
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: getPixel(12),
                            color: 'white',
                        }}>{ext('activityRules')}</Text>
                    </View>

                    <Text style={{
                        textAlign: 'center',
                        fontSize: getPixel(12),
                        color: 'white',
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                        width: getPixel(202),
                        marginTop: getPixel(15)
                    }}>{get(toJS(this.item), 'instance.lotteryTime')}</Text>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: getPixel(16),
                        color: 'white',
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                        width: getPixel(202),
                        marginTop: getPixel(7)
                    }}>{get(toJS(this.item), 'instance.gameContent')}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        marginTop: getPixel(15)
                    }}>
                        <Text style={{
                            fontSize: getPixel(12),
                            color: 'white',
                            marginRight: getPixel(12)
                        }}>{ext('Currentprizepool')}</Text>
                        {this.getNumberView()}
                        <Text style={{
                            fontSize: getPixel(13),
                            color: 'white',
                            marginLeft: getPixel(12)
                        }}>{ext('integral')}</Text>
                    </View>

                    <View style={{
                        width: getPixel(190),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: getPixel(15),
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        height: getPixel(34),
                        alignItems: 'center'
                    }}>
                        {itemList}
                    </View>
                    <Text style={{
                        lineHeight: getPixel(28),
                        fontSize: getPixel(15),
                        color: '#022047',
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                        width: getPixel(90),
                        height: getPixel(24),
                        backgroundColor: 'white',
                        textAlign: 'center',
                        marginTop: getPixel(10)
                    }}>{this.totle}</Text>
                    <FastImage source={require('../assets/gamejuxing.png')}
                        style={{
                            alignItems: 'center',
                            width: getPixel(311),
                            height: getPixel(148),
                            marginTop: getPixel(10)
                        }}>
                        <View style={{
                            width: getPixel(331),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: getPixel(16),
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: getPixel(11),
                                color: 'white'
                            }}>{ext('Numberofparticipants',
                                {
                                    month: this.getNowMonth(),
                                    day: this.getNowDay()
                                })}</Text>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: '#e69c2b',
                                fontWeight: 'bold'
                            }}> {get(this.game, 'data.totalNumber')} </Text>
                            <Text style={{
                                fontSize: getPixel(11),
                                color: 'white'
                            }}>{ext('people')}</Text>
                            <Text style={{
                                fontSize: getPixel(11),
                                color: 'white'
                            }}> | </Text>
                            <Text style={{
                                fontSize: getPixel(11),
                                color: 'white'
                            }}>{ext('details')}</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            width: getPixel(293),
                            height: getPixel(17),
                            marginTop: getPixel(16),
                            borderRadius: 100,
                            flexDirection: 'row',
                            backgroundColor: '#3c5c9c',

                        }}>
                            <View style={{
                                height: getPixel(17),
                                borderRadius: 100,
                                backgroundColor: '#e69c2b',
                                justifyContent: 'center',
                                width: get(this.game, 'data.upNumber', 0) === 0 ? 0 : (getWidth() - getPixel(60 * 2)) *
                                    (get(this.game, 'data.upNumber', 0) /
                                        get(this.game, 'data.totalNumber', 0))
                            }}>
                                <Text style={{
                                    fontSize: getPixel(11),
                                    color: 'white',
                                    marginLeft: getPixel(7)
                                }}>{get(this.game, 'data.upNumber', 0) === 0 ? 0 : parseInt((get(this.game, 'data.upNumber', 0) / get(this.game, 'data.totalNumber', 0)) * 100)}%</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: getPixel(11),
                                    color: 'white',
                                    marginRight: getPixel(7)
                                }}>{get(this.game, 'data.downNumber', 0) === 0 ? 0 : parseInt((get(this.game, 'data.downNumber', 0) / get(this.game, 'data.totalNumber', 0)) * 100)}%</Text>
                            </View>
                        </View>
                        <View style={{
                            width: getWidth(),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: getPixel(21)
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (!this.showStart) {
                                    this.showToast(this.startToast);
                                    return
                                }
                                // this.showToast(ext('youselectup'));
                                this.seleted = 'up';
                                this.xiazhu();
                            }}
                                style={{
                                    alignItems: 'center',
                                    height: getPixel(52),
                                    justifyContent: 'center',
                                    width: getPixel(142),
                                    backgroundColor: '#00000000',
                                    borderRadius: getPixel(5)
                                }}>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (!this.showStart) {
                                    this.showToast(this.startToast);
                                    return
                                }
                                // this.showToast(ext('youselectdown'));
                                this.seleted = 'down';
                                this.xiazhu();
                            }}
                                style={{
                                    alignItems: 'center',
                                    height: getPixel(52),
                                    justifyContent: 'center',
                                    width: getPixel(142),
                                    backgroundColor: '#00000000',
                                    borderRadius: getPixel(5),
                                    marginLeft: getPixel(15)
                                }}>
                            </TouchableOpacity>
                        </View>
                    </FastImage>
                    {/* <FastImage source={require('../assets/xin.png')}
                        style={{
                            alignItems: 'center',
                            width: getPixel(190),
                            height: getPixel(33),
                            marginTop: getPixel(15),
                            flexDirection: 'row'
                        }}>
                        <TouchableOpacity onPress={() => {
                            if (this.showStart) {
                                this.xiazhu();
                            } else {
                                this.showToast(this.startToast);
                            }
                        }}
                            style={{
                                backgroundColor: '#00000000',
                                width: getPixel(104),
                                height: getPixel(43),
                            }}>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.totle = 0;
                        }}
                            style={{
                                backgroundColor: '#00000000',
                                width: getPixel(104),
                                height: getPixel(43),
                            }}>
                        </TouchableOpacity>
                    </FastImage> */}
                    <View style={{
                        width: getWidth() - getPixel(80),
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: getPixel(30),
                    }}>
                        {this.timeStr === ext('game_over') ? null : <Text style={{
                            fontSize: getPixel(10),
                            color: '#fff',
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>
                            *{ext('before_the_prize')}
                        </Text>}

                        <Text style={{
                            fontSize: getPixel(16),
                            color: '#dea24b',
                            fontWeight: RkTheme.currentTheme.weight.Bold,
                        }}>
                            {this.timeStr}
                        </Text>
                    </View>

                    {/* <View style={{
                        width: getWidth(),
                        height: getPixel(200),
                        backgroundColor: '#13213f',
                    }}></View> */}
                    {/* <View style={{
                        width: getPixel(57),
                        height: getPixel(57),
                        backgroundColor: 'white',
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: getPixel(131)
                    }}>
                        <Svgs icon={'icon_game'} size={getPixel(30)}
                            color={'#022047'} />
                    </View>

                    <View style={{
                        width: getWidth(),
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: getPixel(97),
                            height: getPixel(28),
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: getPixel(15)
                        }}>
                            <Text style={{
                                fontSize: getPixel(12),
                                color: 'white'
                            }}>{ext('activityRules')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            console.log('console log for chrom this.item', this.item);
                            this.toScreen('OpenGame', { id: get(this.item, 'id') });
                        }} style={{
                            width: getPixel(97),
                            height: getPixel(28),
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: getPixel(15),
                            marginLeft: getPixel(8)
                        }}>
                            <Text style={{
                                fontSize: getPixel(12),
                                color: 'white'
                            }}>{ext('lotteryResults')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: getPixel(287),
                        height: getPixel(168),
                        borderRadius: 2,
                        backgroundColor: 'white',
                        marginTop: getPixel(32),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: getPixel(14),
                            color: '#022047',
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                            width: getPixel(182)
                        }}>{get(toJS(this.item), 'gameContent')}</Text>
                    </View>
                    <View style={{
                        width: getWidth() - getPixel(90),
                        height: getPixel(50),
                        flexDirection: 'row',
                        marginTop: getPixel(27),
                    }}>
                        {itemList}
                    </View>
                    <View style={{
                        width: getWidth(),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: getPixel(45)
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.seleted = 'up';
                        }}
                            style={{
                                alignItems: 'center',
                                height: getPixel(35),
                                justifyContent: 'center',
                                width: getPixel(122),
                                backgroundColor: this.seleted === 'up' ? '#dea24b' : 'white',
                                borderRadius: getPixel(5)
                            }}>
                            <Text style={{
                                fontSize: getPixel(18),
                                color: '#022047',
                                fontWeight: RkTheme.currentTheme.weight.Bold
                            }}>UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.seleted = 'down';
                        }}
                            style={{
                                alignItems: 'center',
                                height: getPixel(35),
                                justifyContent: 'center',
                                width: getPixel(122),
                                backgroundColor: this.seleted === 'down' ? '#dea24b' : 'white',
                                borderRadius: getPixel(5),
                                marginLeft: getPixel(15)
                            }}>
                            <Text style={{
                                fontSize: getPixel(18),
                                color: '#022047',
                                fontWeight: RkTheme.currentTheme.weight.Bold
                            }}>DOWN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: getWidth(),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: getPixel(76)
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.showStart) {
                                    this.xiazhu();
                                } else {
                                    this.showToast(this.startToast);
                                }
                            }}
                            style={{
                                width: getPixel(49),
                                height: getPixel(25),
                                borderWidth: 1,
                                borderColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(14),
                                color: '#fff',
                            }}>
                                Start
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                width: getPixel(49),
                                height: getPixel(25),
                                borderWidth: 1,
                                borderColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Text style={{
                                fontSize: getPixel(14),
                                color: '#fff',
                            }}>
                                Reset
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: getWidth() - getPixel(80),
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop:getPixel(60)
                    }}>
                        {this.timeStr === ext('game_over') ? null : <Text style={{
                            fontSize: getPixel(10),
                            color: '#fff',
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>
                            *{ext('before_the_prize')}
                        </Text>}

                        <Text style={{
                            fontSize: getPixel(16),
                            color: '#dea24b',
                            fontWeight: RkTheme.currentTheme.weight.Bold,
                        }}>
                            {this.timeStr}
                        </Text>
                    </View>
                    <View style={{
                        width: getWidth(),
                        height: getPixel(300)
                    }}></View> */}
                    {this.renderStatusView(this.loading)}
                    <BaseHeader leftColor='white'
                        leftName={ext('back')}
                        leftPress={this.goBack}
                        rightName={ext('gameresult')}
                        rightPress={() => {
                            if (!this.showStart) {
                                if (this.game.data.instance.status === 0) {
                                    this.showToast('开奖中，请稍后再试');
                                    return
                                }
                                let ispart =
                                    get(this.props, 'navigation.state.params.ispart', 0);
                                if (ispart === 0) {
                                    this.showToast('您未参与游戏');
                                    return
                                }
                                this.toScreen('GameResultList', { game: this.game });
                            } else {
                                this.showToast('游戏未结束');
                            }
                        }} />

                </View >
                <Dialog
                    ref='Dialog'
                    title={ext('messagetitle')}          //弹出框头部内容    
                    content={ext('tankuangtishi', { account: this.totle, select: this.seleted })}    //弹出框内容
                    cancel={ext('cancel')}        //弹出框左侧选项内容
                    submit={ext('confirm')}          //弹出框右侧选项内容
                    isCancel={true}           //弹出框左侧选项控制器
                    isSubmit={true}            //弹出框右侧选项控制器
                    submitFunc={              //弹出框右侧选项回调方法
                        () => {
                            this.xiazhuok()
                        }
                    }
                />
            </ScrollView>

        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default GameInfoScreen;
