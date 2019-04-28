import { observable, computed, action } from 'mobx';
import {
  DeviceEventEmitter
} from 'react-native';
export const LOADING = 'LOADING_STATUS';
export const NULL = 'NULL_STATUS';
export const ERROR = 'ERROR_STATUS';
export default class BaseStore {

  @observable screenStatus = '';

  @action
  dataLoading() {
    this.screenStatus = LOADING;
  }
  @action
  dataNull() {
    this.screenStatus = NULL;
  }
  @action
  dataError() {
    this.screenStatus = ERROR;
  }
  @action
  dataSuccess() {
    this.screenStatus = '';
  }
  @action
  showToast(msg) {
    DeviceEventEmitter.emit('showToast', msg);
  }
}
