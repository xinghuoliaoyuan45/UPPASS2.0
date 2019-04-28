import {observable, action} from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import {getMessageList} from '../connect/request';
import {get} from 'lodash';

export default class MessageStore extends BaseStore {
    @observable data = [];
    @observable page = 1;
    @observable perPage = 10;
    @observable unRead = 0;

    @action
    getMessageList(successBack) {
        this.dataLoading();
        getMessageList().then((res) => {
            this.unRead = get(res, 'data.unread_count', 0);
            const activities = get(res, 'data.activities', []);
            if (activities && Array.isArray(activities)) {
                if (this.page === 1) {
                    this.data = activities;
                } else {
                    this.data.push(activities);
                }
            }
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }
}
