import React from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import {getWidth, getTitlePixel, getPixel, getVariableHeight, SearchHeader} from '../../shared';
import {RkTheme} from 'react-native-ui-kitten';
import {ext} from '../const';

class NoCompanyScreen extends BaseScreen {
    focus=() => {
        this.toScreen('SearchCompany');
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: RkTheme.currentTheme.colors.allBackground,
            }}>
                <View style={{
                    width: getWidth(),
                    marginTop: getTitlePixel(88),
                    alignItems: 'center',

                }}>
                    <Image style={{
                        width: getWidth() - getPixel(64) * 2,
                        height: getVariableHeight(getWidth() - getPixel(64) * 2, 247, 154),
                        marginTop: getPixel(99),
                        resizeMode: 'stretch',
                    }}
                    source={require('../assets/noCompany.png')}/>
                    <Text style={{
                        color: RkTheme.currentTheme.colors.noCompany,
                        fontSize: RkTheme.currentTheme.fonts.noCompany,
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        width: getWidth() - getPixel(111) * 2,
                        textAlign: 'center',
                        lineHeight: getPixel(20),
                    }}>{ext('noCompany')}
                    </Text>
                </View>
                <SearchHeader leftType={true}
                    placeholder={ext('searchCompany')}
                    onFocus={this.focus}/>
            </View>
        );
    }
}

export default NoCompanyScreen;
