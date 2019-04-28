import { observable, computed, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';

export default class TestStore extends BaseStore {

  @observable number = 123;

  @action
  reduce() {
    this.number = this.number-1;
  }

  @action
  add() {
    this.number = this.number+1;
  }
}
