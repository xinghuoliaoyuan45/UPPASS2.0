import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getPixel, getWidth, Svgs } from '../../shared';
import { get } from 'lodash';
import { toJS } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
/*eslint-disable*/
class CommunitySpace extends BaseScreen {

    renderItem = () => {
        let data = [
            { name: ext('send'), image: 'icon_upload', screen: 'Upload' },
            { name: ext('download'), image: 'icon_down', screen: 'Down' },
            // { name: ext('checkoutcredit'), image: 'icon_qiehuan', screen: 'Checkout' },
            { name: 'UPDOWN', image: 'icon_shangxia', screen: 'GameList' },
            { name: ext('game'), image: 'icon_game', screen: '' },
            { name: ext('ico'), image: 'icon_meijin', screen: '' },
            { name: 'UPS', image: 'icon_cards', screen: '' },
            { name: ext('Share'), image: 'fenxiang', screen: 'Share' },
            { name: ext('buyPass'), image: 'geiqian', screen: '' },
            { name: ext('shangcheng'), image: 'shangdian', screen: '' },
            { name: '', image: '', screen: '' },
        ];
        const itemList = [];
        data = toJS(data);
        data.forEach((item, index) => {
            itemList.push(<View key={`space${index}`} style={{ width: getPixel(105), alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    if (item.screen) {
                        this.toScreen(item.screen)
                    } else {
                        this.showToast('待开发');
                    }
                }} style={{
                    width: getPixel(100),
                    height: getPixel(100),
                    marginTop: getPixel(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',

                }}>
                    {item.image === '' ? <View /> :
                     <Svgs icon={item.image} color={'#f0a100'} size={getPixel(25)} />}

                    <Text style={{
                        fontSize: getPixel(14),
                        marginTop: getPixel(10),
                        color: RkTheme.currentTheme.colors.searchCompanyName,
                    }}>{item.name}
                    </Text>
                </TouchableOpacity>
            </View>);
        });
        return (<View style={{
            width: getWidth(),
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: getPixel(20),
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginBottom: getPixel(30),
            backgroundColor: 'white'
        }}>{itemList}
        </View>);
    }

    render() {
        return (
            <View style={{
                marginTop: getPixel(10),
                flex:1,
                backgroundColor:'white'
            }}>
                {this.renderItem()}
            </View>
        );
    }
}

export default CommunitySpace;
