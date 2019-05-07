import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image,ImageBackground} from 'react-native';
import { getPixel, getWidth, Svgs, getTitlePixel, BaseHeader, getBottomPixel, KBFlatList } from '../../shared';
import { get } from 'lodash';
import { toJS, observable } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import { SafeAreaView } from 'react-navigation';
import { observer, inject } from 'mobx-react';

 @inject('rootStore')
@observer
export default class AiPanadaOPen extends BaseScreen {
    @observable show = false;
    @observable type = '';
    @observable money = '';
    constructor(props) {
        super(props);
        const { AiPanadaStore } = this.props.rootStore.mainStore;
        this.AiPanadaStore = AiPanadaStore;
    }   
    changeShow = (type,number) => {
        this.show = !this.show;
        this.type = type;
        this.number = number;
    }
    confirm = () =>{
        this.show = false;
        const {onPress} = this.props;
        onPress && onPress();
    }
    render() {
        //type 0开启 1关闭
        const { title,chexiao } = this.props;
        return (
            this.show ?
                <View style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rbga(0,0,0,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: getWidth() - getPixel(60),
                        height: getPixel(323),
                        backgroundColor: '#3B4A75',
                        borderRadius: getPixel(7),
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            bottom:0,
                            right:0,
                            position:'absolute',
                        }} source={require('../assets/sanjiaoxing.png')} />
                        <Text style={{
                            marginTop: getPixel(25),
                            color: 'white',
                            fontSize: getPixel(15),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{title ? title : ext('openAiPanada')}</Text>
                        {chexiao ? 
                        <View style={{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:getPixel(30),
                        }}><Text style={{
                            color:'white',
                            fontSize:getPixel(10),
                            fontWeight:RkTheme.currentTheme.weight.Regular
                        }}>{`${this.type}=${this.number}`}</Text>
                        </View> :<View/>}
                        <TextInput style={[{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            textAlign:'center',
                            marginTop:getPixel(30),
                            color:'white'
                        },chexiao && {marginTop:getPixel(13)}]} 
                        placeholder={ ext('pleaseInputNumber')}
                        placeholderTextColor='white'
                        onChangeText={(text)=>{this.AiPanadaStore.changeNumber(text)}}/>
                        <TextInput style={{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            textAlign:'center',
                            marginTop:getPixel(13),
                            color:'white'
                        }} placeholder={ext('pleaseInputPsd')}
                        placeholderTextColor='white'
                        onChangeText={(text)=>{this.AiPanadaStore.changePsd(text)}}/>
                        <View style={[{
                            width:getWidth()-getPixel(60),
                            paddingHorizontal:getPixel(10),
                            marginTop:getPixel(70),
                            flexDirection:'row',
                            alignItems:'flex-start',
                            justifyContent:'space-between'
                        },chexiao && {marginTop:getPixel(22)}]}>
                        <TouchableOpacity style={{
                            flex:1
                        }} activeOpacity={1}
                        onPress={this.confirm}>
                        <ImageBackground style={{
                            width:(getWidth()-getPixel(90))/2,
                            height:getPixel(55),
                            resizeMode:'stretch'
                        }} source={require('../assets/chengbottom.png')}>
                        <ImageBackground style={{
                            width:(getWidth()-getPixel(90))/2,
                            height:getPixel(50),
                            resizeMode:'stretch',
                            alignItems:'center',
                            justifyContent:'center'
                        }} source={require('../assets/chengup.png')}>
                         <Text style={{
                            color: 'white',
                            fontSize: getPixel(15),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{ext('queren')}</Text>
                        </ImageBackground></ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex:1
                        }} activeOpacity={1}
                        onPress={()=>{this.show = false}}>
                        <ImageBackground style={{
                            width:(getWidth()-getPixel(90))/2,
                            height:getPixel(55),
                            resizeMode:'stretch'
                        }} source={require('../assets/lanbottom.png')}>
                         <ImageBackground style={{
                            width:(getWidth()-getPixel(90))/2,
                            height:getPixel(50),
                            resizeMode:'stretch',
                            alignItems:'center',
                            justifyContent:'center'
                        }} source={require('../assets/lanup.png')}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(15),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{ext('cancel')}</Text>
                        </ImageBackground>
                        </ImageBackground>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View> : <View />
        )
    }
}