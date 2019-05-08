import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { openInvestment,getSession,getAiPanadaData,getNewAiPanadaData } from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';

import { load, USERJWTTOKEN, toastRequestError, TELPHONE } from '../../shared';
export default class AiPanadaStore extends BaseStore{

    @observable number = '';
    @observable psd = '';
    @observable aiPanadaArray = [];
    @observable newAipandaData = '';
    @observable data = [];
    @action 
    changeNumber(number){
        this.number = number
    }
    @action
     changePsd(psd){
         this.psd = psd;
     }

    @action
    clear(){
        this.number = '';
        this.psd = '';
        this.aiPanadaArray = [];
        this.newAipandaData = '';
        this.data = [];
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

    openInvestment = async (id,type,status,successBack) =>{
       let tel = await load(TELPHONE, '');
        let param = new URLSearchParams()
        param.append('tel', tel);
        param.append('number',this.number);
        param.append('paypassword',this.psd);
        param.append('status',status);
        param.append('type',type);
       // status === 1 && param.append('id',id);
        this.dataLoading();
        openInvestment(param).then((res)=>{
            const data = get(res,'data');
            let rspCode = get(data, 'rspCode');
            if(rspCode === '200'){
                this.dataSuccess();
                successBack && successBack();
            }else{
                toastRequestError(data);
                this.dataSuccess();
            }
        }).catch(()=>{
            this.dataSuccess();
            successBack && successBack();
        })
    }

    getAiPanadaData = async (successBack) =>{

        this.dataLoading();
        const id = await load(USERJWTTOKEN,'');
        let param = new URLSearchParams();
        param.append('id',id);
        getAiPanadaData(param).then((res)=>{
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

    getNewAiPanadaData =async (successBack) =>{
        this.dataLoading();
        const tel = await load(TELPHONE,'');
        let param = new URLSearchParams();
        param.append('tel',tel);
        getNewAiPanadaData(param).then((res)=>{
            this.newAipandaData = get(res,'data');
            let rspCode = get(data, 'rspCode');
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