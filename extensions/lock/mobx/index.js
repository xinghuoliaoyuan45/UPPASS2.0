import lockStore from './LockStore';


class RootStore {
    constructor(props) {
        this.lockStore = new lockStore(props);
    }
}

export default RootStore;
