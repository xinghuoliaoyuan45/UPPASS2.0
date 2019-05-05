import * as Api from './Api';
import { Net } from '../../shared';
export function getDashboard(params) {
    return Net('get', Api.DASHBOARD, params);
}
export function getLocations(params) {
    return Net('get', Api.LOCATIONS, params);
}

export function getCompanyList(params) {
    return Net('get', Api.ORGANIZATIONS, params);
}
export function getAccountInfo(params) {
    return Net('post', Api.ACCOUNT_INFO, params);
}

export function sendMoney(params) {
    return Net('post', Api.TRANSFER, params);
}
export function getHis(params) {
    return Net('post', Api.TRANSACTION_LIST, params);
}
export function checkMoney(params) {
    return Net('post', Api.SWITCH_TO_CREDIT, params);
}
export function getGameList(params) {
    return Net('post', Api.GAEMELIST, params);
}
export function getGameInfo(params) {
    return Net('post', Api.GET_GAME_INSTANCE, params);
}
export function getHierarchy(params) {
    return Net('post', Api.ACCOUNT_RELATIONSHIP, params);
}
export function GAME_BET_IN(params) {
    return Net('post', Api.GAME_BET_IN, params);
}
export function ADD_USER_RETURN_VISIT(params) {
    return Net('post', Api.ADD_USER_RETURN_VISIT, params);
}
export function MESSAGE_LIST(params) {
    return Net('post', Api.MESSAGE_LIST, params);
}
export function GAME_RESULT(params) {
    return Net('post', Api.GAME_RESULT, params);
}
export function GET_MESSAGE(params) {
    return Net('post', Api.GET_MESSAGE, params);
}
export function GAME_INSTANCE_NOT_PART(params){
    return Net('post', Api.GAME_INSTANCE_NOT_PART, params);
}
export function USER_PART_IN_LIST(params){
    return Net('post', Api.USER_PART_IN_LIST, params);
}
export function USER_STATISTICAL(params){
    return Net('post', Api.USER_STATISTICAL, params);
}

export function SET_REG_ID(params){
    return Net('post', Api.SET_REG_ID, params);
}
//
export function getProfit(params){
    return Net('post',Api.USER_PROFIT,params);
}
export function getQuotation(params){
    return Net('post',Api.GETQUOTATION,params);
}
export function getSession(params){
    return Net('post',Api.SESSION,params);
}
export function produresUserList(params){
    return Net('post',Api.PRODURES_USER_LIST,params);
}
export function openInvestment(params){
    return Net('post',Api.OPENINVESTMENT,params);
}
export function getAiPanadaData(params){
    return Net('post',Api.QUERY_OPEN_STATE,params);
}
export function frbcChangeETH(params){
    return Net('post',Api.FRBCEXCHANGEETH,params);
}
export function getChangeData(params){
    return Net('post',Api.EXCHANGE,params);
}
export function turnOut(params){
    return Net('post',Api.WITHDRAWAL,params);
}
export function getChargeDetail(params){
    return Net('post',Api.QUERYUSERORDERAPPLE,params);
}
export function getProfitData(params){
    return Net('post',Api.PROFIT,params);
}
export function getQrCode(params){
    return Net('post',Api.QRCODE,params);
}
export function analysisQrcode(params){
    return Net('post',Api.ANALYSIS_QRCODE,params);
}