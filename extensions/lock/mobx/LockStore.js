import {observable, action} from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import {
    getLocksData,
    getLocksPassword,
    getLocksQRcode,
} from '../connect/request';

export default class LockStore extends BaseStore {
  @observable tabList = [{
      name: 'Scan',
      icon: 'Scan',
      activeIcon: 'Scan',
      iconSize: {width: 26, height: 26},

  },
  {
      name: 'Bluetooth',
      icon: 'Bluetooth',
      activeIcon: 'Bluetooth',
      iconSize: {width: 15, height: 23},

  },
  {
      name: 'QRcode',
      icon: 'QRcode',
      activeIcon: 'QRcode',
      iconSize: {width: 20, height: 20},

  },
  {
      name: 'Open_door_password',
      icon: 'password',
      activeIcon: 'password',
      iconSize: {width: 19, height: 22},

  },
  ];

  @observable locksData=[];
  @observable locksBluetoothData =[];
  @observable locksPasswordData = '';
  @observable locksQRcodeData = '';

  @observable timeCutton = 0;


  @action
  getLockTypeData(spaceID, successBack) {
      this.dataLoading();
      getLocksData({
          'X-space-id': spaceID,
      }).then((res) => {
          this.dataSuccess();
          successBack && successBack(res);
      }).catch(() => {
          this.dataSuccess();
      });
  }

  @action
  setLocksBluetoothData(data) {
      this.locksBluetoothData = (data);
  }

  @action
  getLockPassword(param) {
      this.dataLoading();
      getLocksPassword(param).then((res) => {
          this.dataSuccess();
          console.log(res);
      }).catch(() => {
          this.dataSuccess();
      });
  }

  @action
  getLockQRcode(successBack) {
      this.dataLoading();
      getLocksQRcode().then((res) => {
          this.dataSuccess();
          this.locksQRcodeData = res.data.qr_code;
          successBack && successBack(res);
      }).catch(() => {
          this.dataSuccess();
      });
  }
}
