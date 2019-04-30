import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import { SafeAreaView } from 'react-navigation';
export default class ChangeScreen extends BaseScreen {
    renderHeader = () => {
        return (
            <View style={{
                width: getWidth()
            }}>
                <View style={{
                    width: getWidth(),
                    marginTop: getPixel(8),
                    flexDirection:'row',
                }}>
                    <View style={{
                        width:getWidth()/2,
                        height:getPixel(63),
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:getPixel(5),
                        backgroundColor:'#132141'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>FRBC</Text>
                    <Text style={{
                        marginTop:getPixel(10),
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(13),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>0.0000</Text>
                    </View>
                    <View style={{
                        width:getWidth()/2,
                        height:getPixel(63),
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:getPixel(5),
                        backgroundColor:'#132141'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>FRBC</Text>
                    <Text style={{
                        marginTop:getPixel(10),
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(13),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>0.0000</Text>
                    </View>
                </View>
                <View style={{
                    width: getWidth(),
                    backgroundColor: '#132141',
                    marginTop: getPixel(5),
                }}>
                    <View style={{
                        width:getWidth(),
                        paddingHorizontal:getPixel(20),
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                         marginTop:getPixel(15),
                         backgroundColor:'#162C57',
                         paddingVertical:getPixel(10)
                    }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('shouxvfeibaifenbi')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>ETH($)174.8900</Text>
                    </View>
                    <View style={{
                        marginTop:getPixel(3),
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingVertical:getPixel(10),
                        marginBottom:getPixel(5),
                        width:getWidth(),
                        paddingHorizontal:getPixel(20),
                        backgroundColor:'#162C57'
                    }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('zuidatuihuan')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>FRBC($)85.8900</Text>
                    </View>
                    
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
            }} forceInset={{ top: 'never', bottom: 'always' }}>
                {this.renderHeader()}
                <View style={{
                    width: getWidth(),
                    height: getPixel(30),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput style={{ flex: 1 }}
                        placeholder={ext('inputNumber')} />
                </View>
                <View style={{
                    width: getWidth(),
                    height: getPixel(30),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput style={{ flex: 1 }}
                        placeholder={ext('changeNumber')} />
                </View>
                <View style={{
                    width: getWidth(),
                    height: getPixel(30),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput style={{ flex: 1 }}
                        placeholder={ext('changePsd')} />
                </View>
                <Text style={{
                    width: getWidth() - getPixel(40),
                    marginLeft: getPixel(20),
                    color: '#A34294',
                    fontSize: getPixel(12),
                    fontWeight: RkTheme.currentTheme.weight.Regular,
                    marginTop: getPixel(11)
                }}>{ext('shouxvfee')}</Text>
                <TouchableOpacity style={{
                    borderRadius: getPixel(5),
                    width: getWidth() - getPixel(65),
                    marginLeft: getPixel(33),
                    height: getPixel(38),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#132141',
                    marginTop: getPixel(100)
                }} activeOpacity={1}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                    }}>{ext('change')}</Text>
                </TouchableOpacity>
                <BaseHeader title='FRBC' leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}