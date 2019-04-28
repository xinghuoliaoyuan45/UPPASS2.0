import React from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import { getPixel, getWidth, getVariableHeight } from '../../shared';
import { get } from 'lodash';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { toJS } from 'mobx';
class SpaceItems extends BaseScreen {


    renderTime = (date) => {
        let dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }

    render() {
        let { data } = this.props;
        let item = toJS(data.item);
        return (
            <View style={{
                width: getWidth(),
                marginHorizontal: getPixel(14),
                marginTop: getPixel(12),
                borderRadius: getPixel(10),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        marginTop:getPixel(20),
                        marginBottom:getPixel(20)
                    }}>{item.updateAt}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: getPixel(14),
                        marginTop:getPixel(20),
                        marginBottom:getPixel(20)
                    }}>{item.transactionAmount}</Text>
                </View>
                <View style={{
                    position:'absolute',
                    height:1,
                    width:getWidth(),
                    backgroundColor:'white',
                    bottom:0
                }}></View>
            </View>
        );
    }
}

export default SpaceItems;
