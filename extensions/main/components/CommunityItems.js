import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import {getPixel, getWidth, getVariableHeight} from '../../shared';
import {get} from 'lodash';
import {RkTheme} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
class CommunityItems extends BaseScreen {
    constructor(props) {
        super(props);
        this.tagList = ['高端大气', '有餐饮', '金碧辉煌'];
    }
    tagListFunc = () => {
        const tagNodes = this.tagList.map((data, index) => {
            if (data === '高端大气') {
                this.bgColor = ['#615FEC', '#C86DD7'];
            } else if (data === '有餐饮') {
                this.bgColor = ['#FAD961', '#F76B1C'];
            } else {
                this.bgColor = ['#615FEC', '#C86DD7'];
            }
            return (
                <LinearGradient style={[{
                    marginLeft: getPixel(8),
                    borderTopLeftRadius: getPixel(15),
                    borderTopRightRadius: getPixel(2),
                    borderBottomLeftRadius: getPixel(2),
                    borderBottomRightRadius: getPixel(15),
                }, index === 0 && {marginLeft: getPixel(14)},
                ]}
                colors={this.bgColor}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                key={index}>
                    <Text style={{
                        color: RkTheme.currentTheme.colors.communityItemTagtext,
                        fontSize: RkTheme.currentTheme.fonts.communityItemTagtext,
                        fontWeight: RkTheme.currentTheme.weight.Regular,
                        marginHorizontal: getPixel(10),
                        marginVertical: getPixel(8),
                    }}>{data}
                    </Text>
                </LinearGradient>
            );
        });
        return (
            <View style={{
                flexDirection: 'row',
                width: getWidth() - getPixel(40),
                marginTop: getPixel(12),
            }}>
                {tagNodes}
            </View>
        );
    }

    render() {
        const {data} = this.props;
        const price = get(data, 'price_range');
        return (
            <View style={{
                width: getWidth(),
                alignItems: 'center',
            }}>
                <View style={{
                    width: getWidth() - getPixel(20) * 2,
                    // height:getPixel(262),
                    marginTop: getPixel(16),
                    borderRadius: getPixel(6),
                    backgroundColor: RkTheme.currentTheme.colors.allBackground,
                    borderColor: RkTheme.currentTheme.colors.communityItemBorderColor,
                    borderWidth: getPixel(1),
                    shadowColor: RkTheme.currentTheme.colors.baseHeader,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.06,
                }}>
                    <FastImage style={{
                        width: getWidth() - getPixel(21) * 2,
                        height: getVariableHeight(getWidth() - getPixel(21) * 2, 335, 175),
                        borderTopLeftRadius: getPixel(6),
                        borderTopRightRadius: getPixel(6),
                    }}
                    source={{
                        uri: get(
                            data, 'images[0]',
                            'https://media-dev-ssl.kuban.io/uploads/test/258de4d0-ba13-4af7-aa62-c281938c6f80.jpg',
                        ),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}>
                        <LinearGradient style={{
                            width: getWidth() - getPixel(40),
                            height: getVariableHeight(getWidth() - getPixel(40), 335, 53),
                        }}
                        colors={[RkTheme.currentTheme.colors.blackTransparent,
                            RkTheme.currentTheme.colors.grayTransparent]}>
                            {this.tagListFunc()}
                        </LinearGradient>
                    </FastImage>
                    <Text style={{
                        color: RkTheme.currentTheme.colors.communityItemName,
                        fontSize: RkTheme.currentTheme.fonts.communityItemName,
                        fontWeight: RkTheme.currentTheme.weight.Semibold,
                        marginLeft: getPixel(14),
                        marginTop: getPixel(10),
                    }}
                    numberOfLines={1}>{get(data, 'name')}
                    </Text>
                    <Text style={[{
                        color: RkTheme.currentTheme.colors.communityItemAddress,
                        fontSize: RkTheme.currentTheme.fonts.communityItemAddress,
                        fontWeight: RkTheme.currentTheme.weight.Light,
                        marginLeft: getPixel(14),
                        marginTop: getPixel(6),
                    },
                    !price && {marginBottom: getPixel(21)},
                    ]}
                    numberOfLines={1}>{get(data, 'physical_address')}
                    </Text>
                    {
                        price &&
                        <Text style={{
                            color: RkTheme.currentTheme.colors.communityItemPrice,
                            fontSize: RkTheme.currentTheme.fonts.communityItemPrice,
                            fontWeight: RkTheme.currentTheme.weight.Semibold,
                            marginLeft: getPixel(14),
                            marginTop: getPixel(9),
                            marginBottom: getPixel(17),
                        }}
                        numberOfLines={1}>{get(data, 'price_range')}
                        </Text>
                    }
                </View>
            </View>
        );
    }
}

export default CommunityItems;
