
import {getI18n} from '../shared'

export function ext(str){
    const translation = {
        en:require('./translation/en.json'),
        zh:require('./translation/zh.json'),
    }
   return getI18n(translation,str)
}