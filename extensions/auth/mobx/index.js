import LoginStore from './LoginStore';
import RegistStore from './RegistStore';
import ForgetStore from './ForgetStore';

class RootStore {
    constructor(props) {
        this.LoginStore = new LoginStore(props);
        this.RegistStore = new RegistStore(props);
        this.ForgetStore = new ForgetStore(props);
    }
}

export default RootStore;
