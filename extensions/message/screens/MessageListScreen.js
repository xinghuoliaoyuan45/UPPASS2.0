import React from 'react';
import {View} from 'react-native';
import {observer, inject} from 'mobx-react';
import {ext} from '../const';
import {RkTheme} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import {KBFlatList, BaseHeader, getTitlePixel} from '../../shared';
import MessageItem from '../components/MessageItem';
@inject('rootStore')
@observer
class MessageListScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {MessageStore} = this.props.rootStore.messageStore;
        this.MessageStore = MessageStore;
    }

    mComponentDidMount=() => {
        this.MessageStore.getMessageList();
    }

    renderItemFunc = item => (
        <MessageItem data={item}/>
    )

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: getTitlePixel(64),
                backgroundColor: RkTheme.currentTheme.colors.allBackground,
            }}>
                <KBFlatList
                    //  onPullRelease={this.onPullRelease}
                    data={this.MessageStore.data}
                    renderItem={this.renderItemFunc}/>
                <BaseHeader
                    leftType='back'
                    title={ext('messageList')}
                    rightType={true}
                    linearColor={[RkTheme.currentTheme.colors.messageListGradualStart,
                        RkTheme.currentTheme.colors.messageListGradualEnd]}/>
            </View>
        );
    }
}

export default MessageListScreen;
