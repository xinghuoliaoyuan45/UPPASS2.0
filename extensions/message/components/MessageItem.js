import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import {getPixel, getWidth} from '../../shared';
import {get} from 'lodash';
import {RkTheme} from 'react-native-ui-kitten';
export default class MessageItem extends BaseScreen {
    render() {
        const {data} = this.props;
        console.log('console log for chrom data', data);
        const title = get(data, 'item.title');
        return (
            <View style={{
                width: getWidth() - getPixel(20),
                borderBottomColor: RkTheme.currentTheme.colors.searchHeaderBottomBorder,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginLeft: getPixel(20),
                paddingRight: getPixel(20),
            }}>
                <Text style={{
                    color: RkTheme.currentTheme.colors.communityItemName,
                    fontSize: getPixel(18),
                    marginTop: getPixel(20),
                    fontWeight: RkTheme.currentTheme.weight.Semibold,
                }}
                numberOfLines={1}>{title}
                </Text>
                <Text style={{
                    color: RkTheme.currentTheme.colors.communityItemName,
                    fontSize: getPixel(15),
                    marginTop: getPixel(10),
                    fontWeight: RkTheme.currentTheme.weight.Light,
                    lineHeight: getPixel(21),
                }}
                numberOfLines={4}>2019年归投资论坛”为全面贯彻执行党的
                </Text>
                <View style={{
                    flexDirection: 'row',
                    height: getPixel(42),
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: getPixel(10),
                }}>
                    <Text style={{
                        color: RkTheme.currentTheme.colors.searchCompanyFullName,
                        fontSize: getPixel(12),
                        fontWeight: RkTheme.currentTheme.weight.Light,
                    }}>23分钟
                    </Text>
                </View>
            </View>
        );
    }
}
