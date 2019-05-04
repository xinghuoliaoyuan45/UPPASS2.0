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
import moment from 'moment';

export default class PanadaTotalScreen extends BaseScreen {
    renderHeader = () => {
        return (
            <View style={{
                width: getWidth(),
                height: getPixel(50),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141'
            }}>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft:getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('profitType')}</Text>
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
                    }}>{ext('money')}</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    paddingRight:getPixel(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{ext('date')}</Text>
                </View>
            </View>
        )
    }
    checkdata = (data) =>{
        if(data){
            data = data.toFixed(2);
        }else{
            data = '';
        }
        return data;
    }

    renderItemFunc = (item) =>{
        let time = get(item,'item.createTime','');
        time = moment(time).format('YY-MM-DD HH:mm:ss');
         return(
            <View style={{
                width: getWidth(),
                height: getPixel(50),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141'
            }}>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft:getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{get(item,'item.type','')}</Text>
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
                    }}>{this.checkdata(get(item,'item.money',''))}</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    paddingRight:getPixel(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{time}</Text>
                </View>
            </View>
        )
    }
    render() {
        const {state} = this.props.navigation;
        const type = get(state,'params.type','');
        const data = get(state,'params.data');
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: 'rgb(203,201,200)',
            }} forceInset={{ top: 'never', bottom: 'always' }}>
                <View style={{
                    width: getWidth(),
                    paddingHorizontal: getPixel(20),
                    marginTop: getPixel(10),
                    backgroundColor: '#132141',
                    paddingBottom: getPixel(10),
                    borderRadius: getPixel(5),
                    marginBottom:getPixel(14)
                }}>
                    <Text style={{
                        color: '#F0895A',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginTop: getPixel(10)
                    }}>{type==='panada'?ext('panada'):ext('commuintiesTotalProfit')}}</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginTop: getPixel(14)
                    }}>4</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginTop: getPixel(14)
                    }}>{ext('FBCshishi')}</Text>
                    <View style={{
                        marginTop: getPixel(10),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={{
                            color: '#FAED7F',
                            fontSize: getPixel(14),
                            fontWeight: RkTheme.currentTheme.weight.Regular,

                        }}>{ext('now')}</Text>
                        <Text style={{
                            color: '#F0895A',
                            fontSize: getPixel(14),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                            marginTop: getPixel(10),
                            marginLeft: getPixel(12)
                        }}>{ext('huoban')}
                        </Text>
                    </View>
                </View>
                <KBFlatList data={data}
                    renderItem={this.renderItemFunc}
                    ListHeaderComponent={this.renderHeader} />
                <BaseHeader title={ext('shouyi')} leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}