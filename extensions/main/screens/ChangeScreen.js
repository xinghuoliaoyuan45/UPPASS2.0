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
export default class ChangeScreen extends BaseScreen {

    constructor(props) {
        super(props);
        const { ChangeStore } = this.props.rootStore.mainStore;
        this.ChangeStore = ChangeStore;
    }
    mComponentDidMount = () => {
        this.ChangeStore.getChangeData();
    }
    checkdata = (data, number) => {
        if (data) {
            data = data.toFixed(number);
        }else if(data === 0){
            data = 0;
        }  else {
            data = null;
        }
        return data;
    }
    renderHeader = () => {
        const { state } = this.props.navigation;
        const titile = get(state, 'params.title');
        const serviceCharge = get(this.ChangeStore.changeData, 'serviceCharge', '');
        const rateOfExchange = get(this.ChangeStore.changeData, 'rateOfExchange', '');
        const ETHnumber = rateOfExchange * get(this.ChangeStore.changeData, 'frbcNum', null);

        const frbcPrice = this.checkdata(get(this.ChangeStore.changeData, 'frbcPrice', null), 2);
        const ethPrice = this.checkdata(parseFloat(get(this.ChangeStore.changeData, 'ethPrice', null)), 2)
        return (
            <View style={{
                width: getWidth()
            }}>
                <View style={{
                    width: getWidth(),
                    marginTop: getPixel(8),
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: getWidth() / 2,
                        height: getPixel(63),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: getPixel(5),
                        backgroundColor: '#132141'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>FRBC</Text>
                        <Text style={{
                            marginTop: getPixel(10),
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(13),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{this.checkdata(get(this.ChangeStore.changeData, 'frbcNum', null), 8)}</Text>
                    </View>
                    <View style={{
                        width: getWidth() / 2,
                        height: getPixel(63),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: getPixel(5),
                        backgroundColor: '#132141'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(14),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{titile}</Text>
                        <Text style={{
                            marginTop: getPixel(10),
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(13),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{this.checkdata(get(this.ChangeStore.changeData, 'ethNum', null), 8)}</Text>
                    </View>
                </View>
                <View style={{
                    width: getWidth(),
                    backgroundColor: '#132141',
                    marginTop: getPixel(5),
                }}>
                    <View style={{
                        width: getWidth(),
                        paddingHorizontal: getPixel(20),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: getPixel(15),
                        backgroundColor: '#162C57',
                        paddingVertical: getPixel(10)
                    }}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{ext('shouxvfeibaifenbi', { serviceCharge })}</Text>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{`ETH($)${frbcPrice}`}</Text>
                    </View>
                    <View style={{
                        marginTop: getPixel(3),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: getPixel(10),
                        marginBottom: getPixel(5),
                        width: getWidth(),
                        paddingHorizontal: getPixel(20),
                        backgroundColor: '#162C57'
                    }}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{ext('zuidatuihuan', { ETHnumber })}</Text>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{`ETH($)${ethPrice}`}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { state } = this.props.navigation;
        const type = get(state, 'params.title');
        const panderCharge = get(this.ChangeStore.changeData,'panderCharge','');
        let FRBCNum = '';
        if(this.ChangeStore.ethNumber){
            FRBCNum = panderCharge * this.ChangeStore.ethNumber;
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
                    height: getPixel(40),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput 
                        placeholder={ext('inputNumber')}
                        onChangeText={(text) => {
                            this.ChangeStore.changeFrnbNumber(text);
                        }} />
                </View>
                <View style={{
                    width: getWidth(),
                    height: getPixel(40),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput 
                        placeholder={ext('changeNumber', { type })} 
                        onChangeText={(text)=>{
                            this.ChangeStore.changeEthNUmber(text)
                        }}/>
                </View>
                <View style={{
                    width: getWidth(),
                    height: getPixel(40),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(11),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TextInput 
                        placeholder={ext('changePsd')}
                        onChangeText={(text) => {
                            this.ChangeStore.changePsd(text)
                        }} />
                </View>
                {this.ChangeStore.ethNumber ?
                  <Text style={{
                    width: getWidth() - getPixel(40),
                    marginLeft: getPixel(20),
                    color: '#A34294',
                    fontSize: getPixel(12),
                    fontWeight: RkTheme.currentTheme.weight.Regular,
                    marginTop: getPixel(11)
                }}>{ext('shouxvfee',{FRBCNum,panderCharge})}</Text>:<View/> }
              
                <TouchableOpacity style={{
                    borderRadius: getPixel(5),
                    width: getWidth() - getPixel(65),
                    marginLeft: getPixel(33),
                    height: getPixel(38),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#132141',
                    marginTop: getPixel(100)
                }} activeOpacity={1} onPress={this.change}>
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

    change = () => {
        this.ChangeStore.change();
    }
}