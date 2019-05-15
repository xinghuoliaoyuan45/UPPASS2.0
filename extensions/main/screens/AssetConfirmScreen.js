import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Clipboard } from 'react-native';
import { getPixel, getWidth, Svgs, PullFlatList, getTitlePixel, BaseHeader, KBFlatList, getBottomPixel } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import {SafeAreaView} from 'react-navigation';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
@inject('rootStore')
@observer
export default class AssetConfirmScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {OtherStore } = this.props.rootStore.mainStore;
        this.OtherStore = OtherStore;
        //status(提现状态 0 审核中 1 区块确认中 2 申请失败 3 申请成功 4 审核不通过 )
    }
    mComponentDidMount = () =>{
        const {state} = this.props.navigation;
        const data = get(state,'params.data','');
        this.OtherStore.getChargeDetail(get(data,'name',''));
    }
    getTime = (time) =>{
        let momentTime= '';
        momentTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
        return momentTime;
    }
    checkData = (data) =>{
        if(data){
            data = data.toFixed(8);
        }
        return data;

    }
  
    renderHeader = () => {
        const {state} = this.props.navigation;
        const data = get(state,'params.data','');
        return (
            <View style={{
                width: getWidth()
            }}>
                <View style={{
                    width: getWidth(),
                    paddingHorizontal: getPixel(20),
                    backgroundColor: '#132141',
                    marginTop: getPixel(7),
                    borderRadius: getPixel(5),
                    paddingTop:getPixel(15)
                }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{get(data,'number','')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(14),
                        marginTop: getPixel(9),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginBottom:getPixel(15)
                    }}>{`= $${get(data,'price')*get(data,'number')}`}</Text>

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
    copyAction = (address) =>{
        Clipboard.setString(address);
       this.showToast(ext('copySuccess')); 
    }
    renderItemFunc = (item) => {
        let statusText = '';
        if (get(item, 'item.status') === 0) {
            statusText = ext('shenhezhong');
        } else if (get(item, 'item.qvkuai') === 1) {
            statusText = ext('qvkuai');
        }else if(get(item,'item.status') === 2){
            statusText = ext('failed')
        }else if(get(item,'item.status') === 3){
            statusText = ext('successful')
        }else if(get(item,'item.status') === 4){
            statusText = ext('reguest')
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
                    }}>{this.checkData(get(item, 'item.number', null))}</Text>
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
                }}>{this.getTime(get(item, 'item.createTime', ''))}</Text>
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
                    }}>{get(item, 'item.address', '')}</Text>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }} onPress={()=>{
                        this.copyAction(get(item, 'item.address', ''))
                        }}>{ext('copy')}</Text>
                </View>
            </View>
        )
    }
    render() {
        const {state} = this.props.navigation;
        const data = get(state,'params.data','');
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: 'rgb(203,201,200)',
            }} forceInset={{top:'never',bottom:'always'}}> 
                <KBFlatList
                    data={toJS(this.OtherStore.chargeArray)}
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
                            this.toScreen('TurnOut',{
                                title:get(data,'name',''),
                                number:get(data,'number',''),
                                price:get(data,'price')
                            })
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
                    {get(data,'name') === 'ETH' ? 
                    <TouchableOpacity style={{
                        borderRadius: getPixel(3),
                        width:getPixel(85),
                        height:getPixel(42),
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#132141'
                    }} activeOpacity={1} onPress={()=>{
                        this.toScreen('Change',{
                            title:get(data,'name','')
                        })
                    }}>
                    <Text style={{
                        color: 'rgb(203,201,200)',
                        fontSize: getPixel(10),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                    }}>{ext('change')}</Text>
                    </TouchableOpacity>:<View/>
                    }
                        
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
                        onPress={()=>{this.toScreen('NewDown',{
                            type:get(data,'name','')
                        })}}>
                        <Text style={{
                            color: 'rgb(203,201,200)',
                            fontSize: getPixel(10),
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}>{ext('in')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BaseHeader title={get(data,'name','')} leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
            </SafeAreaView>
        )
    }
}