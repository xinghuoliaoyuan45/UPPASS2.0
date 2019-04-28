import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseScreen from '../../BaseScreen';
import {getPixel} from '../../shared';
import {get} from 'lodash';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import {RkTheme} from 'react-native-ui-kitten';
@inject('rootStore')
@observer
class SegmentedTitle extends BaseScreen {
    @observable cityName = '';
    @observable index = '';
    constructor(props) {
        super(props);
        const {SegmentedStore} = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }

    componentDidMount() {
        const {data, index} = this.props;
        this.cityName = get(data, 'cityName');
        this.index = index;
    }


    render() {
        return (
            <View style={[{
                marginHorizontal: getPixel(12),
                height: getPixel(29),
            }, this.index === this.SegmentedStore.selectTab ? {
                borderBottomWidth: getPixel(3),
                borderBottomColor: RkTheme.currentTheme.colors.spaceNumber,
            } : {}]}>
                <Text style={[{
                    color: RkTheme.currentTheme.colors.spaceNumber,
                    fontSize: getPixel(17),
                }, this.index === this.SegmentedStore.selectTab ?
                    {fontWeight: RkTheme.currentTheme.weight.Semibold} :
                    {fontWeight: RkTheme.currentTheme.weight.Light},
                ]}>{this.cityName}
                </Text>
            </View>
        );
    }
}

export default SegmentedTitle;
