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
export default class NewAiPanadaScreen extends BaseScreen {
    @observable id;
    @observable type;
    @observable status;
    constructor(props) {
        super(props);
        const { AiPanadaStore } = this.props.rootStore.mainStore;
        this.AiPanadaStore = AiPanadaStore;
        this.AiPanadaStore.clear();
    }
    mComponentDidMount = () => {
        this.AiPanadaStore.getNewAiPanadaData(()=>{
            const aiETH = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.aiETH',null),8);
            const aiFRBC = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.aiFRBC',null),8);
            const aiBTC = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.aiBTC',null),8);
            const FRBCbalance = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.FRBCbalance',null),8);
            const ETHbalance = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.ETHbalance',null),8);
            const BTCbalance = this.checkdata(get(this.AiPanadaStore.newAipandaData,'data.BTCbalance',null),8);
    
           this.AiPanadaStore.data = [
                {
                    type:"FRBC",
                    balance:FRBCbalance,
                    ai:aiFRBC,
                    id:0
                },
                {
                    type:"BTC",
                    balance:BTCbalance,
                    ai:aiBTC,
                    id:1,
                },
                {
                    type:"ETH",
                    balance:ETHbalance,
                    ai:aiETH,
                    id:2
                }
            ]
        });
    }
    renderItemFunc = (item) => {
        const id = get(item,'item.id','');
        const type = get(item,'item.type','');
        return (
            <View style={[{
                width: getWidth(),
                height: getPixel(80),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#132141',
                marginTop: getPixel(9),
                borderRadius: getPixel(5)
            },item.index === 0 && {marginTop:getPixel(18)}]}>
                <View style={{
                    width: getWidth() / 4,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: getPixel(50),
                    paddingLeft: getPixel(20)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular
                    }}>{get(item,'item.type')}</Text>
                </View>
                <View style={{
                    flex:1,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: getPixel(50),
                    
                }}>
                <View style={{
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'flex-start'
                }}>
                 <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        width:getPixel(60)
                    }}>PANDA</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginLeft:getPixel(20)
                    }}>{get(item,'item.ai')}</Text>
                </View>
                <View style={{
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'flex-start',
                     marginTop:getPixel(10)
                }}>
                 <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        width:getPixel(60)
                    }}>{ext('xianhuo')}</Text>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginLeft:getPixel(20)
                    }}>{get(item,'item.balance')}</Text>
                </View>
                </View>
                <View style={{
                    width: getWidth() / 4,
                    paddingRight: getPixel(20),
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: getPixel(50)
                }}>
                    <Text style={{
                       color: 'white',
                       fontSize: getPixel(14),
                       fontWeight: RkTheme.currentTheme.weight.Regular,
                    }}onPress={()=>{this.licai(id,type)}} >{ext('licai')}
                    </Text>
                    <Text style={{
                       color: 'white',
                       fontSize: getPixel(14),
                       marginTop:getPixel(10),
                       fontWeight: RkTheme.currentTheme.weight.Regular,
                    }} onPress={()=>{this.chehui(id,type)}}>{ext('chehui')}
                    </Text>
                </View>
            </View>
        )
    }
    chehui = (id,type) =>{
        this.id = id;
        this.type = type;
        let ai = '';
        for(let i = 0;i<this.AiPanadaStore.data .length;i++){
            if(id === get(this.AiPanadaStore.data[i],'id')){
                ai = get(this.AiPanadaStore.data[i],'ai',0);
            }
        }
        this.status = 1;
        this.refs.aiPanadaOPenChexiao.wrappedInstance.changeShow(type,ai);
    }
    licai = (id,type) =>{
        let number = 0;
        this.id = id;
        this.type = type;
        this.status = 0;
        this.refs.aiPanadaOPen.wrappedInstance.changeShow(type,number);
     
    }
    checkdata = (data,number) =>{
        if(data){
            data = data.toFixed(number);
        }else{
            data = 0;
        }
        return data;
    }
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: 'rgb(203,201,200)',
            }} forceInset={{ top: 'never', bottom: 'always' }}>
                <KBFlatList data={toJS(this.AiPanadaStore.data)}
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
        this.AiPanadaStore.openInvestment(this.id,this.type,this.status,()=>{
            if(this.status === 0){
                for(let i = 0;i<this.AiPanadaStore.data.length;i++){
                    if(this.id === get(this.AiPanadaStore.data[i],'id')){
                        this.AiPanadaStore.data[i].ai = this.checkdata(parseFloat(this.AiPanadaStore.data[i].ai) + parseFloat(this.AiPanadaStore.number),8);
                        this.AiPanadaStore.data[i].balance = this.checkdata(parseFloat(this.AiPanadaStore.data[i].balance) - parseFloat(this.AiPanadaStore.number),8);
                    }
                }
            }else{
                for(let i = 0;i<this.AiPanadaStore.data.length;i++){
                    if(this.id === get(this.AiPanadaStore.data[i],'id')){
                        this.AiPanadaStore.data[i].ai = this.checkdata(parseFloat(this.AiPanadaStore.data[i].ai) - parseFloat(this.AiPanadaStore.number),8);
                        this.AiPanadaStore.data[i].balance = this.checkdata(parseFloat(this.AiPanadaStore.data[i].balance) + parseFloat(this.AiPanadaStore.number),8);
                       
                    }
                }
            }
           
            this.AiPanadaStore.data  = this.AiPanadaStore.data.slice();
        })
    }
    
}