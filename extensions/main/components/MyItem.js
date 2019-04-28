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
class MyItem extends BaseScreen {

    renderItem = () => {
        let data = [
            {
                name: ext('languagesetting'), image: 'icon_language',
                screen: 'Language'
            },
            { name: ext('loginpwd'), image: 'icon_yaoshi', screen: 'SettingPwd' },

            { name: ext('paypwd'), image: 'icon_yinhangka', screen: 'SettingPayPwd' },
            { name: ext('message'), image: 'icon_laba', screen: 'Becareful' },


            { name: ext('m_find'), image: 'icon_bank', screen: '' },
            { name: ext('m_regist'), image: 'icon_lou', screen: '' },
            { name: ext('m_pay'), image: 'icon_xin', screen: '' },
            { name: ext('hierarchy'), image: 'icon_cengji', screen: 'Hierarchy' },
        ];
        const itemList = [];
        data = toJS(data);
        data.forEach((item, index) => {
            let top = 0;
            if (index === 2 || index === 4) {
                top = getPixel(25);
            }
            itemList.push(<TouchableOpacity
                onPress={() => {
                    if (item.screen) {
                        this.toScreen(item.screen)
                    } else {
                        this.showToast('待开发');
                    }
                }} key={`space${index}`}
                style={{
                    width: getWidth(),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: getPixel(20),
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    height: getPixel(50),
                    marginTop: top
                }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Svgs icon={item.image} color={'#f0a100'}
                        size={getPixel(23)} />
                    <Text style={{
                        fontSize: getPixel(16),
                        color: 'black',
                        marginLeft: getPixel(22)
                    }}>{item.name}
                    </Text>
                </View>
                <Svgs icon={'icon_rightArrow'} color={'rgba(0,0,0,0.3)'}
                    size={getPixel(13)} />
                <View style={{
                    width:getWidth()-getPixel(40),
                    height:StyleSheet.hairlineWidth,
                    backgroundColor:'rgba(0,0,0,0.3)',
                    position:'absolute',
                    bottom:0,
                    left:getPixel(20)
                }}></View>
            </TouchableOpacity>);
        });
        return (<View style={{
            width: getWidth(),
        }}>{itemList}
        </View>);
    }

    render() {
        return (
            <View style={{
                width: getWidth(),
            }}>
                {this.renderItem()}
            </View>
        );
    }
}

export default MyItem;
