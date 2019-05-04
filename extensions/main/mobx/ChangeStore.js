import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { frbcChangeETH,getSession,getChangeData } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN, toastRequestError, TELPHONE } from '../../shared';
export default class ChangeStore extends BaseStore{
    @observable  frbcNumber = '';
    @observable psd = '';
    @observable changeData = '';
    @observable ethNumber = null;
    @action
    changeFrnbNumber(number){
        this.frbcNumber = number;
    }
    @action
    changePsd(psd){
        this.psd = psd;
    }
    @action 
    changeEthNUmber(number){
        if(number){
            this.ethNumber = number;
        }else if(number === ''){
            this.ethNumber = null;
        }
    }
 
    getSession = (successBack) =>{
        this.dataLoading();
        let param = new URLSearchParams()
        param.append('id',2)
        getSession(param).then((res)=>{
            this.dataSuccess();
            successBack && successBack();
        }).catch(()=>{
            successBack && successBack();
        })
    }
    getChangeData = async(successBack)=>{
        this.dataLoading();
        const tel = await load(TELPHONE,'');
        let param = new URLSearchParams();
        param.append('tel',tel);
        getChangeData(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                this.changeData = get(data,'data');
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

    change = async(successBack) =>{
        this.dataLoading();
        const tel = await load(TELPHONE,'');
        let param = new URLSearchParams()
        param.append('FRBCNum',this.frbcNumber);
        param.append('password',this.psd);
        param.append('tel',tel);
        frbcChangeETH(param).then((res)=>{
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