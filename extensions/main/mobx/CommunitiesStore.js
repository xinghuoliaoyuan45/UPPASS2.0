import {observable, action} from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import {getLocations} from '../connect/request';
import {get} from 'lodash';

export default class CommunitiesStore extends BaseStore {
    @observable CommunitiesStore = [];

    @action
    getLocations(successBack) {
        this.dataLoading();
        getLocations().then((res) => {
            this.communitiesList = get(res, 'data');
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }
}
