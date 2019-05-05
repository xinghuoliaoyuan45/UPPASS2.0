import { observable, action } from 'mobx';
import BaseStore from '../../mobx/BaseStore';
import { produresUserList,getSession,getProfitData} from '../connect/request';
import { get } from 'lodash';
import 'url-search-params-polyfill';
import {toastRequestError, load, USERJWTTOKEN} from '../../shared';
export default class ShouyiStore extends BaseStore {
    @observable profitData = '';
    @observable content = [];
    getSession = async(successBack) =>{
        this.dataLoading();
        let param = new URLSearchParams()
        param.append('id',2)
        getSession(param).then((res)=>{
            console.log('console log for chrom sessionres---',res);
            this.dataSuccess();
            successBack && successBack();
        }).catch(()=>{
            successBack && successBack();
        })
    }
    produresUserList = async(successBack) =>{
        this.dataLoading();
        const id = await load(USERJWTTOKEN,'');
        let param = new URLSearchParams();
        param.append('id',id);
        produresUserList(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                this.content = get(data,'data.content',[]);
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
    gtProfitData = async(successBack)=>{
        this.dataLoading();
        const id = await load(USERJWTTOKEN,'');
        let param = new URLSearchParams();
        param.append('id',id);
        getProfitData(param).then((res)=>{
            let data=get(res,'data');
            let rspCode = get(data,'rspCode');
            if(rspCode === '000000'){
                this.profitData = get(data,'data');
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