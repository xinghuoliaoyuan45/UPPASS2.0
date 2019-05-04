import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel, KBFlatList } from '../../shared';
import { get } from 'lodash';
import { toJS, observable } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import { SafeAreaView } from 'react-navigation';
import AiPanadaOPen from '../components/AiPanadaOPen';
import { observer, inject } from 'mobx-react';
@inject('rootStore')
@observer
export default class AiPanadaScreen extends BaseScreen {
    @observable id;
    @observable type;
    @observable status;
    constructor(props) {
        super(props);
        const { AiPanadaStore } = this.props.rootStore.mainStore;
        this.AiPanadaStore = AiPanadaStore;
    }
    mComponentDidMount = () => {
        this.AiPanadaStore.getSession(() => {
            this.AiPanadaStore.getAiPanadaData()
        })
    }

    onPress = (id,status,type) =>{
        this.id = id;
        this.type = type;
        let number = '';
        for(let i = 0;i<this.AiPanadaStore.aiPanadaArray.length;i++){
            if(id === get(this.AiPanadaStore.aiPanadaArray[i],'id')){
                number = get(this.AiPanadaStore.aiPanadaArray[i],'number');
            }
        }
        if(status === 0){
            this.status = 1;
            this.refs.aiPanadaOPenChexiao.wrappedInstance.changeShow(type,number);
        }else if(status === 1){
            this.status = 0;
            this.refs.aiPanadaOPen.wrappedInstance.changeShow(type,number);
        }
    }
    renderItemFunc = (item) => {
        let statusText = '';
        let bgColor = '';
        const status = get(item,'item.status','');
        const id = get(item,'item.id','');
        const type = get(item,'item.type','');
        if(status === 0){
            statusText = ext('opened');
            bgColor = 'rgb(108,182,56)';
        }else if(status === 1){
            statusText = ext('closed');
            bgColor = 'rgb(120,119,115)';
        }
        return (
            <View style={[{
                width: getWidth(),
                height: getPixel(60),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141',
                marginTop: getPixel(9),
                borderRadius: getPixel(5)
            },item.index === 0 && {marginTop:getPixel(18)}]}>
                <View style={{
                    width: getWidth() / 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft: getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{type}</Text>
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
                    }}>{statusText}</Text>
                </View>
                <View style={{
                    width: getWidth() / 3,
                    paddingRight: getPixel(20),
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <TouchableOpacity style={{
                        width: getPixel(20),
                        height: getPixel(20),
                        backgroundColor: bgColor,
                        borderRadius: getPixel(10)
                    }} activeOpacity={1} onPress={()=>{this.onPress(id,status,type)}}/>
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
                <KBFlatList data={toJS(this.AiPanadaStore.aiPanadaArray)}
                    renderItem={this.renderItemFunc} />
                <BaseHeader title={ext('shouyi')} leftType='back'
                    leftPress={this.goBack} linearColor={['#132141', '#132141']} />
                <AiPanadaOPen ref='aiPanadaOPen'
                    onPress={this.openConfirm} />
                <AiPanadaOPen ref='aiPanadaOPenChexiao' 
                    title={ext('chexiao')}
                    onPress={this.openConfirm} chexiao={true} />
            </SafeAreaView>
        )
    }
    
    openConfirm = () => {
        this.AiPanadaStore.getSession(() => {
            this.AiPanadaStore.openInvestment(this.id,this.type,this.status,()=>{
                for(let i = 0;i<this.AiPanadaStore.aiPanadaArray.length;i++){
                    if(this.id === get(this.AiPanadaStore.aiPanadaArray[i],'id')){
                        if(this.status === 0){
                            this.AiPanadaStore.aiPanadaArray[i].status = 0;
                        }else if(this.status === 1){
                            if(this.AiPanadaStore.number === 0){
                                console.log('console log for chrom 222',);
                                this.AiPanadaStore.aiPanadaArray[i].status = 1;
                            }
                        }
                        return;
                    }
                }
                this.AiPanadaStore.aiPanadaArray = this.AiPanadaStore.aiPanadaArray.slice();
            })
        })
    }
    // chexiaoConfirm = () => {
    //     this.AiPanadaStore.getSession(() => {
    //         this.AiPanadaStore.openInvestment();
    //     })
    // }
}