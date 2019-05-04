import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { turnOut } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN, toastRequestError, TELPHONE } from '../../shared';
export default class TurnOutStore extends BaseStore{
    @observable  number = '';
    @observable psd = '';
    @observable address = '2NC3wrmYksSRHobmXb6bBj8fAd3k1NsxkKD';
    @action
    changeNumber(number){
        if(number){
            this.number = number;
        }else if(number === ''){
            this.number = null;
        }
    }
    @action
    changePsd(psd){
        this.psd = psd;
    }
    @action 
    changeAddress(address){
        this.address = address;
    }
    turnOut = async(type,successBack) =>{
        this.dataLoading();
        const tel = await load(TELPHONE,'');
        let param = new URLSearchParams()
        param.append('type',type);
        param.append('number',this.number);
        param.append('address',this.address);
        param.append('password',this.psd);
        param.append('tel',tel);
        turnOut(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                this.dataSuccess();
                successBack && successBack();
            }else{
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(()=>{
            successBack && successBack();
          })
       
    } 
}