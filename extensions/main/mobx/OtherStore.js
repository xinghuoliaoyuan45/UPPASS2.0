import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getQuotation,getSession} from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import {toastRequestError, load,TELPHONE} from '../../shared';
export default class OtherStore extends BaseStore {
    @observable otherData = '';
    
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
    getOtherData = async (successBack) =>{
        this.dataLoading();
        const tel = await load(TELPHONE,'');
        let param = new URLSearchParams()
        param.append('tel',tel);
        getQuotation(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                this.otherData = get(data,'data');
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