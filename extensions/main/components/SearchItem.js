import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {getWidth, getPixel} from '../../shared';
import {RkTheme} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import {get} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {ext} from '../const';
import FastImage from 'react-native-fast-image';

class SearchItem extends BaseScreen {
    render() {
        const {data} = this.props;
        if (get(data, 'logo')) {
            this.logo = get(data, 'logo');
        } else {
            this.logo = 'https://media-dev-ssl.kuban.io/uploads/origanizations/29e6c4a7-af78-4298-8010-2497be6b1c3b.png';
        }
        return (
            <View style={{
                width: getWidth(),
                height: getPixel(97),
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: getPixel(20),
                justifyContent: 'space-between',
            }}>
                <FastImage style={{
                    width: getPixel(70),
                    height: getPixel(70),
                    borderRadius: getPixel(13),
                    borderColor: RkTheme.currentTheme.colors.searchCompanyLogoBorder,
                    borderWidth: StyleSheet.hairlineWidth,
                }}
                source={{uri: this.logo}}/>
                <View style={{
                    height: getPixel(97),
                    flex: 1,
                    borderBottomColor: RkTheme.currentTheme.colors.searchHeaderBottomBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: getPixel(20),
                    justifyContent: 'space-between',
                    marginLeft: getPixel(12),
                }}>
                    <View>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.searchCompanyName,
                            fontSize: RkTheme.currentTheme.fonts.searchCompanyName,
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                        }}>{get(data, 'name')}
                        </Text>
                        <Text style={{
                            color: RkTheme.currentTheme.colors.searchCompanyFullName,
                            fontSize: RkTheme.currentTheme.fonts.searchCompanyFullName,
                            fontWeight: RkTheme.currentTheme.weight.Light,
                            marginTop: getPixel(12),
                        }}>{get(data, 'full_name')}
                        </Text>
                    </View>
                    <View style={{
                        height: getPixel(97),
                        paddingTop: getPixel(20),
                        justifyContent: 'flex-start',
                    }}>
                        {
                            get(data, 'status') === '0' ?
                                (
                                    <LinearGradient style={{
                                        width: getPixel(70),
                                        height: getPixel(28),
                                        borderRadius: getPixel(14),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    colors={[RkTheme.currentTheme.colors.addCompanyGradualStart,
                                        RkTheme.currentTheme.colors.addCompanyGradualEnd]}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}>
                                        <Text style={{
                                            color: RkTheme.currentTheme.colors.allBackground,
                                            fontSize: RkTheme.currentTheme.fonts.searchItemBtnText,
                                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                                        }}>{ext('join')}
                                        </Text>

                                    </LinearGradient>
                                ) :
                                (
                                    <View style={{
                                        width: getPixel(70),
                                        height: getPixel(28),
                                        borderRadius: getPixel(14),
                                        backgroundColor: RkTheme.currentTheme.colors.searchCompanyLogoBorder,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            color: RkTheme.currentTheme.colors.searchItemBtnText,
                                            fontSize: RkTheme.currentTheme.fonts.searchItemBtnText,
                                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                                        }}>{ext('joined')}
                                        </Text>
                                    </View>
                                )

                        }

                    </View>

                </View>
            </View>
        );
    }
}

export default SearchItem;
