import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import { getPixel, getWidth, getVariableHeight, Svgs } from '../../shared';
import { get } from 'lodash';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { toJS, observable } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
class GameItems extends BaseScreen {
    @observable timeStr = '';
  @observable type = '';
    renderTime = (date) => {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }

    ShowCountDown = (item) => {
        let jztime = get(item, 'lotteryTime', '');
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
            return 'pass';
        } else {
            return 'up';
        }
    }

    ShowCountDownTime = (item) => {
        let jztime = get(item, 'lotteryTime', '');
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
            if (day1 == 0) {
                this.timeStr = hour + ':' + minute + ':' + second;
            } else {
                this.timeStr = day1 + ext('day') + '  ' + hour + ':' + minute + ':' + second;
            }
        }
    }

    mComponentDidMount = () => {
        let { data } = this.props;
        let item = toJS(data.item.instance);
        this.ShowCountDownTime(item);
        this.type = this.ShowCountDown(item);
    }

    render() {
        let { data } = this.props;
        let item = toJS(data.item.instance);
        let isPart = toJS(data.item.isPart);
      //  let type = this.ShowCountDown(item);
        let image = require('../assets/hongse.png');
        let rightText = 'UP';
        if (this.type === 'pass' && isPart === 0) {
            rightText = 'END';
        } else if (this.type === 'pass' && isPart === 1) {
            image = require('../assets/lanse.png');
            rightText = 'PASS';
        } else if (this.type === 'up' && isPart === 1) {
            image = require('../assets/lanse.png');
            rightText = 'UP';
        }
        return (
            <FastImage style={{
                width: getWidth() - getPixel(40),
                marginHorizontal: getPixel(20),
                marginTop: getPixel(20),
                borderRadius: getPixel(10),
                backgroundColor: '#2d3f64'
            }} resizeMode={FastImage.resizeMode.stretch}
            // source={type === 'pass' ?
            //     require('../assets/gamepass.png') :
            //     require('../assets/gamelistback.png')}
            >
                <FastImage style={{
                    width: getPixel(50),
                    height: getPixel(50),
                    position: 'absolute',
                    right: 0
                }} resizeMode={FastImage.resizeMode.stretch}
                    source={image}
                >
                    <Text style={{
                        marginLeft: getPixel(20),
                        marginTop: getPixel(8), color: 'white', fontSize: getPixel(10)
                    }}>
                        {rightText}
                    </Text>
                </FastImage>
                <TouchableOpacity onPress={() => {
                    this.toScreen('GameInfo', {
                        index:
                            data.index, ispart: data.item.isPart
                    });
                }} style={{
                    width: getWidth() - getPixel(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: getPixel(106),
                }}>
                    <FastImage style={{
                        width: getPixel(81),
                        height: getPixel(81),
                        marginLeft: getPixel(12),
                        // backgroundColor: 'gray'
                    }} resizeMode={FastImage.resizeMode.stretch}
                        source={{ uri: 'http://47.75.98.154:8080/' + get(item, 'titlePicture', '') }}>

                    </FastImage>
                    <View style={{
                        flex: 1, paddingLeft: getPixel(12),
                        height: getPixel(106),
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14),
                            marginTop: getPixel(25),
                            fontWeight: 'bold'
                        }}>{item.gameTitle}</Text>
                        {
                            this.type === 'pass' ? <Text style={{
                                color: 'white',
                                fontSize: getPixel(14),
                                marginTop: getPixel(34),
                            }}>{ext('gameend')}</Text> :
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: getPixel(32)
                                }}>
                                    <Svgs icon={'yingbi'} size={getPixel(15)} />
                                    <Text style={{
                                        color: 'white',
                                        fontSize: getPixel(11),
                                        marginLeft: getPixel(10)
                                    }}>{data.item.totalCost}</Text>
                                </View>
                        }
                    </View>
                    {this.type === 'up' ? < View style={{ flex: 1, height: getPixel(106), }}>
                        <View style={{
                            marginTop: getPixel(48),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Svgs icon={'shizhong'} size={getPixel(15)} />
                            <Text style={{
                                color: 'white',
                                fontSize: getPixel(12),
                                marginLeft: getPixel(6)
                            }}>{this.timeStr}</Text>
                        </View>
                        <View style={{
                            marginTop: getPixel(10),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Svgs icon={'renren'} color={'white'} size={getPixel(15)} />
                            <Text style={{
                                color: 'white',
                                fontSize: getPixel(14),
                                marginLeft: getPixel(4)
                            }}>{data.item.partInNumer}</Text>
                        </View>
                    </View> : <View style={{ flex: 1, height: getPixel(106), }}>
                            <View style={{
                                marginTop: getPixel(48),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Svgs icon={'renren'} size={getPixel(15)} />
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                    marginLeft: getPixel(6)
                                }}>{data.item.partInNumer}</Text>
                            </View>
                            <View style={{
                                marginTop: getPixel(10),
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Svgs icon={'renwin'} color={'white'} size={getPixel(15)} />
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                    marginLeft: getPixel(4),
                                    marginRight: getPixel(15)
                                }}>{data.item.winNum}</Text>
                                <Svgs icon={'renqian'} color={'white'} size={getPixel(15)} />
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                    marginLeft: getPixel(4)
                                }}>{data.item.winnerEarnings}</Text>
                            </View>
                        </View>}

                </TouchableOpacity>
            </FastImage >
        );
    }
}

export default GameItems;
