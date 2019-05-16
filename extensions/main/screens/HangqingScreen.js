import React, { Component } from 'react';
import { View, WebView,Platform,BackAndroid,BackHandler } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
@inject('rootStore')
@observer
export default class HangqingScreen extends BaseScreen {
    @observable isBack = false;
    constructor(props){
        super(props);
       
    }
    _onNavigationStateChange = (navState)=>{
        console.log('console log for chrom navState-------',navState);
       console.log('console log for chrom navState.canGoBack====',navState.canGoBack);
      if(navState.canGoBack){
          this.isBack = true;
      }else{
          this.isBack = false;
      }
    }
    componentWillUnmount(){
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
   }
    mComponentDidMount = () =>{
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = ()=> {
        if (this.isBack) {
            this.refs.webView.goBack();
           return true;
        } else {
            this.goBack();
            return false;
        }
    };
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor:'white'
            }}>
                <WebView
                    source={{ uri: 'http://m.mytoken.io' }}
                    scalesPageToFit={true}
                    style={{
                        flex:1,
                        marginTop:getTitlePixel(64),
                        marginBottom:getBottomPixel(5)
                    }}
                    onNavigationStateChange={this._onNavigationStateChange}
                    ref='webView' />
               <BaseHeader leftType='close' leftPress={this.onBackAndroid}
               leftColor='black'/>
            </View>
        )
    }
}