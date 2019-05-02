import * as Api from './Api';
import { Net } from '../../shared';
export function getSmsCode(params) {
    return Net('post', Api.VALIDATE_PIC, params);
}
export function toLogin(params) {
    return Net('post', Api.REGISTER, params);
}
export function login(params) {
    return Net('post', Api.LOGIN, params);
}
export function getCode(params) {
    return Net('post', Api.SMS_AUTH_CODE, params);
}
export function resetPwd(params) {
    return Net('post', Api.RESET_PASSWORD, params);
}
//测试
export function getSession(params){
    return Net('post',Api.SESSION,params);
}
