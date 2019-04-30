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

// @inject('rootStore')
@observer
export default class AiPanadaOPen extends BaseScreen {
    @observable show = false;
    changeShow = () => {
        this.show = !this.show;
    }
    render() {
        const { title,placeHolder1,placeHolder2,placeHolder3 } = this.props;
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
                        {/* <ImageBackground style={{
                            marginBottom:0,
                            marginRight:0
                        }} source={require('../assets/sanjiaoxing.png')} /> */}
                        <Text style={{
                            marginTop: getPixel(25),
                            color: 'white',
                            fontSize: getPixel(15),
                            fontWeight: RkTheme.currentTheme.weight.Regular
                        }}>{title ? title : ext('openAiPanada')}</Text>
                        <TextInput style={{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            textAlign:'center',
                            marginTop:getPixel(30),
                        }} placeholder={placeHolder1?placeHolder1:
                        ext('pleaseInputNumber')}
                        placeholderTextColor='white'/>
                        <TextInput style={{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            textAlign:'center',
                            marginTop:getPixel(13),
                            color:'white'
                        }} placeholder={placeHolder2?placeHolder2:
                        ext('pleaseInputPsd')}
                        placeholderTextColor='white'/>
                        {placeHolder3 &&
                        <TextInput style={{
                            width:getWidth()-getPixel(70),
                            height:getPixel(41),
                            backgroundColor:'rgb(140,146,161)',
                            textAlign:'center',
                            marginTop:getPixel(13),
                            color:'white'
                        }} placeholder={placeHolder3}
                        placeholderTextColor='white'/>}
                        <View style={[{
                            width:getWidth()-getPixel(60),
                            paddingHorizontal:getPixel(10),
                            marginTop:getPixel(70),
                            flexDirection:'row',
                            alignItems:'flex-start',
                            justifyContent:'space-between'
                        },title===ext('chexiao') && {marginTop:getPixel(22)}]}>
                        <TouchableOpacity style={{
                            flex:1
                        }} activeOpacity={1}
                        onPress={()=>{this.show = false}}>
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