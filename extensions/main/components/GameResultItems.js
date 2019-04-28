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
class GameResultItems extends BaseScreen {
    @observable timeStr = '';

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
    }

    renderTime = (date) => {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }

    render() {
        let { data,game } = this.props;
        let item = toJS(data.item);
        let id = item.id;
        console.log('console log for chrom item.results',item.results);
        return (
            <View style={{
                width: getWidth() - getPixel(40),
                marginHorizontal: getPixel(20),
                marginTop: getPixel(20),
                borderRadius: getPixel(10),
                height: getPixel(106),
                backgroundColor: '#314066'
            }} >
                <TouchableOpacity onPress={() => {
                    this.toScreen('GameResult', { game: game, id: id });
                }} style={{
                    width: getWidth() - getPixel(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: getPixel(106),
                }}>
                    <View style={{flex:1,paddingLeft:getPixel(20)}}>
                        <Text style={{
                            color:'white',
                            fontSize:getPixel(14)
                        }}>{this.renderTime(item.createdAt)}</Text>
                        <Text style={{
                            color:'white',
                            fontSize:getPixel(14),
                            marginTop:getPixel(20)
                        }}>{ext('touru')+':'+item.partInAmount}</Text>
                    </View>
                    <View style={{flex:1,paddingLeft:getPixel(20)}}>
                        <Text style={{
                            color:'white',
                            fontSize:getPixel(14)
                        }}>{item.results==0?'LOSE':'WIN'}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}

export default GameResultItems;
