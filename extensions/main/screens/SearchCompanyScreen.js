import React from 'react';
import {View} from 'react-native';
import BaseScreen from '../../BaseScreen';
import {getTitlePixel, SearchHeader, KBFlatList} from '../../shared';
import {RkTheme} from 'react-native-ui-kitten';
import SearchItem from '../components/SearchItem';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

@inject('rootStore')
@observer

class SearchCompanyScreen extends BaseScreen {
  @observable data = [];
  constructor(props) {
      super(props);
      const {CompaniesStore} = this.props.rootStore.mainStore;
      this.CompaniesStore = CompaniesStore;
      this.CompaniesStore.getCompanyList(() => {
          this.data = this.CompaniesStore.companyList;
      });
  }
    renderItemFunc=({item}) => (
        <SearchItem data={item}/>
    )
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: RkTheme.currentTheme.colors.allBackground,
            }}>
                <KBFlatList style={{
                    flex: 1,
                    marginTop: getTitlePixel(68),
                }}
                s
                onPullRelease={this.onPullRelease}
                data={this.data}
                renderItem={this.renderItemFunc}/>
                <SearchHeader
                    rightName='取消'
                    rightPress={this.goBack}
                    autoFocus={true}/>
            </View>
        );
    }
}

export default SearchCompanyScreen;
