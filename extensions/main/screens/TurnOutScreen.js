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
export default class TurnOutScreen extends BaseScreen {
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
                        placeholder={ext('out')} />
                    <Image style={{
                        width: getPixel(20),
                        height: getPixel(20),
                        resizeMode: 'stretch'
                    }} source={require('../assets/erweima.png')} />
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
                        placeholder={ext('address')} />
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(12),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('addressGroup')}</Text>
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
                        placeholder={ext('number')} />
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
                        placeholder={ext('transferPsd')}
                        secureTextEntry={true} />
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
                    }}>{ext('out')}</Text>
                </TouchableOpacity>
                <BaseHeader title='FRBC' leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}