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
import { observer, inject } from 'mobx-react';
@inject('rootStore')
@observer
export default class TurnOutScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { TurnOutStore, ChangeStore } = this.props.rootStore.mainStore;
        this.TurnOutStore = TurnOutStore;
        this.ChangeStore = ChangeStore;
    }
    mComponentDidMount = () => {
        this.ChangeStore.getChangeData();
    }
    renderHeader = () => {
        const { state } = this.props.navigation;
        const number = get(state, 'params.number', '');
        const price = get(state, 'params.price', '');
        const shizhi = number * price;
        return (
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
                }}>{number}</Text>
                <Text style={{
                    color: 'rgb(203,201,200)',
                    fontSize: getPixel(14),
                    marginTop: getPixel(9),
                    fontWeight: RkTheme.currentTheme.weight.Regular
                }}>{`= $${shizhi}`}</Text>

            </View>
        )
    }

    render() {
        const { state } = this.props.navigation;
        const title = get(state, 'params.title');
        const panderCharge = get(this.ChangeStore.changeData, 'panderCharge', '');
        let FRBCNum = '';
        if (this.TurnOutStore.number) {
            FRBCNum = panderCharge * this.TurnOutStore.number;
        }
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
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('out')}</Text>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.toScreen('Scan');
                        }}>
                        <Image style={{
                            width: getPixel(20),
                            height: getPixel(20),
                            resizeMode: 'stretch'
                        }} source={require('../assets/erweima.png')} />
                    </TouchableOpacity>
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
                    {/* <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(12),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('addressGroup')}</Text> */}
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
                        placeholder={ext('number')}
                        onChangeText={(text) => {
                            this.TurnOutStore.changeNumber(text)
                        }} />
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
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.TurnOutStore.changePsd(text)
                        }} />
                </View>
                {
                    this.TurnOutStore.number ?
                        <Text style={{
                            width: getWidth() - getPixel(40),
                            marginLeft: getPixel(20),
                            color: '#A34294',
                            fontSize: getPixel(12),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                            marginTop: getPixel(11)
                        }}>{ext('shouxvfee', { FRBCNum, panderCharge })}</Text> : <View />

                }
                <TouchableOpacity style={{
                    borderRadius: getPixel(5),
                    width: getWidth() - getPixel(65),
                    marginLeft: getPixel(33),
                    height: getPixel(38),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#132141',
                    marginTop: getPixel(100)
                }} activeOpacity={1} onPress={() => {
                    this.TurnOutStore.turnOut(title);
                }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                    }}>{ext('out')}</Text>
                </TouchableOpacity>
                <BaseHeader title={title} leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}