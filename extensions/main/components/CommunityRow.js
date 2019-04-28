import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {getPixel, getWidth} from '../../shared';
import {get} from 'lodash';
import {toJS} from 'mobx';
import {ext} from '../const';
import {RkTheme} from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
/*eslint-disable*/
class CommunityRow extends Component {
    renderItem = () => {
        let {data} = this.props;
        const itemList = [];
        data = toJS(data);
        data.forEach((item, index) => {
            itemList.push(<View key={`space${index}`}
                style={[{width: getPixel(163)},
                    index === 0 ? {marginLeft: getPixel(20)} : {marginLeft: getPixel(9)},
                    index === data.length - 1 ? {marginRight: getPixel(20)} : {}]}>
                <FastImage style={{
                    width: getPixel(163),
                    height: getPixel(123),
                    borderRadius: getPixel(6),
                    backgroundColor: RkTheme.currentTheme.colors.imageBack,
                }}
                source={{uri: this.getImageUrl(get(item, 'images'))}}
                resizeMode={FastImage.resizeMode.stretch}/>
                <Text style={{
                    marginTop: getPixel(12),
                    fontSize: getPixel(11),
                    fontWeight: RkTheme.currentTheme.weight.Semibold,
                    color: RkTheme.currentTheme.colors.communityTitle,
                }}>{get(item, 'space.name')}
                </Text>
                <Text style={{
                    marginTop: getPixel(5),
                    fontSize: getPixel(18),
                    fontWeight: RkTheme.currentTheme.weight.Semibold,
                    color: RkTheme.currentTheme.colors.communityTitle,
                }}
                numberOfLines={1}>{get(item, 'name')}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    height: getPixel(20),
                    marginTop: getPixel(7),
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                }}>
                    {this.getTag(get(item, 'tag_list'))}
                </View>
            </View>);
        });
        return itemList;
    }
    getTag = (tagList) => {
        const itemList = [];
        if (tagList && Array.isArray(tagList) && tagList.length > 0) {
            tagList.forEach((element, index) => {
                itemList.push(<Text style={{
                    fontSize: getPixel(11),
                    fontWeight: RkTheme.currentTheme.weight.Regular,
                    color: '#818386',
                    paddingHorizontal: getPixel(7),
                    paddingVertical: getPixel(5),
                    backgroundColor: '#F4F6F7',
                    borderRadius: getPixel(2),
                    marginLeft: index === 0 ? getPixel(0) : getPixel(6),
                }}>{element}
                </Text>);
            });
        }
        return itemList;
    }

    getColor = () => {

    }

    getImageUrl = (imageList) => {
        if (imageList && Array.isArray(imageList) && imageList.length > 0) {
            return imageList[0];
        }
        return '';
    }

    render() {
        return (
            <View style={{
                width: getWidth(),
            }}>
                <Text style={{
                    marginTop: getPixel(24),
                    marginLeft: getPixel(20),
                    fontSize: getPixel(20),
                    fontWeight: RkTheme.currentTheme.weight.Semibold,
                    color: RkTheme.currentTheme.colors.communityTitle,
                }}>{ext('communitiesRecommend')}
                </Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{marginTop: getPixel(13), width: getWidth()}}>
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }
}

export default CommunityRow;
