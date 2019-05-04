import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
export default class HangqingScreen extends BaseScreen {
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <WebView
                    source={{ uri: 'https://coinmarketcap.com/' }} />
               <BaseHeader leftType='close' leftPress={this.goBack}
               leftColor='black'/>
            </View>
        )
    }
}