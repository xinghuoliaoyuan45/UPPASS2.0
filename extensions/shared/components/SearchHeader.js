import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import {getWidth, getPixel, getTitlePixel, Svgs} from '../../shared';
import {RkTheme} from 'react-native-ui-kitten';
// import { ext } from '../const';

export class SearchHeader extends Component {
    leftPress = () => {
        const {leftPress} = this.props;
        if (leftPress) {
            leftPress();
        }
    }
    rightPress = () => {
        const {rightPress} = this.props;
        if (rightPress) {
            rightPress();
        }
    }

    onFocus = () => {
        const {onFocus} = this.props;
        if (onFocus) {
            onFocus();
        }
    }
    render() {
        const {
            leftType, placeholder, rightName, autoFocus,
        } = this.props;
        return (
            <View style={{
                width: getWidth(),
                height: getPixel(44),
                position: 'absolute',
                top: getTitlePixel(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: getPixel(20),
                borderBottomColor: RkTheme.currentTheme.colors.searchHeaderBottomBorder,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
                {
                    leftType &&
                    <TouchableOpacity onPress={this.leftPress}>
                        <Svgs icon='icon_back'
                            size={getPixel(19)}
                            color={RkTheme.currentTheme.colors.baseHeader}/>
                    </TouchableOpacity>
                }
                <View style={[{
                    flex: 1,
                    backgroundColor: RkTheme.currentTheme.colors.searchTextInputBgColor,
                    height: getPixel(32),
                    flexDirection: 'row',
                    borderRadius: getPixel(6),
                    alignItems: 'center',
                }, leftType && {marginLeft: getPixel(19)},
                rightName && {marginRight: getPixel(18)}]}>
                    <Svgs icon='icon_search'
                        color={RkTheme.currentTheme.colors.searchPlaceholderColor}
                        style={{
                            marginLeft: getPixel(10),
                            marginRight: getPixel(8),
                        }}/>
                    <TextInput style={{
                        height: getPixel(32),
                        color: RkTheme.currentTheme.colors.searchInput,
                        fontSize: RkTheme.currentTheme.fonts.searchInput,
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        flex: 1,
                    }}
                    placeholder={placeholder}
                    numberOfLines={1}
                    placeholderTextColor={RkTheme.currentTheme.colors.searchPlaceholderColor}
                    onFocus={this.onFocus}
                    autoFocus={autoFocus}/>
                </View>
                {
                    rightName &&
                        <Text style={{
                            color: RkTheme.currentTheme.colors.cancel,
                            fontSize: RkTheme.currentTheme.fonts.cancel,
                            fontWeight: RkTheme.currentTheme.weight.Regular,
                        }}
                        onPress={this.rightPress}>{rightName}
                        </Text>
                }
            </View>
        );
    }
}
