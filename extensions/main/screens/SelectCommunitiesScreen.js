import React from 'react';
import {View} from 'react-native';
import {observer, inject} from 'mobx-react';
import {ext} from '../const';
import {RkTheme} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import CommunityItems from '../components/CommunityItems';

import {BaseHeader, getTitlePixel, PullFlatList} from '../../shared';
import {observable} from 'mobx';

@inject('rootStore')
@observer

class SelectCommunitiesScreen extends BaseScreen {
    @observable data = [];
    constructor(props) {
        super(props);
        const {CommunitiesStore} = this.props.rootStore.mainStore;
        this.CommunitiesStore = CommunitiesStore;
        this.CommunitiesStore.getLocations(() => {
            this.data = this.CommunitiesStore.communitiesList;
        });
        //   this.onPullRelease = this.onPullRelease.bind(this);
    }
    renderItemFunc = ({item}) => (
        <CommunityItems data={item}/>
    )
    onPullRelease = (resolve) => {
        this.CommunitiesStore.getLocations(() => {
            this.data = this.CommunitiesStore.communitiesList;
            resolve();
        });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: RkTheme.currentTheme.colors.allBackground,
            }}>
                <PullFlatList
                    onPullRelease={this.onPullRelease}
                    data={this.data}
                    renderItem={this.renderItemFunc}/>
                {this.renderStatusView(this.CommunitiesStore.screenStatus)}
                <BaseHeader leftType='back'
                    leftPress={this.goBack}
                    title={ext('selectCommunities')}
                    strapStyle={{backgroundColor: RkTheme.currentTheme.colors.allBackground}}/>
            </View>
        );
    }
}

export default SelectCommunitiesScreen;
