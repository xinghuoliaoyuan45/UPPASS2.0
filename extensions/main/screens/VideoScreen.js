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
import Video from 'react-native-video';

@inject('rootStore')
@observer
class VideoScreen extends BaseScreen {
    @observable data = ['简体中文', '한국어'];

    render() {
        return (
            <View style={{
                flex: 1, backgroundColor: RkTheme.currentTheme.colors.allBackground,

            }}>
                <Video
                    ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                        this.video = ref
                    }}
                    /* source={{ uri: 'https://gslb.miaopai.com/stream/HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__.mp4?ssig=bbabfd7684cae53660dc2d4c2103984e&time_stamp=1533631567740&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__', type: 'mpd' }} */
                    source={{uri:'http://47.74.24.151:8080/game-describe/20190313/5e4892e2d7df494ba1b541702b60b088.mp4'}}//设置视频源  
                    style={{flex:1}}//组件样式
                    rate={this.state.rate}//播放速率
                    paused={this.state.paused}//暂停
                    volume={this.state.volume}//调节音量
                    muted={this.state.muted}//控制音频是否静音
                    resizeMode={this.state.resizeMode}//缩放模式
                    onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                    onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                    onEnd={this.onEnd}//视频播放结束时的回调函数
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                    onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                    repeat={false}//确定在到达结尾时是否重复播放视频。
                />
            </View>
        );
    }
}

export default VideoScreen;

