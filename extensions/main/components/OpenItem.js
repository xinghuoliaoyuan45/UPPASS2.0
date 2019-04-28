import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getPixel, getWidth, Svgs } from '../../shared';
import { get } from 'lodash';
import { toJS, observable } from 'mobx';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import BaseScreen from '../../BaseScreen';
import { getGameInfo } from '../connect/request';

/*eslint-disable*/
class OpenItem extends BaseScreen {
    @observable game = {};
    getGameInfo = () => {
        let { id } = this.props;
        let param = new URLSearchParams()
        param.append('id', id)
        getGameInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.game = data;
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    componentDidMount() {
        this.getGameInfo();
    }

    renderItem = () => {
        let result = get(this.game, 'data.instance.results', 0);
        if (result == 1) {
            result = ext('yes');
        } else {
            result = ext('no');
        }
        let data = [
            {
                name: ext('openTime'), image: 'icon_huandai',
                screen: '', right: get(this.game, 'data.instance.lotteryTime', '')
            },

            {
                name: ext('openMoney'), image: 'icon_gouwuche',
                screen: '', right: get(this.game, 'data.jackpotAmount', '')
            },
            {
                name: ext('openNumber'), image: 'icon_man',
                screen: '', right: get(this.game, 'data.winningNumber', '')+ext('ming')
            },

            {
                name: ext('openStatus'), image: 'icon_meijin', screen: '',
                right: result
            },

        ];
        const itemList = [];
        data = toJS(data);
        data.forEach((item, index) => {
            let top = 0;
            if (index === 2 || index === 4) {
                top = getPixel(25);
            }
            itemList.push(<View
                key={`space${index}`}
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
                <Text style={{
                    fontSize: getPixel(16),
                    color: 'rgba(0,0,0,0.5)',
                    marginLeft: getPixel(22)
                }}>{item.right}
                </Text>
                <View style={{
                    width: getWidth() - getPixel(40),
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    position: 'absolute',
                    bottom: 0,
                    left: getPixel(20)
                }}></View>
            </View>);
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

export default OpenItem;
