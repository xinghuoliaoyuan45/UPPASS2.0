import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getAccountInfo, sendMoney, getGameList, USER_PART_IN_LIST, USER_STATISTICAL } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN } from '../../shared';
export default class GameStore extends BaseStore {
    @observable data = [];
    @observable resultList = [];
    @observable listTitle = null;

    getListTilte = async (successBack) => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id)
        this.dataLoading();
        USER_STATISTICAL(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                // this.userInfo = get(data, 'data');
                // this.showToast('操作成功');
                this.listTitle = get(data, 'data');
                this.dataSuccess();
                successBack && successBack();
            } else {
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(() => {
            this.dataSuccess();
        });
    }

    getGameResultList = async (gameid, successBack) => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id)
        param.append('gameId', gameid)
        this.dataLoading();
        USER_PART_IN_LIST(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                // this.userInfo = get(data, 'data');
                // this.showToast('操作成功');
                this.resultList = get(data, 'data.content');
                this.dataSuccess();
                successBack && successBack();
            } else {
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(() => {
            this.dataSuccess();
        });
    }

    getGameList = async (sortType, sortDir, successBack) => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('userId', id)
        param.append('sortType', sortType)
        param.append('sortDir', sortDir)
        this.dataLoading();
        getGameList(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                // this.userInfo = get(data, 'data');
                // this.showToast('操作成功');
                this.data = get(data, 'data.content');
                this.dataSuccess();
                successBack && successBack();
            } else {
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(() => {
            this.dataSuccess();
        });
    }
}