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
class HierarchyItem1 extends BaseScreen {

    renderItem = () => {
        let { bottomList1, bottomList } = this.props;
        const itemList = [];
        let data = toJS(bottomList);
      
        data.forEach((item, index) => {
            itemList.push(<View key={`space${index}`}
                style={{
                    width: getWidth(),
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    height: getPixel(47),
                }}>
                <View style={{
                    width: getPixel(110),
                    height: getPixel(47),
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: getPixel(16),
                        color: '#000',
                        fontWeight: 'bold',
                        marginLeft: getPixel(13)
                    }}>{index + 1}</Text>

                    <Text style={{
                        fontSize: getPixel(16),
                        color: '#000',
                        fontWeight: 'bold',
                        marginLeft: getPixel(23)
                    }}>{ext('yiji')}</Text>
                </View>
                <View style={{
                    width: getPixel(110),
                    height: getPixel(47),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: getPixel(13),
                        color: '#000',
                        marginLeft: getPixel(23)
                    }}>{item.account.userName}</Text>
                </View>
                <View style={{
                    width: getWidth() - getPixel(220),
                    height: getPixel(47),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: getPixel(13),
                        color: '#000',
                        marginLeft: getPixel(20),
                    }}>{item.account.updateAt}</Text>
                </View>
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
        let data1 = toJS(bottomList1);
        data1.forEach((item, index) => {
            itemList.push(<View key={`space${index}`}
                style={{
                    width: getWidth(),
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    height: getPixel(47),
                }}>
                <View style={{
                    width: getPixel(110),
                    height: getPixel(47),
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: getPixel(16),
                        color: '#000',
                        fontWeight: 'bold',
                        marginLeft: getPixel(13)
                    }}>{index + 1}</Text>

                    <Text style={{
                        fontSize: getPixel(16),
                        color: '#000',
                        fontWeight: 'bold',
                        marginLeft: getPixel(23)
                    }}>{ext('erji')}</Text>
                </View>
                <View style={{
                    width: getPixel(110),
                    height: getPixel(47),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: getPixel(13),
                        color: '#000',
                        marginLeft: getPixel(23)
                    }}>{item.account.userName}</Text>
                </View>
                <View style={{
                    width: getWidth() - getPixel(220),
                    height: getPixel(47),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: getPixel(13),
                        color: '#000',
                        marginLeft: getPixel(20),
                    }}>{item.account.updateAt}</Text>
                </View>
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
    renderTime = (date) => {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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

export default HierarchyItem1;
