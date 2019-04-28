import React from 'react';
import {TabView} from 'teaset';
import {observer, inject} from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import HomeScreen from './HomeScreen';
import MineScreen from './MineScreen';
import MessageScreen from './MessageScreen';
import PullViewScreen from './PullViewExhibitionScreen';
/*eslint-disable*/
@inject('rootStore')
@observer
class MainScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {MainStore} = this.props.rootStore.mainStore;
        this.MainStore = MainStore;
    }

    mComponentDidMount = () => {
        // save("user", { name: '123' });
        // save("user", { key: '321' });
        // let name = await load("user");
    }

    render() {
        const itemList = [];
        this.MainStore.tabList.forEach((element) => {
            itemList.push(<TabView.Sheet
                key={element.name}
                title={element.name}
                icon={element.icon}
                activeIcon={element.activeIcon}>
                {this.getPage(element.name)}
            </TabView.Sheet>);
        });
        return (
            <TabView style={{flex: 1}} type='projector'>
                {itemList}
            </TabView>
        );
    }

    getPage = (name) => {
        if (name === 'Home') {
            return (<HomeScreen navigation={this.props.navigation}/>);
        }
        if (name === 'Me') {
            return (<MineScreen/>);
        }
        if (name === 'Message') {
            return (<MessageScreen/>);
        }
        if (name === 'PullView') {
            return (<PullViewScreen/>);
        }
        return null;
    }
}
export default MainScreen;
