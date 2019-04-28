import {observable, action} from 'mobx';
import BaseStore from '../../mobx/BaseStore';

export default class MainStore extends BaseStore {
    @observable tabList = [{
        name: 'Home',
        icon: require('../assets/unhome.png'),
        activeIcon: require('../assets/home.jpg'),
    },
    {
        name: 'Me',
        icon: require('../assets/unmine.jpg'),
        activeIcon: require('../assets/mine.jpg'),
    },
    {
        name: 'PullView',
        icon: require('../assets/unmine.jpg'),
        activeIcon: require('../assets/mine.jpg'),
    },
    ];


    @action
    reduce() {
        if (this.tabList.length >= 3) {
            this.tabList.splice(this.tabList.length - 1, 1);
        }
    }

    @action
    add() {
        if (this.tabList.length < 3) {
            this.tabList.push({
                name: 'Message',
                icon: require('../assets/unmessage.jpeg'),
                activeIcon: require('../assets/message.png'),
            });
        }
    }

    @action
    isCancelFunc() {
        console.log('console log for chrom 点击了取消');
    }

    @action
    isSubmitFunc() {
        console.log('console log for chrom 点击了确定');
    }
}

