import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getPixel, getWidth, Svgs, PullFlatList, getTitlePixel, BaseHeader, KBFlatList, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import {SafeAreaView} from 'react-navigation';
export default class AssetConfirmScreen extends BaseScreen {
    constructor(props) {
        super(props);
        //0 成功 1失败
        this.data = [
            {
                number: '19284.009473626',
                date: '2019-04-20  18:30:30',
                liushui: 'FXxxcod45CKDOGdkdo702938DKFL',
                status: 0
            },
            {
                number: '19284.009473626',
                date: '2019-04-20  18:30:30',
                liushui: 'FXxxcod45CKDOGdkdo702938DKFL',
                status: 0
            }, {
                number: '19284.009473626',
                date: '2019-04-20  18:30:30',
                liushui: 'FXxxcod45CKDOGdkdo702938DKFL',
                status: 0
            }
        ]
    }
    renderHeader = () => {
        return (
            <View style={{
                width: getWidth()
            }}>
                <View style={{
                    width: getWidth(),
                    paddingHorizontal: getPixel(20),
                    paddingVertical: getPixel(15),
                    backgroundColor: '#132141',
                    marginTop: getPixel(7),
                    borderRadius: getPixel(5),
                    height: getPixel(61)
                }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>4</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        marginTop: getPixel(9),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>=$49.000000</Text>

                </View>
                <View style={{
                    width: getWidth(),
                    paddingHorizontal: getPixel(20),
                    backgroundColor: 'white',
                    marginTop: getPixel(7),
                    height: getPixel(30),
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('chargeDetail')}</Text>
                </View>
            </View>
        )
    }
    renderItemFunc = (item) => {
        let statusText = '';
        if (get(item, 'item.status') === 0) {
            statusText = ext('successful');
        } else if (get(item, 'item.status') === 1) {
            statusText = ext('filed');
        }
        return (
            <View style={[{
                width: getWidth(),
                paddingHorizontal: getPixel(20),
                paddingVertical: getPixel(15),
                marginTop: getPixel(7),
                backgroundColor: 'white'
            }, item.index === 0 && { marginTop: getPixel(11) }]}>
                <View style={{
                    width: getWidth() - getPixel(40),
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: '#C61437',
                        fontSize: getPixel(12),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{get(item, 'item.number', '')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(12),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{statusText}</Text>
                </View>
                <Text style={{
                    color: 'rgb(203,201,200)',
                    fontSize: getPixel(10),
                    fontWeight: RkTheme.currentTheme.weight.Regular,
                    marginTop: getPixel(7)
                }}>{get(item, 'item.date', '')}</Text>
                <View style={{
                    width: getWidth() - getPixel(40),
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginTop: getPixel(8)
                    }}>{get(item, 'item.liushui', '')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('copy')}</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: 'rgb(203,201,200)',
            }} forceInset={{top:'never',bottom:'always'}}> 
                <KBFlatList
                    data={this.data}
                    renderItem={this.renderItemFunc}
                    ListHeaderComponent={this.renderHeader}
                />
                <View style={{
                    position: 'absolute',
                    bottom: getBottomPixel(1),
                    width: getWidth(),
                    height: getPixel(45),
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: getWidth() / 3,
                        alignItems: 'flex-start'
                    }}>
                        <TouchableOpacity style={{
                            borderRadius: getPixel(3),
                            width:getPixel(85),
                            height:getPixel(42),
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'#132141'
                        }} activeOpacity={1} onPress={()=>{
                            this.toScreen('TurnOut')
                        }}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{ext('out')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: getWidth() / 3,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            borderRadius: getPixel(3),
                            width:getPixel(85),
                            height:getPixel(42),
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'#132141'
                        }} activeOpacity={1} onPress={()=>{
                            this.toScreen('Change')
                        }}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{ext('change')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: getWidth() / 3,
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity style={{
                            borderRadius: getPixel(3),
                            width:getPixel(85),
                            height:getPixel(42),
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'#132141'
                        }} activeOpacity={1} 
                        onPress={()=>{this.toScreen('Down')}}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{ext('in')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BaseHeader title='FRBC' leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}