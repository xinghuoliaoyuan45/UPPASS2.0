import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { BaseHeader, getTitlePixel, getWidth, getPixel } from '../../shared';
import { get } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
@inject('rootStore')
@observer
export default class ActionSelectedScreen extends BaseScreen {
    render() {
        return (
            <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                <View style={{
                    width: getWidth(),
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{
                        width: getWidth()-getPixel(80),
                        height: getPixel(46),
                        borderRadius: getPixel(11),
                        marginTop: getPixel(150),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'blue',
                    }}
                        activeOpacity={1} onPress={()=>{
                            this.toScreen('NewDown',{
                                type:'ETH'
                            })
                        }}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.allBackground,
                            fontSize: getPixel(16),
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>ETH</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: getWidth()-getPixel(80),
                        height: getPixel(46),
                        borderRadius: getPixel(11),
                        marginTop: getPixel(50),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'blue',
                    }}
                        activeOpacity={1} onPress={()=>{
                            this.toScreen('NewDown',{
                                type:'BTC'
                            })
                        }}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.allBackground,
                            fontSize: getPixel(16),
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>BTC
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: getWidth()-getPixel(80),
                        height: getPixel(46),
                        borderRadius: getPixel(11),
                        marginTop: getPixel(50),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'blue',
                    }}
                        activeOpacity={1} onPress={()=>{
                            this.toScreen('NewDown',{
                                type:'FRBC'
                            })
                        }}>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.allBackground,
                            fontSize: getPixel(16),
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>FRBC
                        </Text>
                    </TouchableOpacity>
                </View>
                <BaseHeader
                    title={ext('jump')}
                    leftType='back'
                    leftPress={this.goBack} />
            </LinearGradient>
        );
    }
}
