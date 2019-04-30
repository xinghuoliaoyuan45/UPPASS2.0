import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel, KBFlatList } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import { SafeAreaView } from 'react-navigation';
import AiPanadaOPen from '../components/AiPanadaOPen';
export default class AiPanadaScreen extends BaseScreen {
    openAiPanada = () =>{
        this.refs.aiPanadaOPen.changeShow();
    }
    chexiao = () =>{
        this.refs.aiPanadaOPenChexiao.changeShow();
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: 'rgb(203,201,200)',
            }} forceInset={{ top: 'never', bottom: 'always' }}>
                <View style={{
                width: getWidth(),
                height: getPixel(60),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141',
                marginTop:getPixel(18),
                borderRadius:getPixel(5)
            }}>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft:getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>EHC</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('opened')}</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    paddingRight:getPixel(20),
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <TouchableOpacity style={{
                        width:getPixel(20),
                        height:getPixel(20),
                        backgroundColor: 'rgb(108,182,56)',
                        borderRadius:getPixel(10)
                    }} activeOpacity={1} onPress={this.chexiao}/>
                </View>
            </View>
            <View style={{
                width: getWidth(),
                height: getPixel(60),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141',
                marginTop:getPixel(10),
                borderRadius:getPixel(5)
            }}>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft:getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>BHC</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('closed')}</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    paddingRight:getPixel(20),
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                     <TouchableOpacity style={{
                        width:getPixel(20),
                        height:getPixel(20),
                        backgroundColor: 'rgb(203,201,200)',
                        borderRadius:getPixel(10)
                    }} activeOpacity={1} onPress={this.openAiPanada}/>
                </View>
            </View>
                <BaseHeader title={ext('shouyi')} leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
                <AiPanadaOPen ref='aiPanadaOPen'/>
                <AiPanadaOPen ref='aiPanadaOPenChexiao' 
                title={ext('chexiao')} placeHolder1='ETH = 20.37494050' 
                placeHolder2={ext('pleaseInputNumber')}
                placeHolder3={ext('pleaseInputPsd')}/>
            </SafeAreaView>
        )
    }
}