import React, { Component } from 'react';
import { View, Platform, BackAndroid, BackHandler, WebView } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import CustomWebView from '../../../CustomWebView';
@inject('rootStore')
@observer
export default class HangqingScreen extends BaseScreen {
    @observable isBack = false;
    constructor(props) {
        super(props);
        this.nav = this.props.navigation;
        this.addBackAndroidListener(this.nav);
    }
    addBackAndroidListener(navigator) {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onNavigationStateChange = (navState) => {
        console.log('console log for chrom navState-------', navState);
        console.log('console log for chrom navState.canGoBack====', navState.canGoBack);
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    _goBackPage = () => {
        //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
        if (this.state.backButtonEnabled) {
            this.refs['webView'].goBack();
        } else {//否则返回到上一个页面
            this.goBack();
        }
    };
    
    onBackAndroid = () => {
        if (this.state.backButtonEnabled) {
            this.refs['webView'].goBack();
            return true;
        } else {
            this.goBack();
            return true;
        }
    };
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <CustomWebView
                    source={{ uri: 'http://m.mytoken.io' }}
                    scalesPageToFit={true}
                    style={{
                        flex: 1,
                        marginTop: getTitlePixel(64),
                        marginBottom: getBottomPixel(5)
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                    ref='webView' />
                <BaseHeader leftType='close' leftPress={this.onBackAndroid}
                    leftColor='black' />
            </View>
        )
    }
}