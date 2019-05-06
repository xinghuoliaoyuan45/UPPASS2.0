
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainScreen from './MainScreen';
import { Animated, Easing } from 'react-native';
import TestScreen from './TestScreen';
import AuthNavigator from '../../auth/screens/AuthNavigator';
import LockNavigator from '../../lock/screens/LockNavigationTabBar';
import SelectSpaceScreen from './SelectSpaceScreen';
import SelectSpaceScreen1 from './SelectSpaceScreen1';
import SelectSpaceScreen2 from './SelectSpaceScreen2';
import SelectSpaceScreen3 from './SelectSpaceScreen3';
import SelectOtherScreen from './SelectOtherScreen';
import SelectCommunitiesScreen from './SelectCommunitiesScreen';
import NoCompanyScreen from './NoCompanyScreen';
import SearchCompanyScreen from './SearchCompanyScreen';
import UploadScreen from './UploadScreen';
import DownScreen from './DownScreen';
import ScanScreen from './ScanScreen';
import CheckoutScreen from './CheckoutScreen';
import GameListScreen from './GameListScreen';
import GameInfoScreen from './GameInfoScreen';
import MyScreen from './MyScreen';
import OpenGameScreen from './OpenGameScreen';
import HierarchyScreen from './HierarchyScreen';
import MessageNavigator from '../../message/screens/MessageNavigator';
import SplashScreen from '../../auth/screens/SplashScreen';
import ShareScreen from './ShareScreen';
import BecarefulScreen from './BecarefulScreen';
import ContactScreen from './ContactScreen';
import BecarefulInfoScreen from './BecarefulInfoScreen';
import SettingScreen from './SettingScreen';
import LanguageScreen from './LanguageScreen';
import SettingPwdScreen from './SettingPwdScreen';
import SettingPayPwdScreen from './SettingPayPwdScreen';
import VideoScreen from './VideoScreen';
import GameResultScreen from './GameResultScreen';
import GameOkScreen from './GameOkScreen';
import GameNextScreen from './GameNextScreen';
import GameResultListScreen from './GameResultListScreen';
import AssetConfirmScreen from './AssetConfirmScreen';
import TurnOutScreen from './TurnOutScreen';
import ChangeScreen from './ChangeScreen';
import ProfitScreen from './ProfitScreen';
import PanadaTotalScreen from './PanadaTotalScreen';
import AiPanadaScreen from './AiPanadaScreen';
import HangqingScreen from './HangqingScreen';
import NewDownScreen from './NewDownScreen';
import ActionSelectedScreen from './ActionSelectedScreen';
const HomeNavigator = createStackNavigator({
    SelectOther: SelectOtherScreen,
    Upload: UploadScreen,
    Test: TestScreen,
    Lock: LockNavigator,
    SelectSpace: SelectSpaceScreen,
    SelectSpace1: SelectSpaceScreen1,
    SelectSpace2: SelectSpaceScreen2,
    SelectSpace3: SelectSpaceScreen3,
    Checkout: CheckoutScreen,
    Down:DownScreen,
    Scan:ScanScreen,
    // SelectOther: SelectOtherScreen,
    SelectCommunities: SelectCommunitiesScreen,
    NoCompany: NoCompanyScreen,
    SearchCompany: SearchCompanyScreen,
    GameList:GameListScreen,
    GameInfo:GameInfoScreen,
    My:MyScreen,
    OpenGame:OpenGameScreen,
    Hierarchy:HierarchyScreen,
    Share:ShareScreen,
    Becareful:BecarefulScreen,
    Contact:ContactScreen,
    BecarefulInfo:BecarefulInfoScreen,
    Setting:SettingScreen,
    Language:LanguageScreen,
    SettingPwd:SettingPwdScreen,
    SettingPayPwd:SettingPayPwdScreen,
    VideoScreen:VideoScreen,
    GameResult:GameResultScreen,
    GameOk:GameOkScreen,
    GameNext:GameNextScreen,
    GameResultList:GameResultListScreen,
    AssetConfirm:AssetConfirmScreen,
    TurnOut:TurnOutScreen,
    Change:ChangeScreen,
    Profit:ProfitScreen,
    PanadaTotal:PanadaTotalScreen,
    AiPanada:AiPanadaScreen,
    Hangqing:HangqingScreen,
    NewDown:NewDownScreen,
    ActionSelected:ActionSelectedScreen
}, {
        headerMode: 'none',
        mode: 'modal',
        transitionConfig,
    });
const MainNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Auth: AuthNavigator,
    Message: MessageNavigator,
    Main: HomeNavigator,
    Lock: LockNavigator,

}, {
        headerMode: 'none',
        mode: 'modal',
        transitionConfig,
    });
function transitionConfig() {
    return {
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        },
    };
}
export default (MainNavigator);
