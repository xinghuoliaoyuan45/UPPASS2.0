import {observable, action} from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import {getCompanyList} from '../connect/request';
import {get} from 'lodash';

export default class CompaniesStore extends BaseStore {
    @observable companyList = [];

    @action
    getCompanyList(successBack) {
        this.dataLoading();
        getCompanyList().then((res) => {
            this.companyList = get(res, 'data');
            this.dataSuccess();
            successBack && successBack();
        }).catch(() => {
            this.dataSuccess();
        });
    }
}
