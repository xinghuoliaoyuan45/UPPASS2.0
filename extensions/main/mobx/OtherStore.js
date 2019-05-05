import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { getQuotation,getSession,getChargeDetail} from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import {toastRequestError, load,TELPHONE, USERJWTTOKEN} from '../../shared';
export default class OtherStore extends BaseStore {
    @observable otherData = '';
    @observable chargeArray = [];
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
    getChargeDetail = async(type,successBack)=>{
        this.dataLoading();
        const id = await load(USERJWTTOKEN,'');
        let param = new URLSearchParams()
        param.append('id',id);
        param.append('limit',1);
        param.append('currencyType',type)
        getChargeDetail(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                const content = get(data,'data.content',[]);
                if(content && Array.isArray(content)){
                    this.chargeArray = content;
                }else{
                    this.chargeArray.push(content);
                }
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