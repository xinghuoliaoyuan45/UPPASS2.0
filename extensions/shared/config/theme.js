import {getPixel} from '../utils';

// import { getPixel } from '../utils';
const Colors = {
    gradualStart: '#022047',
    gradualEnd: '#022047',
    white: 'white',
    whiteTransparent: 'rgba(255, 255, 255, 0.7)',
    black: 'rgba(28, 28, 28, 1)',
    spaceNumber: '#1C1C1C',
    spaceName: '#47351B',
    isVip: '#FDDE67',
    isVipGradualStart: '#4A3619',
    isVipGradualEnd: '#2E3337',
    browseOtherCommunities: '#00A699',
    grayLine: '#E3E5E8',
    communityItemBorderColor: '#E4E6E9',
    communityTitle: '#232427',
    communityItemPrice: '#FF5A5F',
    communityItemTagtext: '#FFFFFF',
    blackTransparent: 'rgba(0, 0, 0, 0.4)',
    grayTransparent: 'rgba(0, 0, 0, 0)',
    noCompany: 'rgba(191, 191, 191, 1)',
    searchHeaderBottomBorder: 'rgba(227, 229, 232, 1)',
    searchTextInputBgColor: 'rgba(248, 248, 247, 1)',
    searchPlaceholderColor: '#818386',
    cancel: '#408FFE',
    searchCompanyLogoBorder: '#E4E6E8',
    searchCompanyName: '#1C1C1C',
    searchCompanyFullName: '#818386',
    addCompanyGradualStart: '#FE2042',
    addCompanyGradualEnd: '#FF9509',
    messageListGradualStart: '#FFD70B',
    messageListGradualEnd: '#FFFC41',
    imageBack: '#EDEDED',

};
export const DefaultTheme = {
    name: 'light',
    colors: {
        gradualStart: Colors.gradualStart,
        gradualEnd: Colors.gradualEnd,
        loginHeader: Colors.white,
        whiteTransparent: Colors.whiteTransparent,
        allBackground: Colors.white,
        baseHeader: Colors.black,
        spaceNumber: Colors.spaceNumber,
        spaceName: Colors.spaceName,
        isVip: Colors.isVip,
        imageBack: Colors.imageBack,
        communityTitle: Colors.communityTitle,
        isVipGradualStart: Colors.isVipGradualStart,
        isVipGradualEnd: Colors.isVipGradualEnd,
        browseOtherCommunities: Colors.browseOtherCommunities,
        grayLine: Colors.grayLine,
        communityItemBorderColor: Colors.communityItemBorderColor,
        communityItemName: Colors.black,
        communityItemAddress: Colors.black,
        communityItemPrice: Colors.communityItemPrice,
        communityItemTagtext: Colors.communityItemTagtext,
        blackTransparent: Colors.blackTransparent,
        grayTransparent: Colors.grayTransparent,
        noCompany: Colors.noCompany,
        searchHeaderBottomBorder: Colors.searchHeaderBottomBorder,
        searchTextInputBgColor: Colors.searchTextInputBgColor,
        searchPlaceholderColor: Colors.searchPlaceholderColor,
        searchInput: Colors.black,
        cancel: Colors.cancel,
        searchCompanyLogoBorder: Colors.searchCompanyLogoBorder,
        searchCompanyName: Colors.searchCompanyName,
        searchCompanyFullName: Colors.searchCompanyFullName,
        addCompanyGradualStart: Colors.addCompanyGradualStart,
        addCompanyGradualEnd: Colors.addCompanyGradualEnd,
        searchItemBtnText: Colors.searchCompanyFullName,
        messageListGradualStart: Colors.messageListGradualStart,
        messageListGradualEnd: Colors.messageListGradualEnd,
    },
    fonts: {
        loginHeader: getPixel(14),
        loginTitle: getPixel(30),
        loginInput: getPixel(18),
        register: getPixel(13),
        baseHeader: getPixel(16),
        spaceNumber: getPixel(16),
        spaceName: getPixel(20),
        isVip: getPixel(12),
        browseOtherCommunities: getPixel(16),
        communityItemName: getPixel(18),
        communityItemAddress: getPixel(13),
        communityItemPrice: getPixel(15),
        communityItemTagtext: getPixel(10),
        noCompany: getPixel(14),
        searchInput: getPixel(14),
        cancel: getPixel(16),
        searchCompanyName: getPixel(16),
        searchCompanyFullName: getPixel(14),
        searchItemBtnText: getPixel(12),
    },
    weight: {
        Semibold: '600',
        Bold: '700',
        Medium: '500',
        Normal: '400',
        Light: '300',
        ExtraLight: '200',
        Thin: '100',
        ExtraBold: '800',
        Black: '900',
        Regular: '400',
    },
};
