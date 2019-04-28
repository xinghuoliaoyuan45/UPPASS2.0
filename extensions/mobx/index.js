import mainStore from '../main/mobx';
import authStore from '../auth/mobx';
import messageStore from '../message/mobx';
import lockStore from '../lock/mobx';


class RootStore {
    constructor() {
        this.mainStore = new mainStore(this);
        this.authStore = new authStore(this);
        this.messageStore = new messageStore(this);
        this.lockStore = new lockStore(this);
    }
}

export default new RootStore();
