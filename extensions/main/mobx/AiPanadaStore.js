import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { openInvestment,getSession,getAiPanadaData } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN, toastRequestError } from '../../shared';
export default class AiPanadaStore extends BaseStore{

    @observable number = '';
    @observable psd = '';
    @observable aiPanadaArray = [];
    @action 
    changeNumber(number){
        this.number = number
    }
    @action
     changePsd(psd){
         this.psd = psd;
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

    openInvestment = (id,type,status,successBack) =>{
     //  let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
     //   param.append('userId', id);
        param.append('number',this.number);
        param.append('paypassword',this.psd);
        param.append('status',status);
        param.append('type',type);
        status === 1 && param.append('id',id);
        this.dataLoading();
        openInvestment(param).then((res)=>{
            const data = get(res,'data');
            let rspCode = get(data, 'rspCode');
            if(status === 1){
                this.number = 0;
            }
            if(rspCode === '200'){
                console.log('console log for chrom code',);
                this.dataSuccess();
                successBack && successBack();
            }else{
                console.log('console log for chrom oer',);
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(()=>{
            this.dataSuccess();
            successBack && successBack();
        })
    }

    getAiPanadaData = (successBack) =>{
        this.dataLoading();
        getAiPanadaData().then((res)=>{
            const data = get(res,'data');
            let rspCode = get(data, 'rspCode');
            const array = get(data,'data',[]);
            if(array && Array.isArray(array)){
                this.aiPanadaArray = array;
            }
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